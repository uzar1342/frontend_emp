import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import '../style/register.css';

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/register', { username, password });
      alert('Registration successful! Please login.');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <div className="register-form">
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
        <button onClick={handleRegister} className="register-button">Register</button>
      </div>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}
  