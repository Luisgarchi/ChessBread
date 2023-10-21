const mongooose = require('mongoose')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongooose.Schema({
    username : {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength:50,
        unique:true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            'Please provide an email'],
        unique:true,
    },
    password : {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },
    
    chessdotcomUser: {
        type: String,
        default: '',
    },
    lichessUser: {
        type: String,
        default: '',
    }
})

// On Registration
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password,salt)
})

// Check password
UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

// Set JWT
UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME}
    )
}


// Getters 
UserSchema.methods.getUserName = function (){
    return this.username
}




module.exports = mongooose.model('User', UserSchema)