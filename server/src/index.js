const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
const {
  httpRequestToAddAdmin,
  httpRequestToGetAllAdmins,
} = require("./controllers/adminController.js");
const { connectDB } = require("./database/database.js");
const {
  httpRequestToRegister,
  httpRequestToLogin,
} = require("./controllers/authController.js");
const {
  httpRequestToGetAllEmployee,
  httpRequestToGetEmployeeByEmail,
} = require("./controllers/employeeController.js");
const {
  httpRequestToAddTask,
  httpRequestToGetAllTasks,
  httpRequestToUpdateTask,
} = require("./controllers/taskController.js");

connectDB();

app.post("/createAdmin", httpRequestToAddAdmin);
app.get("/getAllAdmin", httpRequestToGetAllAdmins);
app.post("/register", httpRequestToRegister);
app.post("/login", httpRequestToLogin);
app.get("/getAllEmployee", httpRequestToGetAllEmployee);
app.get("/getEmplyeeByEmail", httpRequestToGetEmployeeByEmail);
app.post("/addTask", httpRequestToAddTask);
app.put("/updateTaskStatus/:taskId", httpRequestToUpdateTask);
app.get("/getAllTasks", httpRequestToGetAllTasks);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
