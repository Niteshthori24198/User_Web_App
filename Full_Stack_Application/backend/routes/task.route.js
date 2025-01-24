const { Router } = require('express');
const taskRouter = Router();

const {
    CreateNewTask,
    FetchAndSeachTask,
    UpdateTask,
    DeleteTask
} = require('../controllers/task.controller')


taskRouter.post("/create", CreateNewTask);
taskRouter.get("/get", FetchAndSeachTask);
taskRouter.patch("/update/:taskId", UpdateTask);
taskRouter.delete("/delete/:taskId", DeleteTask);


module.exports = {
    taskRouter
}