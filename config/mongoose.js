//require library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contact_list_db'); 

// aquire the connection to check if it is successful
const db = mongoose.connection;

//err
//firing event in nodejs using on
db.on('error', console.error.bind(console, 'Error connecting to db'));

//up and running then print the message
//once is a inbuilt function
db.once('open',  function(){
    console.log('Successfully connected to database');
});

