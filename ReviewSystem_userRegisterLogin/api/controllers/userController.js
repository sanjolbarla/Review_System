"use strict";

var mongoose = require("mongoose"),
  User = mongoose.model("User");
const { query } = require("express");
var jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

exports.createUser = async function (req, res) {
  try {
    var userparams = req.body;
    const { username, email, password: plainTextPassword } = req.body;
    console.log(userparams.username);
    // if (userparams.username == "") {
    //   res.send("username cannot be empty");
    //   return;
    // }

    // if (
    //   !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    //     userparams.email
    //   )
    // ) {
    //   res.send(" invalid email id");
    // }
    // if (!/^[A-Za-z]\w{8,16}$/.test(userparams.password)) {
    //   res.send("invalid password,try another");
    //   return;
    // }

    const password = await bcrypt.hash(plainTextPassword, 10);

    const new_user = new User({
      username,
      email,
      password,
    });
    await new_user.save();
    console.log("User created successfully: ", new_user);
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern["username"] == 1) {
        return res.json({ status: "error", error: "Username already in Use" });
      }
      if (error.keyPattern["email"] == 1) {
        return res.json({ status: "error", error: "Email Id already in Use" });
      }
    }
    throw error;
  }
  res.json({ status: "ok" });
};

exports.loginUser = async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      JWT_SECRET
    );

    const userDetails = {
      status: "Success",
      accesstoken: token,
      username: user.username,
      email: user.email,
    };
    return res.send(JSON.stringify(userDetails));

    // return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid username/password" });
};
