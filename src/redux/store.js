import { configureStore } from "@reduxjs/toolkit";

import authReducer, { loadAuthFromStorage } from "./authSlice";
import loaderReducer from "./loaderSlice"; 
import employeesReducer from "./employeesSlice";
import permissionsReducer from "./permissionsSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ Now auth is defined
    loader: loaderReducer,
    employees: employeesReducer,
    permissions: permissionsReducer,
  },
});
store.dispatch(loadAuthFromStorage());

