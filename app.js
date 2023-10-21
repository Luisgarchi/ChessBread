// -------------------- SET UP --------------------
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()


// -------------------- MIDDLEWARE --------------------

// json body
app.use(express.json())

// Limit requests
const rateLimiter = require('express-rate-limit')
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}))

// Header security
const helmet = require('helmet')
app.use(helmet())

// Cross Origin Requests
const cors = require('cors')
app.use(cors())

// Prevent Cross Site Scripting attacks
const xss = require('xss')
app.use(xss())

// ---------- ROUTES ----------

  // Authentication
const myroutes = require('./back-end/routes/auth')
app.use('/', myroutes)


// ------ ERROR HANDLERS ------

  // 404 not found
const notFound = require('./back-end/middleware/not-found')
app.use(notFound)


  // Custom Express Error Handler (Always place at the end)
const errorHandlerMiddleware = require('./back-end/middleware/error-handler')
app.use(errorHandlerMiddleware)




// -------------------- START APP --------------------
const connectDB = require('./back-end/db/connect')

const port = process.env.PORT || 3000


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error)
  }
}

start()