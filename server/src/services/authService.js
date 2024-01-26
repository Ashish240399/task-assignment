const { pool } = require("../database/database");
const { getEmployeeByEmail } = require("./employeeService");

async function registration(name, email, password) {
  const employee = { name, email, password };
  const emailExists = await isEmailExists(email);
  if (emailExists) {
    return { status: 409, error: "Email already exists" };
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO employee (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    employee.id = result.insertId;
    return { status: 201, response: employee };
  } catch (error) {
    throw error;
  }
}

async function login(email, password) {
  if (
    (email == "admin@gmail.com" && password == "admin") ||
    (email == "admin1@gmail.com" && password == "admin1") ||
    (email == "ashish@gmail.com" && password == "Ashish7797")
  ) {
    return { status: 200, message: "Login Successful", role: "admin" };
  }
  try {
    const emailExists = await isEmailExists(email);
    if (!emailExists) {
      return { status: 404, error: "Email does not exist" };
    }
    const employeeByEmail = await getEmployeeByEmail(email);
    if (employeeByEmail[0].password !== password) {
      return { status: 404, error: "Password does not match" };
    }

    return { status: 200, message: "Login Successful", role: "employee" };
  } catch (error) {
    throw error;
  }
}

async function isEmailExists(email) {
  const [rows] = await pool.query(
    "SELECT COUNT(*) as count FROM employee WHERE email = ?",
    [email]
  );
  return rows[0].count > 0;
}

module.exports = { registration, login };
