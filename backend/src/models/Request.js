const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Request = sequelize.define('Request', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Request;
