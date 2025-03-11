import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login.jsx';
import { Home } from './components/Home.jsx';

import { Register } from './components/Register.jsx';
import { EmployeeList } from './components/EmployeeList.jsx';
import { CreateEmployee } from './components/CreateEmployee.jsx';
import { Permissions } from './components/Permissions.jsx';
import { UserDetail } from './components/UserDetail.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employees" element={token ? <EmployeeList /> : <Navigate to="/login" />} />
        <Route path="/create-employee" element={token  ? <CreateEmployee /> : <Navigate to="/login" />} />
        <Route path="/permissions" element={token && role === 'Admin' ? <Permissions /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;