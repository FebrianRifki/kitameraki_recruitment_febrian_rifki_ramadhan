const userRoute = require('express').Router();
const { user } = require('../controllers');


userRoute.post('/user/register', user.register);
userRoute.post('/user/login', user.login);
userRoute.get('/user/logout', user.logout);

module.exports = userRoute;