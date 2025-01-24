const mongoose = require('mongoose');
const { UserModel } = require('./user.model');

const TaskStatusValues = ["pending", "completed", "done"];

const taskSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, required: true },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'done'], default: 'pending' },
});

const TaskModel = mongoose.model('task', taskSchema);

module.exports = {
    TaskModel,
    TaskStatusValues
}
