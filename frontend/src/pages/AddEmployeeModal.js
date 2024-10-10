import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import useAddEmployee from "../hooks/useAddEmployee";

const AddEmployeeModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [hireDate, setHireDate] = useState("");
  const { addEmployee, isLoading } = useAddEmployee();

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    if (!name || !position || !salary || !hireDate) {
      alert("All fields are required.");
      return;
    }

    const newEmployee = {
      name,
      position,
      salary,
      hireDate
    };

    try {
      await addEmployee(newEmployee);
      onClose();
    } catch (err) {
      console.error("Error adding employee:", err);
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
            <Button type="submit" color="primary" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Employee"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;
