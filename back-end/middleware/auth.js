const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/User')

//const { BadRequestError, UnauthenticatedError} = require('../errors')


// Establish passport authentication strategy
passport.use(new LocalStrategy(async function verify(username, password, next) {
    
    // Check we have both the username and password
    if (!username || !password) {

        return next(null, false, { message: 'Incorrect username or password.' })
        //return next(new BadRequestError('Please provide email and password'))
    }

    // Try and find a user
    const userDB = await User.findOne({ username })

    // Check that a matching user has been found in the db
    if (!userDB) {
        return next(null, false, { message: `Username: ${username} does not exist.` })
        //return next(new UnauthenticatedError(`Username: ${username} does not exist`))
    }

    const isPasswordCorrect = await userDB.comparePassword(password)
    if (isPasswordCorrect) {
        return next(null, userDB)
    } else {
        return next(null, false, { message: 'Incorrect Password' })
    }

}))


passport.serializeUser(function(user, next) {
    console.log('Serialize')
    process.nextTick(function() {
        next(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, next) {
    console.log('deserialize')
    process.nextTick(function() {
        return next(null, user);
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