import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import "../style/Navbar.css";

export function Navbar() {
  const role = useSelector((state) => state.auth.role);
  const name = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
 const { token } = useSelector((state) => state.auth); 
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <nav className="navbar">
      <li className="nav-links">
        <Link to="/">     <div className="logo">Employee Management  {role?   '- '+ role:""}</div></Link>
        </li>
      <ul className="nav-links">
        {role === "Admin" && (
          <>
            <li><Link to="/employees">Employees</Link></li>
            <li><Link to="/create-employee">Create Employee</Link></li>
            <li><Link to="/permissions">Permissions</Link></li>
          </>
        )}
        {role === "User" && (
          <>
            <li><Link to="/employees">My Employees</Link></li>
            <li><Link to="/create-employee">Create Employee</Link></li>
          </>
        )}
        {role ? (
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        ) : (
          <>
            
          </>
        )}
      </ul>
    </nav>
  );
}
