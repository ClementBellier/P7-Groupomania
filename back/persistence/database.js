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
    dialectOptions: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
  },
    define: { timestamps: false },
  }
)

module.exports = database
