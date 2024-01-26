const { pool } = require("../database/database");

async function getAllEmployeeList() {
  try {
    const employeeList = await pool.query("SELECT * FROM employee");
    return employeeList[0];
  } catch (error) {
    throw error;
  }
}

async function getEmployeeByEmail(email) {
  try {
    const employee = await pool.query(
      "SELECT name,email,password FROM employee WHERE email = ? ",
      email
    );
    return employee[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { getAllEmployeeList, getEmployeeByEmail };
