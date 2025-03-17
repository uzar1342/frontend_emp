import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../services/api";
// const API_URL = "https://employemanagment-xjb6.onrender.com/api/users";

// Fetch Users & Permissions
export const fetchUsers = createAsyncThunk("permissions/fetchUsers", async () => {
  const response = await axios.get(`${API_URL}/api/users`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return response.data;
});

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default permissionsSlice.reducer;
