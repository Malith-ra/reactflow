import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];
// const baseURL = "https://app.qpl.dev.arimac.xyz";
// const baseURL = "https://connect-sandbox.paylaterapp.com";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
});

// Helper function to handle subscribers
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Intercept requests to add headers, including the access token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      // Attach the access token to Authorization header if available
      if (accessToken && config.url !== "/auth/forgot-password") {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      // Add additional headers
      config.headers["x-channel-type"] = "WEB";
      config.headers["x-client-request-id"] = "123"; // No usage in BE
      config.headers["x-client-platform"] = "web";
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return config;
    }
  }
);

// Intercept responses to handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Network error
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message);
    }
    // Unauthorized (401) error
    else if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent multiple token refreshes
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          // Call the refresh token endpoint
          const { data } = await axios.post(
            `${baseURL}/auth/realms/merchant_portal/protocol/openid-connect/token`,
            new URLSearchParams({
              client_id: "merchant_portal_public",
              grant_type: "refresh_token",
              refresh_token: refreshToken,
            }).toString(),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          // Update tokens in localStorage
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);

          // Notify all subscribers with the new token
          onRefreshed(data.access_token);

          // Retry the original request with the new access token
          originalRequest._retry = true;
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          toast.error("Session expired. Redirecting to login...");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Queue requests while the token is being refreshed
      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(originalRequest));
        });
      });
    }
    // Forbidden (403) error
    else if (error.response?.status === 403) {
      toast.error("You are not authorized to access this page.");
    }

    // Removing toast if status is 400
    else if (error.response?.status === 400) {
      console.error("You are not authorized to access this page.");
    }
    // Other errors
    else {
      toast.error("Something went wrong! Please try again later.");
    }

    return Promise.reject(error);
  }
);
