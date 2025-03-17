import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchEmployees } from "./redux/employeesSlice";
import { fetchUsers } from "./redux/permissionsSlice";
import { showLoader, hideLoader } from "./redux/loaderSlice";
import { Login } from "./components/Login.jsx";
import { Home } from "./components/Home.jsx";
import { Register } from "./components/Register.jsx";
import { EmployeeList } from "./components/EmployeeList.jsx";
import { CreateEmployee } from "./components/CreateEmployee.jsx";
import { Permissions } from "./components/Permissions.jsx";
import { UserDetail } from "./components/UserDetail.jsx";
import { Navbar } from "./components/Navbar.jsx";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(showLoader());
  //   Promise.all([dispatch(fetchEmployees()), dispatch(fetchUsers())])
  //     .finally(() => dispatch(hideLoader()));
  // }, [dispatch]);

  return (
    <>
      <Loader />
      <Router>
        <Navbar /> {/* ✅ Add Navbar here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/permissions" element={<Permissions />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
