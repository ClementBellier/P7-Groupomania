const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')

router.get('/:id', auth, userCtrl.getAllOfAUser)

module.exports = router