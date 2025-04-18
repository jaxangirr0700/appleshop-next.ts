import { createSlice } from "@reduxjs/toolkit";

type UserType = {
  id: number;
  name: string;
};

type AuthSliceType = {
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
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
