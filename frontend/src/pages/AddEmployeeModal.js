import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

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

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Employee</DialogTitle>
      <DialogContent>
        <form onSubmit={handleAddEmployee}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Position"
            type="text"
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Salary"
            type="number"
            fullWidth
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Hire Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            required
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Employee
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;
