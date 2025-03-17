import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../redux/loaderSlice';

import { API_URL } from '../services/api';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import '../style/register.css';

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleRegister = async () => {
    try {
       dispatch(showLoader());
      await axios.post(`${API_URL}/api/auth/register`, { username, password });
      alert('Registration successful! Please login.');
    } catch (err) {
      alert('Registration failed');
    }
    finally {
      dispatch(hideLoader());
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
  