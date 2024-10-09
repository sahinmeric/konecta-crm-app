const express = require('express');
const Employee = require('../models/Employee');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');
const { body, validationResult } = require('express-validator');

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

// Employee POST route with validation and sanitization
router.post(
  '/employees',
  authenticateToken,
  [
    body('name').isString().notEmpty().withMessage('Name must be a string and cannot be empty'),
    body('position').isString().notEmpty().withMessage('Position must be a string and cannot be empty'),
    body('salary').isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
    body('hireDate').optional().isISO8601().withMessage('Hire date must be a valid date'),
    body('name').trim().escape(),
    body('position').trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, position, salary, hireDate } = req.body;

    try {
      const newEmployee = await Employee.create({ name, position, salary, hireDate });
      res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
      res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
  }
);


router.put(
  '/employees/:id',
  authenticateToken,
  authorizeRole('admin'),
  [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('position').optional().isString().withMessage('Position must be a string'),
    body('salary').optional().isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
    body('hireDate').optional().isISO8601().withMessage('Hire date must be a valid date'),
    body('name').trim().escape(),
    body('position').trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, position, salary, hireDate } = req.body;

    try {
      // Find the employee by ID
      const employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      // Update employee information
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
  }
);


// Route to delete an employee (only accessible to admin users)
router.delete('/employees/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    // Find the employee by ID
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Delete the employee from the database
    await employee.destroy();

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
});


module.exports = router;
