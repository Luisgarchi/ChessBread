const express = require('express')
const router = express.Router()
const {passportAuthenticate} = require('../middleware/auth')

const {
    registerPage,
    registerUser,
    loginPage,
    logout,
} = require('../controllers/auth')



// Register routes
router.route('/register')
    .get(registerPage)
    .post(registerUser)

// Login routes
router.route('/login')
    .get(loginPage)
    .post(passportAuthenticate)


// Logout routes
router.route('/logout')
    .post(logout)




module.exports = router                 
