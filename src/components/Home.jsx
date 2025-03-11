import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import '../style/home.css';

export function Home() {
  const role = localStorage.getItem('role');

  return (
    <div className="home-container">
      <h2>Welcome to Employee Management System</h2>

      <div className="link-container">
        {role === 'Admin' ? (
          <>
            <Link className="link-card" to="/employees">
              <div className="card-content">
                <h3>View All Employees</h3>
              </div>
            </Link>
            <Link className="link-card" to="/create-employee">
              <div className="card-content">
                <h3>Create Employee</h3>
              </div>
            </Link>
            <Link className="link-card" to="/permissions">
              <div className="card-content">
                <h3>Manage Permissions</h3>
              </div>
            </Link>
          </>
        ) : role === 'User' ? (
          <>
            <Link className="link-card" to="/employees">
              <div className="card-content">
                <h3>View My Employees</h3>
              </div>
            </Link>
            <Link className="link-card" to="/create-employee">
              <div className="card-content">
                <h3>Create Employee</h3>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link className="link-card" to="/login">
              <div className="card-content">
                <h3>Login</h3>
              </div>
            </Link>
            <Link className="link-card" to="/register">
              <div className="card-content">
                <h3>Register</h3>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}