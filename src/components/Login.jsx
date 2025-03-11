import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import '../style/Login.css';

// src/components/Login.js
export function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://employemanagment-xjb6.onrender.com/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setToken(res.data.token);
      console.log(res);
      alert('Login successful!');
      window.location.href = '/';
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}