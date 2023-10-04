const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morgan =require('morgan')
const routes=require('./server/routes/recipeRoutes')
require('dotenv').config()
const app=express();
const port=process.env.PORT || 3310;
const mongoose= require('mongoose');
const connectDB=require('./server/db');

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(expressLayouts)

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
  }));
  app.use(flash());
  app.use(fileUpload());

app.set('layout','./layouts/main')
app.set('view engine','ejs')

// Api
app.use('/',routes)

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

// Connect To MongoDB
connectDB();
// Test database connection
mongoose.connection.once('open',()=>{
    console.log("Connected successfully to MongoDB")
    app.listen(port, console.log(`Server is running in ${process.env.NODE_ENV} mode on port:${port}`))

})
