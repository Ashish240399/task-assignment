const { pool } = require("../database/database");
const moment = require("moment");
async function addTask(title, created_by, assigned_to, expires_at) {
  const [rowsForAdminId] = await pool.query(
    "SELECT id FROM admin WHERE email = ?",
    [created_by]
  );
  const adminId = rowsForAdminId[0].id;

  const [rowsForEmployeeId] = await pool.query(
    "SELECT id FROM employee WHERE email =?",
    [assigned_to]
  );
  const employeeId = rowsForEmployeeId[0].id;

  const titleExists = await isTaskTitleExist(title);
  if (titleExists) {
    return { status: 409, error: "Task title already exists" };
  }
  const formattedExpirationDate = moment(expires_at).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  // Example SQL query to insert a new task with the formatted expiration date
  const insertQuery = `
  INSERT INTO tasks (title, created_by, assigned_to, expires_at, status)
  VALUES (?, ?, ?, ?, ?);
`;

  const values = [
    title,
    adminId,
    employeeId,
    formattedExpirationDate,
    "Pending",
  ];

  const result = await pool.query(insertQuery, values);
  return { status: 201, response: result };
}

async function updateTask(taskId, taskKey, taskValue) {
  try {
    const [result] = await pool.query(
      `UPDATE tasks SET ${taskKey} = ? WHERE id = ?`,
      [taskValue, taskId]
    );
    if (result.affectedRows === 0) {
      return { status: 404, error: "Task not found" };
    }
    return {
      status: 200,
      response: "Task updated successfully",
    };
  } catch (error) {
    throw error;
  }
}

async function getAllTasks(status, assigned_to, created_by, search) {
  try {
    const values = [];

    let whereClause = "WHERE 1=1";

    if (status !== undefined) {
      whereClause += " AND status = ?";
      values.push(status);
    }

    if (assigned_to !== undefined) {
      whereClause += " AND assigned_to = ?";
      values.push(assigned_to);
    }

    if (created_by !== undefined) {
      whereClause += " AND created_by = ?";
      values.push(created_by);
    }

    if (search !== undefined) {
      whereClause += " AND title LIKE ?";
      values.push(`%${search}%`);
    }

    const sql = `SELECT * FROM tasks ${whereClause}`;
    const result = await pool.query(sql, values);
    return result[0];
  } catch (error) {
    throw error;
  }
}

async function isTaskTitleExist(title) {
  const [titleRow] = await pool.query(
    "SELECT id FROM tasks WHERE title =?",
    title
  );
  if (titleRow.length > 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  addTask,
  getAllTasks,
  updateTask,
};
