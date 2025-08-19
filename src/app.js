const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./config/middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.post("/signUp", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("user", user);
    res.send(user);
  } catch (error) {
    res.send("error", error.message);
  }
});

app.get("/userInfo/:id", userAuth, async (req, res) => {
  try {
    const userId = req.params;
    console.log("userId", userId);
    const user=await User.findById(userId.id)
    res.send(user)
  } catch (error) {
    res.send("error",error.message)
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
  } catch (error) {}
});

app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    console.log(userEmail);
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (error) {
    res.status(400).send("not found");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is connected successfully");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
