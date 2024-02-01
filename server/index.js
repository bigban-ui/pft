const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('./db/connection');
const Email = require('./models/email');
require('dotenv').config();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send("WORKING")
})

app.post('/api/email', async (req, res) => {
    try {
        // Destructuring data from request body
        const { firstName, lastName, emailId } = req.body;
        
        // Creating a new document using the Mongoose model
        const newEmail = new Email({ firstName, lastName, emailId });
        
        // Saving the new document to the database
        await newEmail.save();
        
        // Sending a success response
        res.status(200).send('Email created successfully');
    } catch (error) {
        // Handling errors
        console.error(error); // Log the error for debugging
        res.status(500).send('Internal Server Error'); // Send a generic error response
    }
});

app.listen(port, ()=>{
    console.log(`app is running ${port}` );
})
