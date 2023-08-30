const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, maxLength: 100, required: true },
    description: { type: String, maxLength: 1000 },
    dueDate: { type: Date },
    priority: { type: String, enum: ["low", "medium", "high"] },
    status: { type: String, enum: ["todo", "in-progress", "completed"], required: true },
    tags: [{ type: String, maxLength: 50 }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;