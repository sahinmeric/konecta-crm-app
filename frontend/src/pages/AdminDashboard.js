import React, { useState } from 'react';
import useGetEmployees from '../hooks/useGetEmployees';
import useAddEmployee from '../hooks/useAddEmployee';
import EmployeeList from './EmployeeList';
import AddEmployeeModal from './AddEmployeeModal';

const AdminDashboard = () => {
  const { employees, isLoading, isError, error, refetchEmployees } = useGetEmployees();
  const { addEmployee } = useAddEmployee();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmployeeAdded = async (newEmployee) => {
    try {
      await addEmployee(newEmployee);
      refetchEmployees();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Error adding employee.");
    }
  };

  if (isLoading) {
    return <div>Loading employees...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Employee</button>
      <EmployeeList employees={employees} />
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </div>
  );
};

export default AdminDashboard;
