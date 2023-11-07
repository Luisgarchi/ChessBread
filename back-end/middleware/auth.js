const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/User')

//const { BadRequestError, UnauthenticatedError} = require('../errors')


// Establish passport authentication strategy
passport.use(new LocalStrategy(async function verify(username, password, next) {
    
    // Check we have both the username and password
    if (!username || !password) {

        return next(null, false, { message: 'Incorrect username or password.' })
    }

    // Try and find a user
    const userDB = await User.findOne({ username })

    // Check that a matching user has been found in the db
    if (!userDB) {
        return next(null, false, { message: `Username: ${username} does not exist.` })
    }

    const isPasswordCorrect = await userDB.comparePassword(password)
    if (isPasswordCorrect) {
        return next(null, userDB)
    } else {
        return next(null, false, { message: 'Incorrect Password' })
    }

}))


passport.serializeUser(function(user, done) {
    console.log('serialize')
    process.nextTick(function() {
        done(null, { id: user.id, username: user.username })
    })
})

passport.deserializeUser(function(user, done) {
    console.log('deserialize')
    process.nextTick(function() {
        return done(null, user);
    });
});


const passportAuthenticate = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true, 
})



module.exports =  {
    passport, 
    passportAuthenticate,
}