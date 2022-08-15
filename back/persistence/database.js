const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    define: { timestamps: false },
  }
)

module.exports = database
