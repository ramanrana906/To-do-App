const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/to_do_db');


const db = mongoose.connection;

db.on('error',console.error.bind(console,'errror connceting to the database'));
db.once('open',function(){

console.log("Succesfully connected to the database");
});