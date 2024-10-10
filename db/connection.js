const { Sequelize, DataTypes } = require('sequelize');
const path = require("path");

// Simple Sequelize instance with basic connection details
const db = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite')
});

module.exports = {
    db,
    DataTypes
}