/**
 * Utility functions to interact with localStorage.
 */
const LocalStorageUtil = {
  /**
   * Get an item from localStorage.
   * @param key - The key of the item to retrieve.
   * @returns The parsed value from localStorage or null if not found or an error occurs.
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return null;
    }
  },

  /**
   * Set an item in localStorage.
   * @param key - The key of the item to store.
   * @param value - The value to store (will be stringified).
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing key "${key}" to localStorage:`, error);
    }
  },

  /**
   * Remove an item from localStorage.
   * @param key - The key of the item to remove.
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing key "${key}" from localStorage:`, error);
    }
  },
};

export default LocalStorageUtil;

export const formatDateTime = (isoString: string) => {
  const dateObj = new Date(isoString);
  return dateObj
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
    .replace(",", ""); // Remove the comma
};

// Function to convert the UTC date time to local date time manually by appending 'z'
// This method is used in two sections therefore DO NOT remove this function
export const formatUtcToLocalDateTime = (isoString: string) => {
  const dateObject = new Date(isoString + "z");
  return dateObject
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
    .replace(",", ""); // Remove the comma
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC", // Force UTC time
  };

  return new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .replace(",", "");
};

// Get initials form a name
export const getInitials = (fullName: string): string => {
  return fullName
    .split(" ") // Split by space
    .map((word) => word.charAt(0).toUpperCase()) // Get first letter of each word
    .join(""); // Join them together
};

export const getFirstName = (fullName: string): string => {
  const parts = fullName.trim().split(" ").filter(Boolean);
  return parts.length > 0 ? parts[0] : "";
};

export const getLastName = (fullName: string): string => {
  const parts = fullName.trim().split(" ").filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 1] : "";
};
