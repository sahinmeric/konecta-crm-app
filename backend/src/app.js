const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Simple route to verify server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Konecta CRM App!');
});

module.exports = app;
