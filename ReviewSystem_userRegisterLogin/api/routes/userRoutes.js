"use strict";
module.exports = function (app) {
  var controllers = require("../controllers/userController");

  // todoList Routes
  app.route("/createUser").post(controllers.createUser);
  app.route("/loginUser").post(controllers.loginUser);
};
