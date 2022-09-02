const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    dueDate: {
        type: String,
        required: false
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;