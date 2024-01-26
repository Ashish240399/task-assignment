const { createAdmin, getAllAdmin } = require("../services/adminService");

async function httpRequestToAddAdmin(req, res, next) {
  const { name, email, password } = req.body;
  try {
    const result = await createAdmin(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function httpRequestToGetAllAdmins(req, res) {
  try {
    const admins = await getAllAdmin();
    return res.status(200).json(admins);
  } catch (error) {
    console.log("Error getting all admins:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = { httpRequestToAddAdmin, httpRequestToGetAllAdmins };
