const mysql = require("mysql2");
const { host, port, user, password, database } = require("../config/config");

const dbConfig = {
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
};

const pool = mysql.createPool(dbConfig).promise();

function connectDB() {
  pool
    .getConnection()
    .then((connection) => {
      console.log("Connected to MySQL database");
      connection.release(); // Release the connection back to the pool
    })
    .catch((err) => {
      console.error("Error connecting to MySQL:", err);
      throw err;
    });
}

module.exports = { pool, connectDB };
