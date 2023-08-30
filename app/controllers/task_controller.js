const Task = require('../models/task');
const mongoose = require('mongoose');

exports.createTask = async (req, res) => {
    try {
        const newTask = req.body;
        const createdTask = await Task.create(newTask);
        res.status(201).send({
            status: "success",
            message: "success",
            data: createdTask
        });
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Internal Server Error",
            data: {}

        });
    }
}

exports.getAllTask = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;
        const tasks = await Task.find().skip(skip).limit(limit);
        res.status(200).send({
            status: "Success",
            message: "Success",
            data: tasks
        });
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: error.message,
            data: {}

        });
    }
}

exports.findOneData = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findOne({ id: taskId });
        if (!task) {
            res.status(404).send({
                status: "Not Found",
                message: `Task with ID ${taskId} Not Found`,
                data: {}
            });
        } else {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: task
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: error.message,
            data: {}
        });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body
        const task = await Task.find({ id: taskId });
        if (task.length === 0) {
            res.status(404).send({
                status: "Not Found",
                message: `Task with ID ${taskId} Not Found`,
                data: {}
            });
        } else {
            await Task.updateMany({ id: taskId }, updateData);
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: {}
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: error.message,
            data: {}
        });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findOneAndDelete({ id: taskId });
        if (!deletedTask) {
            return res.status(404).send({
                status: "Not Found",
                message: `Task with ID ${taskId} Not Found`,
                data: {}
            });
        }
        res.send({
            "status": "Success",
            "message": `Success delete Task`,
            "data": {}
        });
    } catch (error) {
        res.status(500).send({
            "status": "Failed",
            "message": "Internal Server Error!",
            "data": {}
        })
    }
};



