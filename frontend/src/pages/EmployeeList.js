import React from 'react';
import EmployeeCard from './EmployeeCard';
import useDeleteEmployee from '../hooks/useDeleteEmployee';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const EmployeeList = ({ employees, totalEmployees, totalPages, currentPage, onPageChange, isAdmin }) => {
  const { deleteEmployee, isLoading, isError, error } = useDeleteEmployee();

  const handleDeleteEmployee = (employeeId) => {
    deleteEmployee(employeeId);
  };

  if (employees.length === 0) {
    return <div>No employees found</div>;
  }

  return (
    <div>
      {isLoading && <div>Deleting employee...</div>}
      {isError && <div>Error: {error.message}</div>}
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onDelete={handleDeleteEmployee}
          isAdmin={isAdmin}
        />
      ))}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default EmployeeList;
