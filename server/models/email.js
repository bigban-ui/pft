const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    emailId: {
        type: String,
        required: true
    },
   
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,
       
    }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
