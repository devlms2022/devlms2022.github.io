require("dotenv").config();
const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env;

console.log(NODE_ENV);

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging : NODE_ENV === 'development' ? true : false
});

module.exports = sequelize;
