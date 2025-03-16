import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetAuthCookie } from "@/api/cookie";
import { logout } from "@/api/auth";

export const logoutAction = createAsyncThunk("auth/logout", logout);

export const authSlice = createSlice({
  name: "auth",
  initialState: { isSuccess: false },
  reducers: {
    successAuth: (prevState) => {
      prevState.isSuccess = true;
    },
    isAuthErrorAction: (state) => {
      resetAuthCookie();
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction.rejected, (state, action) => {
      resetAuthCookie();
      state.isSuccess = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      resetAuthCookie();
      state.isSuccess = false;
    });
  },
});

export const { successAuth, isAuthErrorAction } = authSlice.actions;
export default authSlice.reducer;
