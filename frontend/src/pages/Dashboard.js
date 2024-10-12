import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Container, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useGetEmployees from '../hooks/useGetEmployees';
import useAddEmployee from '../hooks/useAddEmployee';
import EmployeeList from './EmployeeList';
import AddEmployeeModal from './AddEmployeeModal';
import useGetRequests from '../hooks/useGetRequests';
import RequestList from './RequestList';
import AddRequestModal from './AddRequestModal';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [currentEmployeePage, setCurrentEmployeePage] = useState(1);
  const { employees = [], totalEmployees, totalPages: employeePages, isLoading: isLoadingEmployees, isError: isErrorEmployees, error: errorEmployees } = useGetEmployees(currentEmployeePage, 10);
  const { addEmployee } = useAddEmployee();
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [currentRequestPage, setCurrentRequestPage] = useState(1);
  const { requests = [], totalRequests, totalPages: requestPages, isLoading: isLoadingRequests, isError: isErrorRequests, error: errorRequests } = useGetRequests(currentRequestPage, 10);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const isAdmin = role === 'admin';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    setRole(userRole);
  }, [navigate]);

  const handleEmployeePageChange = (event, value) => {
    setCurrentEmployeePage(value);
  };

  const handleRequestPageChange = (event, value) => {
    setCurrentRequestPage(value);
  };

  const handleEmployeeAdded = async (newEmployee) => {
    try {
      await addEmployee(newEmployee);
      setIsEmployeeModalOpen(false);
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  if (isLoadingEmployees || isLoadingRequests) {
    return <div>Loading data...</div>;
  }

  if (isErrorEmployees || isErrorRequests) {
    return (
      <div>
        {isErrorEmployees && <div>Error loading employees: {errorEmployees.message}</div>}
        {isErrorRequests && <div>Error loading requests: {errorRequests.message}</div>}
      </div>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          backgroundColor: '#1976d2',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
        }}
      >
        <Typography variant="h4" color="white">
          {isAdmin ? 'Admin Dashboard' : 'Employee Dashboard'}
        </Typography>
      </Box>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Employees" />
        <Tab label="Requests" />
      </Tabs>
      <Box sx={{ p: 3 }}>
        {currentTab === 0 && (
          <div>
            {isAdmin && <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsEmployeeModalOpen(true)}
              sx={{ marginBottom: 2 }}
            >
              Add Employee
            </Button>}
            <EmployeeList
              employees={employees}
              totalEmployees={totalEmployees}
              totalPages={employeePages}
              currentPage={currentEmployeePage}
              onPageChange={handleEmployeePageChange}
              isAdmin={isAdmin}
            />
            <AddEmployeeModal
              isOpen={isEmployeeModalOpen && isAdmin}
              onClose={() => setIsEmployeeModalOpen(false)}
              onEmployeeAdded={handleEmployeeAdded}
            />
          </div>
        )}
        {currentTab === 1 && (
          <div>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => setIsRequestModalOpen(true)}
              sx={{ marginBottom: 2 }}
            >
              Add Request
            </Button>
            <RequestList
              requests={requests}
              totalRequests={totalRequests}
              totalPages={requestPages}
              currentPage={currentRequestPage}
              onPageChange={handleRequestPageChange}
              employees={employees}
              isAdmin={isAdmin}
            />
            <AddRequestModal
              isOpen={isRequestModalOpen}
              onClose={() => setIsRequestModalOpen(false)}
              onRequestAdded={() => setIsRequestModalOpen(false)}
              employees={employees}
            />
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
