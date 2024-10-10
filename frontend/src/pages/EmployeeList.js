import React from 'react';
import EmployeeCard from './EmployeeCard';
import useDeleteEmployee from '../hooks/useDeleteEmployee';

const EmployeeList = ({ employees }) => {
  const { deleteEmployee, isLoading, isError, error } = useDeleteEmployee();

  const handleDeleteEmployee = (employeeId) => {
    deleteEmployee(employeeId);
  };
  if (employees.length === 0) {
    return <div>No employees found</div>
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
        />
      ))}
    </div>
  );
};

export default EmployeeList;
