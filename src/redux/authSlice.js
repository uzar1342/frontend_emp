import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  token: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.name = action.payload.name;
      // ✅ Set data in localStorage after state update
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("name", action.payload.name);
    },
    logout: (state) => {
      state.role = null;
      state.token = null;
      state.name = null;

      // ✅ Clear localStorage completely to avoid stale state
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    },
    loadAuthFromStorage: (state) => {
      state.role = localStorage.getItem("role") || null;
      state.token = localStorage.getItem("token") || null;
      state.name = localStorage.getItem("name") || null;
    },
  },
});

export const { setAuth, logout, loadAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
