import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
  email: string;
  id: number;
  name: string;
  role: string;
};

export type AuthSliceType = {
  accessToken?: string;
  user?: UserType;
};

const getAuthState = (): AuthSliceType => {
  if (typeof window !== "undefined") {
    const auth = localStorage.getItem("auth");
    if (auth) {
      try {
        const person = JSON.parse(auth);
        return {
          accessToken: person.accessToken,
          user: person.user,
        };
      } catch (error) {
        console.error(error);
      }
    }
  }
  return {
    accessToken: undefined,
    user: undefined,
  };
};

const initialState: AuthSliceType = getAuthState();

export const authSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(payload));
      }
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
