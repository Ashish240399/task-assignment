const { registration, login } = require("../services/authService");

async function httpRequestToRegister(req, res) {
  const { name, email, password } = req.body;
  try {
    const result = await registration(name, email, password);
    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function httpRequestToLogin(req, res) {
  try {
    const result = await login(req.body.email, req.body.password);
    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { httpRequestToRegister, httpRequestToLogin };
