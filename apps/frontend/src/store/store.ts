import { combineReducers, Action } from "redux";
import loadingIndicatorSlice from "./slice/loadingIndicatorSilce";
import loginSlice from "./slice/authSlice";
import currentPageSlide from "./slice/currentPageSlice";
import filterSlice from "./slice/filterSlice";
import { configureStore } from "@reduxjs/toolkit";

const appReducer = combineReducers({
  loadingStatus: loadingIndicatorSlice,
  loginSlice: loginSlice,
  currentPageSlide: currentPageSlide,
  filterSlice: filterSlice
});

const appReducerTyped = appReducer as (
  state: RootState | undefined,
  action: Action<any>
) => RootState;

export const rootReducer = (
  state: RootState | undefined,
  action: Action<any>
) => {
  if (action.type === "reset") {
    state = undefined;
  }
  return appReducerTyped(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
