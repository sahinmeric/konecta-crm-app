import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import useUpdateRequest from '../hooks/useUpdateRequest';

const EditRequestModal = ({ isOpen, onClose, request, employees = [] }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const { updateRequest, isLoading } = useUpdateRequest();

  useEffect(() => {
    if (request) {
      setEmployeeId(request.employeeId || '');
      setSummary(request.summary || '');
      setDescription(request.description || '');
      setCode(request.code || '');
    }
  }, [request]);

  const handleUpdateRequest = async (e) => {
    e.preventDefault();

    if (!employeeId || !summary || !description) {
      alert("All fields are required.");
      return;
    }

    const updatedRequest = {
      employeeId,
      summary,
      description,
      code,
    };

    try {
      await updateRequest({ id: request.id, requestData: updatedRequest });
      onClose();
    } catch (err) {
      console.error("Error updating request:", err);
      alert("Error updating request.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Request</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdateRequest}>
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
              {isLoading ? "Updating..." : "Update Request"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRequestModal;
