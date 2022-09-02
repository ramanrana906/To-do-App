const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const bodyParser= require('body-parser');
const db = require('./config/mongoose');
const Task  = require('./models/task');



app.use(express.static('assets'));
app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'));
app.use(bodyParser.urlencoded({extended:false}));


app.listen(port,function(err){
    if(err){
        console.log("Error while starting the server")
    }
    else{
        console.log("server succesfully running on the port",port);
    }
})