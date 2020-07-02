const express = require('express')
const dotenv = require('dotenv')
const exphbs =  require('express-handlebars')
const morgan = require('morgan')
const connectDB = require('./config/db')
//Load config 
dotenv.config({path:'./config/config.env'})

connectDB()

const app = express()

if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'))
    console.log(`morgan`)
}
app.engine('.hbs',exphbs({defaultLayout:'main', extname:'.hbs'}))
app.set('view engine','.hbs')


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))