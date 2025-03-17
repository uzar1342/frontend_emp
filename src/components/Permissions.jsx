import React, { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';
import '../style/Permissions.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/permissionsSlice";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { Link } from 'react-router-dom';

export function Permissions() {
    const dispatch = useDispatch();
    const { users: users, status, error } = useSelector((state) => state.permissions);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        dispatch(showLoader());
        dispatch(fetchUsers()).finally(() => dispatch(hideLoader()));
    }, [dispatch]);

    const updateRole = async (userId, role) => {
        try {
            await axios.put(`${API_URL}/api/users/${userId}`, { role }, {
                headers: { Authorization: token }
            });
            alert('Role updated successfully');
            dispatch(fetchUsers()); // Refresh user list instead of reloading the page
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Failed to update role.");
        }
    };

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <div className="permissions-container">
            <h2>Manage Permissions</h2>
            <div className="user-grid">
                {users.map(user => (
                    <div key={user._id} className="user-card">
                        <span><strong>Username:</strong> {user.username}</span>
                        <span><strong>Role:</strong> {user.role}</span>
                        <div>
                            <button onClick={() => updateRole(user._id, 'Admin')}>Make Admin</button>
                            <button onClick={() => updateRole(user._id, 'User')}>Make User</button>
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
