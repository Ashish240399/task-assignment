const {
  getAllEmployeeList,
  getEmployeeByEmail,
} = require("../services/employeeService");

async function httpRequestToGetAllEmployee(req, res) {
  try {
    const employeeList = await getAllEmployeeList();
    return res.status(200).json(employeeList);
  } catch (error) {
    console.log("Error getting all Employee:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function httpRequestToGetEmployeeByEmail(req, res) {
  try {
    const employee = await getEmployeeByEmail(req.body.email);
    return res.status(200).json(employee);
  } catch (error) {
    console.log("Error getting Employee:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  httpRequestToGetAllEmployee,
  httpRequestToGetEmployeeByEmail,
};
