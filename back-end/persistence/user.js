const userModel = require('../models/User')

exports.saveUserInDB = async (email, password) =>{
    return userModel.create({email: email,password: password})
        .then(savedUser => savedUser)
        .catch(error => {return {error: error.message}})
}

exports.findUserInDB = async (email) => {
    return userModel.findOne({where: {email: email}})
        .then(user => user)
        .catch(error => {return {error}})
}

exports.findUserByIdInDB = async (userId) => {
    return userModel.findOne({where:{id: userId}})
        .then(userInDB => {
            console.log(userInDB)
            return userInDB
        })
        .catch(error => {return {error}})
}