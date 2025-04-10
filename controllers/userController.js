const userModel = require("../models/userModel");

function registerUser(req, res) {
  const user = req.body;
  const result = userModel.registerUser(user);
  res.json(result);
}

module.exports = {
  registerUser,
};