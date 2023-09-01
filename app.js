const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./app/config/config')
const taskRoute = require('./app/routes/task_route');
const userRoute = require('./app/routes/user_route');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./app/config/swagger_def');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get('/', (req, res) => {
    res.send(
        "server is running");
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', taskRoute);
app.use('/', userRoute);

mongoose.connect(config.mongoURI, config.connectOptions).then(
    () => {
        console.log('Connected to MongoDB');
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    }).catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
