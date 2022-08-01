const Sequelize = require('sequelize')
const database = require('../persistence/database')

const userSchema = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    role: {
        type: Sequelize.STRING(20),
        defaultValue: 'user'
    }
})

module.exports = userSchema