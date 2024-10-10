const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const requestRoutes = require('./routes/requestRoutes');
const Employee = require('./models/Employee');
const Request = require('./models/Request');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Employee routes
app.use('/api', employeeRoutes);

// Request routes
app.use('/api', requestRoutes);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Synchronize all models with the database
sequelize.sync()
  .then(() => console.log('All models were synchronized successfully.'))
  .catch(err => console.log('Error synchronizing models: ' + err));

// Root route to check if the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Konecta CRM App!');
});

module.exports = app;
