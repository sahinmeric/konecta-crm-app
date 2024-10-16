const express = require('express');
const Request = require('../models/Request');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const authorizeRole = require('../middlewares/roleMiddleware');
const { body, validationResult } = require('express-validator');

// Route to get all requests with filtering and pagination (accessible to employees and admins)
router.get('/requests', authenticateToken, async (req, res) => {
  const { page = 1, limit = 10, code, description, employee_id } = req.query;
  const offset = (page - 1) * limit;

  // Create a filter object for the where clause
  const filter = {};
  if (code) filter.code = { [Sequelize.Op.like]: `%${code}%` };
  if (description) filter.description = { [Sequelize.Op.like]: `%${description}%` };
  if (employee_id) filter.employee_id = parseInt(employee_id);

  try {
    // Retrieve requests with filtering and pagination
    const requests = await Request.findAndCountAll({
      where: filter,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    // Send the filtered and paginated response
    res.status(200).json({
      totalItems: requests.count,
      totalPages: Math.ceil(requests.count / limit),
      currentPage: parseInt(page),
      requests: requests.rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving requests', error: error.message });
  }
});

// Request POST route with validation and sanitization
router.post(
  '/requests',
  authenticateToken,
  [
    body('code').isString().notEmpty().withMessage('Code must be a string and cannot be empty'),
    body('description').isString().notEmpty().withMessage('Description must be a string and cannot be empty'),
    body('summary').optional().isString().withMessage('Summary must be a string'),
    body('code').trim().escape(),
    body('description').trim().escape(),
    body('summary').trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, description, summary } = req.body;
    const employee_id = req.user.id;

    try {
      const newRequest = await Request.create({ code, description, summary, employee_id });
      res.status(201).json({ message: 'Request created successfully', request: newRequest });
    } catch (error) {
      res.status(500).json({ message: 'Error creating request', error: error.message });
    }
  }
);

// Request PUT route with validation and sanitization (only accessible to admin users)
router.put(
  '/requests/:id',
  authenticateToken,
  authorizeRole('admin'),
  [
    body('code').optional().isString().withMessage('Code must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('summary').optional().isString().withMessage('Summary must be a string'),
    body('code').trim().escape(),
    body('description').trim().escape(),
    body('summary').trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { code, description, summary } = req.body;

    try {
      // Find the request by ID
      const request = await Request.findByPk(id);
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      // Update request information
      request.code = code || request.code;
      request.description = description || request.description;
      request.summary = summary || request.summary;

      // Save the updated request to the database
      await request.save();

      res.status(200).json({ message: 'Request updated successfully', request });
    } catch (error) {
      res.status(500).json({ message: 'Error updating request', error: error.message });
    }
  }
);


// Route to delete a request (only accessible to admin users)
router.delete('/requests/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { id } = req.params;

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
