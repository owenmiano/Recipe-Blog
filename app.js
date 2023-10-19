const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');

const flash = require('connect-flash');
const routes=require('./server/routes/recipeRoutes')
require('dotenv').config()
const app=express();

const port=process.env.PORT || 3310;
const mongoose= require('mongoose');
const connectDB=require('./server/db');

// Configure express-session
app.use(
  session({
    secret: 'cookingSecretBlog', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
  })
);
// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressLayouts)


  app.use(flash());
  app.use(fileUpload());

app.set('layout','./layouts/main')
app.set('views', __dirname + '/views');
app.set('view engine','ejs')

// Api
app.use('/',routes)

//load assets
app.use('/styles', express.static(path.resolve(__dirname, "public/styles")));
app.use('/img', express.static(path.resolve(__dirname, "public/img")));
app.use('/js', express.static(path.resolve(__dirname, "public/js")));
app.use('/uploads', express.static(path.resolve(__dirname, "public/uploads")));

// Connect To MongoDB
connectDB();
// Test database connection
mongoose.connection.once('open',()=>{
    console.log("Connected successfully to MongoDB")
    app.listen(port, console.log(`Server is running on port:${port}`))

})
