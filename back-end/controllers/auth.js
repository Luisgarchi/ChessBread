const User = require('../models/User')

// ------------ Register ------------

// GET
const registerPage = (req, res) => {
    res.render('register')
}

// POST
const registerUser = async (req, res) => {
    console.log(req.body)
    const user = await User.create({... req.body})

    req.login(user, function(err) {
        if (err) { return next(err) }
        res.redirect('/')
    })
}


// ------------ Login ------------

// GET
const loginPage = (req, res) => {
    console.log(req.user)
    console.log(req.session)
    res.render('login')
}
// POST - handled by passport "auth" middleware


// ------------ Logout ------------

const logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/')
    })
}



module.exports = {
    registerPage,
    registerUser,
    loginPage,
    logout,
}