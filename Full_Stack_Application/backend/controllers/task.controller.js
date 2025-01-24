const { TaskModel, TaskStatusValues } = require("../models/task.model");
const mongoose = require("mongoose");


const CreateNewTask = async (req, res) => {

    const { name, description, UserID } = req.body;

    try {
        const newTask = new TaskModel({ name, description, user: UserID });
        await newTask.save();
        return res.send(
            {
                success: true,
                msg: "New Task Created Successfully !",
                task: newTask
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                msg: 'Internal Server Error.' + error.message
            }
        );
    }
}


const FetchAndSeachTask = async (req, res) => {

    const { UserID } = req.body;

    let { taskname, status } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    try {

        taskname = new RegExp(taskname, 'i');

        const totalTasks = await TaskModel.find().count();
        console.log("Total Task : ", totalTasks)
        res.append('X-Total-Count', totalTasks);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        if (status) {
            const tasks = await TaskModel.find({ user: UserID, name: taskname, status }).skip(skip).limit(limit).populate("user", "name email");
            return res.status(200).send(
                {
                    success: true,
                    msg: "Tasks Fetched Successfully !",
                    task: tasks
                }
            )
        } else {
            const tasks = await TaskModel.find({ user: UserID, name: taskname }).skip(skip).limit(limit).populate("user", "name email");
            return res.status(200).send(
                {
                    success: true,
                    msg: "Tasks Fetched Successfully !",
                    task: tasks
                }
            );
        }

    } catch (error) {
        return res.status(500).send(
            {
                success: false,
                msg: error.message
            }
        )
    }
}


const UpdateTask = async (req, res) => {

    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).send(
            {
                success: false,
                msg: "Invalid task ID"
            }
        );
    }

    if (!TaskStatusValues.includes(req.body.status)) {
        return res.status(400).send(
            {
                success: false,
                msg: "Invalid Task Status Value !"
            }
        );
    }

    try {

        const verifytask = await TaskModel.findById({ _id: taskId });

        if (verifytask.user == req.body.UserID) {

            const task = await TaskModel.findByIdAndUpdate(
                taskId,
                { status: req.body.status },
                { new: true, runValidators: true }
            );

            return res.status(200).send(
                {
                    success: true,
                    msg: "Task has been updated",
                    task: task
                }
            );

        } else {
            return res.status(400).send({
                success: false,
                msg: "Unauthorized access detected. Accees Denied !!"
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: error.message
        })
    }
}


const DeleteTask = async (req, res) => {

    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).send(
            {
                success: false,
                msg: "Invalid task ID"
            }
        );
    }

    try {
        const task = await TaskModel.findById({ _id: taskId });

        if (task.user == req.body.UserID) {
            await TaskModel.findByIdAndDelete({ _id: taskId });
            return res.status(200).send(
                {
                    success: true,
                    msg: "Task has been deleted."
                }
            );
        } else {
            return res.status(400).send(
                {
                    success: false,
                    msg: "Unauthorized access detected. Accees Denied"
                }
            )
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: error.message

        })
    }
}


module.exports = {
    CreateNewTask,
    FetchAndSeachTask,
    UpdateTask,
    DeleteTask
}