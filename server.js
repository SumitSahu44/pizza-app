require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require("connect-mongo")(session);
const passport = require('passport')


// database connectivity 
const url = 'mongodb://localhost/pizza';
mongoose.connect('mongodb://127.0.0.1:27017/pizza');
const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('database connected...');
// })

// session store 
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: 'sessions'
});

//  session config 
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24} // 24hr valid
}))

// passport config 
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())






app.use(flash())


// assets 
app.use(express.static('public'))
// for body data 
app.use(express.urlencoded({extended:false}))
app.use(express.json()) 

// global middleware 
app.use((req,res,next)=>{
res.locals.session = req.session
res.locals.user = req.user
next()
})


// set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views')) // if only views folder in differnt path
app.set('view engine', 'ejs') // required to set  ejs , pug different types of template engine

require('./routes/web')(app);








app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

