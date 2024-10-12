import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import useEditEmployee from "../../hooks/useEditEmployee";

const EditEmployeeModal = ({ isOpen, onClose, employee, onEmployeeUpdated }) => {
  const { editEmployee } = useEditEmployee();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [hireDate, setHireDate] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPosition(employee.position);
      setSalary(employee.salary);
      setHireDate(employee.hireDate.slice(0, 10));
    }
  }, [employee]);

  const handleEditEmployee = async (e) => {
    e.preventDefault();
    try {
      const updatedEmployee = { id: employee.id, name, position, salary, hireDate };
      await editEmployee(updatedEmployee);
      onEmployeeUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Error updating employee.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <form onSubmit={handleEditEmployee}>
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
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;
