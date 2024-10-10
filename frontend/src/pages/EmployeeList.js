import React from 'react';
import EmployeeCard from './EmployeeCard';

const EmployeeList = ({ employees }) => {
  return (
    <div>
      {employees && employees.length > 0 ? (
        employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
};

export default EmployeeList;
