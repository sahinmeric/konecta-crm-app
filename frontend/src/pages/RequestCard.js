import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const RequestCard = ({ request, onDelete, onEdit }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {request.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {request.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {request.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(request)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(request.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default RequestCard;
