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

module.exports = router;
