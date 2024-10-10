import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEmployeeModal from "./AddEmployeeModal"

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEmployeeAdded = () => {
    fetchEmployees();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleOpenModal}>Add Employee</button>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.name} - {employee.position}</li>
        ))}
      </ul>
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </div>
  );
};

export default AdminDashboard;
