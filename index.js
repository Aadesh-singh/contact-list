const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const Contact = require('./Model/Contact');

const port = 8000;

const contactList = require('./contactList').contactList;

const app = express();


//setting the apps properties
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));


//middlewares

app.use(express.urlencoded());    //for post method
app.use(express.static('assets'));      //for using static files


// routing home page and display contact list
app.get('/', function(req, res){
    // //whithout database
    // return res.render('home', {
    //     title: 'Contact-List',
    //     contact_list: contactList
    // });
    //with database
    Contact.find({}, function(err, all_contacts){
        if(err){
            console.log("Error occured while fetching details: ",err);
            return;
        }
        return res.render('home', {
            title: 'Contact List',
            contact_list: all_contacts
        });
    });
});

//this will render show page
app.get('/show', function(req, res){
    // return res.render('show', {
    //     title: 'Contact-List',
    //     contact_list: contactList
    // });
    Contact.find({}, function(err, all_contacts){
        if(err){
            console.log(err);
            return;
        }
        return res.render('show', {
            title: "Show Contact",
            contact_list: all_contacts
        });
    });
});

//this will add contact to list
app.post('/contact-list', function(req,res){
    //without database

    //  contactList.push(req.body);
    //  return res.redirect('back');

    // with database

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err, newContact){
        if(err){
            console.log(err);
            return;
        }
        console.log('Contact created: ', newContact);
        return res.redirect('back');
    });
})
//this will delete contact from list
app.get('/delete-contact/', function(req,res){
    
    // let phone = req.query.phone;   
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    // return res.redirect('back');


    //with database
    // get the unique id of the document
    let id = req.query.id;

    // use findbyId and delete function

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error deleting the contact", err);
            return;
        }
        return res.redirect('back');
    })


});

app.get('/edit-contact', function(req,res){
    return res.render('edit',{
        id: req.query.id                    //this id is send to update contact
    });
});

app.post('/update-contact', function(req, res){
    let id = req.query.id;
    Contact.findByIdAndUpdate(id, req.body, function(err){
        if(err){
            console.log('err occured while updating');
            return;
        }
        return res.redirect('/');
    });
});

//listen() function
app.listen(port, function(err){
    if(err){
        console.log("Error in this is: ",err);
    }
    console.log('Server is up and running at ',port);
});

