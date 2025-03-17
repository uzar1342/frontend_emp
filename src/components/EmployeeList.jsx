import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../redux/employeesSlice";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import axios from "axios";
import { API_URL } from "../services/api";
import "../style/EmployeeList.css";

export function EmployeeList() {
  const dispatch = useDispatch();
  const { list: employees, status, error } = useSelector((state) => state.employees);
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(6);

  useEffect(() => {
    dispatch(showLoader());
    dispatch(fetchEmployees()).finally(() => dispatch(hideLoader()));
  }, [dispatch, role]);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setName(employee.name);
    setPosition(employee.position);
    setSalary(employee.salary);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API_URL}/api/employees/${selectedEmployee._id}`,
        { name, position, salary },
        { headers: { Authorization: `${token}` } }
      );
      alert("Employee updated successfully");
      setSelectedEmployee(null);
      dispatch(fetchEmployees());
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`${API_URL}/api/employees/${id}`, {
        headers: { Authorization: `${token}` },
      });
      alert("Employee deleted successfully");
      dispatch(fetchEmployees());
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filteredEmployees = employees
    .filter((emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "position") return a.position.localeCompare(b.position);
      if (sortBy === "salary") return a.salary - b.salary;
    });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="employee-list-container">
      <h2>{role === "Admin" ? "All Employees" : "My Employees"}</h2>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="position">Sort by Position</option>
          <option value="salary">Sort by Salary</option>
        </select>
      </div>

      <div className="employee-grid">
        {currentEmployees.map((emp) => (
          <div key={emp._id} className="employee-card">
            <h3>{emp.name}</h3>
            <p><strong>Position:</strong> {emp.position}</p>
            <p><strong>Salary:</strong> ${emp.salary}</p>
            {role === "Admin" && <p><strong>Created By:</strong> {emp.createdBy}</p>}

            <div className="employee-actions">
              <button className="edit-btn" onClick={() => handleEdit(emp)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(emp._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination fixed-bottom">
        {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
            {i + 1}
          </button>
        ))}
      </div>

      {selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Employee</h3>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setSelectedEmployee(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
