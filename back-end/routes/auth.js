const express = require('express')
const router = express.Router()

const { register, login } = require('../controllers/auth')

// Register routes
router.route('/register').get((req, res) => {res.send('Register Page')}).post(register)

// Logini routes
router.route('/login').get((req, res) => {res.send('Login Page')}).post(login)



module.exports = router                 
