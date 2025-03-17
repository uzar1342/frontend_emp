import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../services/api';
import '../style/UserDetail.css';

export function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/users/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setUser(res.data));
  }, [id]);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="user-detail-container">
      <h2>User Detail</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Created At:</strong> {new Date(user.createdOn).toLocaleDateString()}</p>

      <button onClick={() => navigate('/permissions')}>Back to List</button>
    </div>
  );
}
