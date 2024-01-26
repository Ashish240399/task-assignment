const { pool } = require("../database/database");

async function createAdmin(name, email, password) {
  const admin = { name, email, password };
  try {
    const [result] = await pool.query("INSERT INTO admin SET ?", admin);
    admin.id = result.insertId;
    return admin;
  } catch (error) {
    throw error;
  }
}

async function getAllAdmin() {
  try {
    const admins = await pool.query("SELECT * FROM admin");
    return admins[0];
  } catch (error) {
    throw error;
  }
}
module.exports = { createAdmin, getAllAdmin };
