const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
//const { BadRequestError, UnauthenticatedError } = require('../errors')
const  {createCustomError} = require('../errors/custom-error')


const register = async (req, res) => {
    const user = await User.create({... req.body})
    res.status(StatusCodes.CREATED).json({user})
}


const login = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    
    if (!email || !password) {
        throw createCustomError('Please provide email and password', StatusCodes.BAD_REQUEST)
    }
    const user = await User.findOne({email})

    if (!user) {
        throw createCustomError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw createCustomError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {username:user.getUserName()}, token })
}



module.exports = {
    register,
    login,
}