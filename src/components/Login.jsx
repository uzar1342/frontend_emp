import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../redux/loaderSlice';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { setAuth } from '../redux/authSlice'; // ✅ Import Redux action
import '../style/Login.css';
import { API_URL } from '../services/api';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // ✅ Get auth state from Redux

  // 🔄 Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    try {
      dispatch(showLoader());
      const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });

      dispatch(setAuth({ token: res.data.token, role: res.data.role,name:res.data.name})); // ✅ Store in Redux
      alert('Login successful!');
      navigate('/'); // ✅ Redirect without reloading
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || 'Invalid credentials');
    } finally {
      dispatch(hideLoader());
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
