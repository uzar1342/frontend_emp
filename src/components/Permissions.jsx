import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';
import '../style/Permissions.css';
import { Link } from 'react-router-dom';

export function Permissions() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/users`, {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setUsers(res.data));
  }, []);

  const updateRole = (userId, role) => {
    axios.put(`${API_URL}/api/users/${userId}`, { role }, {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(() => {
      alert('Role updated successfully');
      window.location.reload();
    });
  };

  return (
    <div className="permissions-container">
      <h2>Manage Permissions</h2>
      <div className="user-grid">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <span><strong>Username:</strong> {user.username}</span>
            <span><strong>Role:</strong> {user.role}</span>
            <div>
              <button onClick={() => updateRole(user._id, 'Admin')}>
                Make Admin
              </button>
              <button onClick={() => updateRole(user._id, 'User')}>
                Make User
              </button>
              <Link to={`/user/${user._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
