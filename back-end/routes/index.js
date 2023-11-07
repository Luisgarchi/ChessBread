const express = require('express')
const { session } = require('passport')
const router = express.Router()


/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.user) { 
        return res.render('home') 
    }
    res.render('index', { user: req.user })
})

module.exports = router