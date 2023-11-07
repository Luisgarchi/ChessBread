// -------------------- SET UP --------------------
require('dotenv').config()
require('express-async-errors')

const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')


// ---------- Init App ----------
const express = require('express')
const app = express()

// -------- Engine Setup --------
app.set('views', path.join(__dirname, 'front-end/views'))
app.set('view engine', 'ejs')



// -------------------- MIDDLEWARE --------------------

app.use(express.json())       // Parse json body
app.use(express.urlencoded({ extended: true })) //Parse URL-encoded bodies

// Serve static files
app.use(express.static(path.join(__dirname, 'front-end/public')));



// --------- Security ---------

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
const xss = require('xss-clean')
app.use(xss())


// -------- DB and Session -------
const connectDB = require('./back-end/db/connect')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URI,
    autoRemove: 'interval',
    autoRemoveInterval: 60*24*7}),
  cookie: {maxAge: 1000*60*60*24*7}
}))


app.use(passport.authenticate('session'))
/*
// or 
app.use(passport.initialize())  // line deprecated
app.use(passport.session())
*/

app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

// ---------- ROUTES ----------

  // Authentication
const myroutes = require('./back-end/routes/auth')
app.use('/', myroutes)

const indexRouter = require('./back-end/routes/index')
app.use('/', indexRouter)



// ------ ERROR HANDLERS ------

  // 404 not found
const notFound = require('./back-end/middleware/not-found')
app.use(notFound)


  // Custom Express Error Handler (Always place at the end)
const errorHandlerMiddleware = require('./back-end/middleware/error-handler')
app.use(errorHandlerMiddleware)






// -------------------- START APP --------------------

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