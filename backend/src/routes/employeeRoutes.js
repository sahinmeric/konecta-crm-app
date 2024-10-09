const express = require('express');
const Employee = require('../models/Employee'); // Import the Employee model
const authenticateToken = require('../middlewares/authMiddleware'); // Import authentication middleware
const authorizeRole = require('../middlewares/roleMiddleware');

const router = express.Router();

// Route to get all employees (only accessible to authenticated users)
router.get('/employees', authenticateToken, async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employees', error: error.message });
  }
});

// Route to create a new employee (only accessible to admin users)
router.post('/employees', authenticateToken, async (req, res) => {
  const { name, position, salary, hireDate } = req.body;
  try {
    // Create a new employee
    const newEmployee = await Employee.create({ name, position, salary, hireDate });
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
});

// Route to update an existing employee (only accessible to admin users)
router.put('/employees/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { id } = req.params; // Get employee ID from URL parameters
  const { name, position, salary, hireDate } = req.body; // Get updated fields from request body

  try {
    // Find the employee by ID
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update the employee's information
    employee.name = name || employee.name;
    employee.position = position || employee.position;
    employee.salary = salary || employee.salary;
    employee.hireDate = hireDate || employee.hireDate;

    // Save the updated employee to the database
    await employee.save();

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
});


module.exports = router;
