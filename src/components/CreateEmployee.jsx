import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../style/CreateEmployee.css';
import { showLoader, hideLoader } from '../redux/loaderSlice';

export function CreateEmployee() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.name);
  const handleCreate = async () => {
    try {
      dispatch(showLoader());
      await axios.post(`${API_URL}/api/employees`, 
        { name, position, salary,username }, 
        {
          headers: { Authorization: localStorage.getItem('token') }
        }
      );
      alert('Employee created successfully');
      navigate('/employees'); // Redirect to Employee List Page
    } catch (err) {
      alert('Failed to create employee');
    }
    finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="create-employee-container">
      <div className="form">
        <h2>Create New Employee</h2>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter Employee Name" 
          className="input-field"
        />
        <input 
          type="text" 
          value={position} 
          onChange={(e) => setPosition(e.target.value)} 
          placeholder="Enter Position" 
          className="input-field"
        />
        <input 
          type="number" 
          value={salary} 
          onChange={(e) => setSalary(e.target.value)} 
          placeholder="Enter Salary Amount" 
          className="input-field"
        />
        <button onClick={handleCreate} className="create-button">
          Create Employee
        </button>
      </div>
    </div>
  );
}
