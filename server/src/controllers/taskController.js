const { addTask, getAllTasks, updateTask } = require("../services/taskService");

async function httpRequestToAddTask(req, res) {
  const { title, created_by, assigned_to, expires_at } = req.body;
  try {
    const result = await addTask(title, created_by, assigned_to, expires_at);
    res.status(result.status).json(result);
  } catch (error) {
    console.log("Error in adding task", error);
  }
}

async function httpRequestToUpdateTask(req, res) {
  const taskId = +req.params.taskId;
  const { taskKey, taskValue } = req.body;
  try {
    const result = await updateTask(taskId, taskKey, taskValue);
    return res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function httpRequestToGetAllTasks(req, res, next) {
  const { status, assigned_to, created_by, search } = req.query;
  try {
    const result = await getAllTasks(status, assigned_to, created_by, search);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json("error", error);
  }
}

module.exports = {
  httpRequestToAddTask,
  httpRequestToUpdateTask,
  httpRequestToGetAllTasks,
};
