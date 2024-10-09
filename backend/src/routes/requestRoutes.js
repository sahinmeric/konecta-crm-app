const express = require('express');
const Request = require('../models/Request'); // Import the Request model
const authenticateToken = require('../middlewares/authMiddleware'); // Import authentication middleware
const router = express.Router();

// Route to get all requests (only accessible to authenticated users)
router.get('/requests', authenticateToken, async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving requests', error: error.message });
  }
});

module.exports = router;
