const express = require('express')
const { session } = require('passport')
const router = express.Router()


/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.user) { 
        console.log(req.session)
        return res.render('home') 
    }
    console.log(req.user)
    console.log(req.session)
    res.render('index', { user: req.user })
})

module.exports = router