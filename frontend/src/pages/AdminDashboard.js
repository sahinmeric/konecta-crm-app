import React, { useEffect, useState } from 'react';
import { getEmployees } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    navigate('/add-employee');
  };
  console.log(employees)
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleAddEmployee}>Add New Employee</button>
      <h3>Employee List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
