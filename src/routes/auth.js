const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../config/middleware/auth");

router.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      password: encryptedPassword,
      emailId,
    });
    await user.save();
    res.send("User Added Succesfully");
  } catch (error) {
    res.status(400).send("error saving the user" + error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email is not present in DB");
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid", isPasswordValid);
    const token = await jwt.sign({ userId: user._id }, "Dev@Tinder@123@456");
    console.log(token);
    if (isPasswordValid) {
      res.cookie("token", token);
      res.send("Password is valid");
    } else {
      throw new Error("password is not valid");
    }
  } catch (error) {
    res.status(400).send("wrong credentials");
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.send("User logout successfully")
  } catch (error) {
    res.status(400).send("unable to logout");
  }
});
module.exports = router;
