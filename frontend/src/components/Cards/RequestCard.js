import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const RequestCard = ({ request, onDelete, onEdit, isAdmin }) => {

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Summary: {request.summary}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Request ID: {request.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Employee ID: {request.employee_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {request.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Code: {request.code}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created At: {new Date(request.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated At: {new Date(request.updatedAt).toLocaleString()}
        </Typography>
      </CardContent>
      {isAdmin && <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(request)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(request.id)}>
          Delete
        </Button>
      </CardActions>}
    </Card>
  );
};

export default RequestCard;
