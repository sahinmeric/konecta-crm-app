import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import useAddRequest from '../../hooks/useAddRequest';


const AddRequestModal = ({ isOpen, onClose, employees = [] }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const { addRequest, isLoading } = useAddRequest();

  const handleAddRequest = async (e) => {
    e.preventDefault();

    if (!employeeId || !summary || !description) {
      alert("All fields are required.");
      return;
    }

    const newRequest = {
      employeeId,
      summary,
      description,
      code,
    };

    try {
      await addRequest(newRequest);
      onClose();
    } catch (err) {
      console.error("Error adding request:", err);
      alert("Error adding request.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Request</DialogTitle>
      <DialogContent>
        <form onSubmit={handleAddRequest}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Employee</InputLabel>
            <Select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Code"
            type="text"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Summary"
            type="text"
            fullWidth
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Request"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRequestModal;
