const express = require('express');
const Request = require('../models/Request');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const authorizeRole = require('../middlewares/roleMiddleware');

// Route to get all requests (only accessible to authenticated users)
router.get('/requests', authenticateToken, async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving requests', error: error.message });
  }
});

// Route to create a new request (accessible to employees and admins)
router.post('/requests', authenticateToken, async (req, res) => {
  const { code, description, summary } = req.body;
  const employee_id = req.user.id; // Use the authenticated user's ID as the employee_id

  try {
    // Create a new request with English field names
    const newRequest = await Request.create({ code, description, summary, employee_id });
    res.status(201).json({ message: 'Request created successfully', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
  }
});

// Route to delete a request (only accessible to admin users)
router.delete('/requests/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { id } = req.params; // Get request ID from URL parameters

  try {
    // Find the request by ID
    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Delete the request from the database
    await request.destroy();

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error: error.message });
  }
});

module.exports = router;
