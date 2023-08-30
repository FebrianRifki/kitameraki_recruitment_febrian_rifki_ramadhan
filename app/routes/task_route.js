const taskRoute = require('express').Router();
const { task } = require('../controllers')

taskRoute.post('/task', task.createTask);
taskRoute.get('/task', task.getAllTask);
taskRoute.get('/task/:id', task.findOneData);
taskRoute.patch('/task/:id', task.updateTask);
taskRoute.delete('/task/:id', task.deleteTask);

module.exports = taskRoute;