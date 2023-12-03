// Create web server application

// Import express module
const express = require('express');
// Import body-parser module
const bodyParser = require('body-parser');
// Import mongoose module
const mongoose = require('mongoose');
// Import morgan module
const morgan = require('morgan');

// Import Comment model
const {Comment} = require('./model');

// Create express application
const app = express();

// Set port for web server
const port = 8080;

// Set up morgan to log all requests to console
app.use(morgan('common'));

// Parse incoming requests with body-parser
app.use(bodyParser.json());

// Connect to mongoose database
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true });

// Create GET request handler for '/comments' endpoint
app.get('/comments', (req, res) => {
    Comment
        .find()
        .then(comments => {
            res.json(comments.map(comment => comment.apiRepr()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Something went wrong'});
        });
});

// Create GET request handler for '/comments/:id' endpoint
app.get('/comments/:id', (req, res) => {
    Comment
        .findById(req.params.id)
        .then(comment => res.json(comment.apiRepr()))
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Something went wrong'});
        });
});

// Create POST request handler for '/comments' endpoint
app.post('/comments', (req, res) => {
    const requiredFields = ['author', 'content', 'created'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }}});
