const Task = require('../models/task');

exports.createTask = async (req, res) => {
    try {
        const newTask = req.body;
        if (req.body.id == "") {
            return res.status(400).send({
                status: "Bad Request",
                message: "Id is required",
                data: {}
            });
        } else if (req.body.title == "") {
            return res.status(400).send({
                status: "Bad Request",
                message: "Title is required",
                data: {}
            });
        } else if (req.body.status == "") {
            return res.status(400).send({
                status: "Bad Request",
                message: "Status is required",
                data: {}
            });
        } else {
            const createdTask = await Task.create(newTask);
            return res.status(201).send({
                status: "Success",
                message: "Success",
                data: createdTask
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Internal Server Error!",
            data: {}

        });
    }
}

exports.getAllTask = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
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
            message: "Internal Server Error!",
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
            message: "Internal Server Error!",
            data: {}
        });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body;
        const task = await Task.find({ id: taskId });
        if (task.length === 0) {
            res.status(404).send({
                status: "Not Found",
                message: `Task with ID ${taskId} Not Found`,
                data: {}
            });
        } else {
            const requiredFields = ["id", "title", "status"];
            for (const field of requiredFields) {
                if (updateData.hasOwnProperty(field) && updateData[field] === "") {
                    return res.status(400).send({
                        status: "Bad Request",
                        message: `${field} cannot be updated to empty string`,
                        data: {}
                    });
                }
            }
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
            message: "Internal Server Error!",
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
        res.status(200).send({
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



