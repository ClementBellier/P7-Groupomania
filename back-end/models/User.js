//const mongoose = require('mongoose')
//
//const uniqueValidator = require('mongoose-unique-validator')
//
//const userSchema = mongoose.Schema({
//    email: {type: String, require: true, unique: true},
//    password:{type: String, require: true},
//    role:{type: String, require: true, default:'user'}
//})
//
//userSchema.plugin(uniqueValidator)
//
//module.exports = mongoose.model('User', userSchema)

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