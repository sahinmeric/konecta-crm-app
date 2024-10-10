import React from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";

const EmployeeCard = ({ employee, onDelete }) => {
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
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(employee.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default EmployeeCard;
