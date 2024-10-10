import React, { useState } from "react";
import axios from "axios";

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [hireDate, setHireDate] = useState("");

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const newEmployee = { name, position, salary, hireDate };
      await axios.post("http://localhost:5000/api/employees", newEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onEmployeeAdded();
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Error adding employee.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Employee</h2>
        <form onSubmit={handleAddEmployee}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Hire Date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            required
          />
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
