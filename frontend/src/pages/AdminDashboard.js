import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEmployeeModal from "./AddEmployeeModal";
import { Button } from "@mui/material";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeAdded = () => {
    fetchEmployees(); // Refresh the employee list after adding a new employee
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        Add Employee
      </Button>

      {/* Employee List */}
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.position}
          </li>
        ))}
      </ul>
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </div>
  );
};

export default AdminDashboard;
