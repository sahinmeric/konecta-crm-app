const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the Employee model
const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  hireDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Employee;
