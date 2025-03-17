import { configureStore } from "@reduxjs/toolkit";

import authSlice, { authErrorAction, successAuth } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const authError = () => {
  store.dispatch(authErrorAction());
};
export const authSuccess = () => {
  store.dispatch(successAuth());
};
export default store;
