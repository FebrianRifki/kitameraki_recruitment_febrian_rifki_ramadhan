const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./app/config/config')

app.get('/', (req, res) => {
    res.send(
        "welcome to node js app");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, config.connectOptions).then(
    () => {
        console.log('Connected to MongoDB');
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    }).catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
