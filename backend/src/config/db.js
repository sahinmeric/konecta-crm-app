const { Sequelize } = require('sequelize');
console.log('Database storage path:', '/data/database.sqlite');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/data/database.sqlite',
});

module.exports = sequelize;
