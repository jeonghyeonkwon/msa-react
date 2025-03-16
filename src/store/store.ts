import { configureStore } from "@reduxjs/toolkit";

import authSlice, { isAuthErrorAction } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const isAuthError = () => {
  store.dispatch(isAuthErrorAction());
};
export default store;
