//require file
const mongoose = require('mongoose');

//create schema
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});


//create models
const Contact = mongoose.model('Contact', ContactSchema);


module.exports = Contact;
