import React, { useState } from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import EditEmployeeModal from "../Modals/EditEmployeeModal";

const EmployeeCard = ({ employee, onDelete, isAdmin }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleEmployeeUpdated = () => {
    setEditModalOpen(false);
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {employee.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Position: {employee.position}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Salary: ${employee.salary}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hired on: {new Date(employee.hireDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      {isAdmin && <CardActions>
        <Button size="small" color="primary" onClick={handleEditClick}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(employee.id)}>
          Delete
        </Button>
      </CardActions>}
      <EditEmployeeModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        employee={employee}
        onEmployeeUpdated={handleEmployeeUpdated}
      />
    </Card>
  );
};

export default EmployeeCard;
