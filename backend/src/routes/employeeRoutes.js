const express = require('express');
const Employee = require('../models/Employee'); // Import the Employee model
const authenticateToken = require('../middlewares/authMiddleware'); // Import authentication middleware
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

module.exports = router;
