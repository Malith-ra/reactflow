// import { AppDispatch, RootState } from "@/redux/store";
import { AppDispatch, RootState } from "@/common/data/redux/store";
import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, AppStore, RootState } from "../../redux/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppStore = useStore.withTypes<AppStore>();
