import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
  id: number;
  name: string;
};

export type AuthSliceType = {
  accessToken?: string;
  user?: UserType;
};

const initialState: AuthSliceType = {
  accessToken: undefined,
};

export const authSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    },
    logout: (state) => {
      localStorage.removeItem("auth");
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
