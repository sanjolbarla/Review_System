var express = require("express"),
  app = express(),
  port = 5000,
  mongoose = require("mongoose"),
  Task = require("./api/models/user"), //created model loading here
  bodyParser = require("body-parser");

const cors = require("cors");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/User", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./api/routes/userRoutes"); //importing route
routes(app); //register the route

app.listen(5000, function () {
  console.log("Server is running on port 5000");
});
