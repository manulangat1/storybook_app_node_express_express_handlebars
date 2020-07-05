const express = require('express')
const dotenv = require('dotenv')
const exphbs =  require('express-handlebars')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')
//Load config 
dotenv.config({path:'./config/config.env'})

connectDB()
///passport config 
require('./config/passport')(passport)
const app = express()
//Logginf 
if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'))
    console.log(`How are you`)
}
//handlebars
app.engine('.hbs',exphbs({defaultLayout:'main', extname:'.hbs'}))
app.set('view engine','.hbs')
//session
app.use(
    session({
        secret:'jjdjjd',
        resave:false,
        saveUninitialized:false,
        store:new MongoStore({mongooseConnection:mongoose.connection})
    })
)

//passport iddleware
app.use(passport.initialize())
app.use(passport.session())
// static folder
app.use(express.static(path.join(__dirname,'public')))
//Link to routes 
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))