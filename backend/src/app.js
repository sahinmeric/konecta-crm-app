const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const User = require('./models/User');

dotenv.config();

const app = express();
app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));


sequelize.sync({ force: true })
  .then(() => console.log('All models were synchronized successfully.'))
  .catch(err => console.log('Error synchronizing models: ' + err));

app.get('/', (req, res) => {
  res.send('Welcome to the Konecta CRM App!');
});

module.exports = app;
