const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000


// assets 
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.render('home');
})




// set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views')) // if only views folder in differnt path
app.set('view engine', 'ejs') // required to set  ejs , pug different types of template engine




app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

