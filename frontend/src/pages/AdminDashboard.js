import React, { useState } from 'react';
import useGetEmployees from '../hooks/useGetEmployees';
import useAddEmployee from '../hooks/useAddEmployee';
import EmployeeList from './EmployeeList';
import AddEmployeeModal from './AddEmployeeModal';

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { employees, totalEmployees, totalPages, isLoading, isError, error } = useGetEmployees(currentPage, 10);
  const { addEmployee } = useAddEmployee();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEmployeeAdded = async (newEmployee) => {
    try {
      await addEmployee(newEmployee);
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
      <EmployeeList
        employees={employees}
        totalEmployees={totalEmployees}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </div>
  );
};

export default AdminDashboard;
