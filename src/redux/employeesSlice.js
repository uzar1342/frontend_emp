import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../services/api";

// ✅ Fetch Employees Based on Role
export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async (role, { rejectWithValue }) => {
    try {
      const endpoint = "/api/employees" ;
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: { Authorization: `${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch employees");
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default employeesSlice.reducer;
