const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signUp", async (req, res) => {
  //creating a new instance of user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Succesfully");
  } catch (error) {
    res.status(400).send("error saving the user" + error);
  }
});

app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    console.log(userEmail)
    const user =await User.find({ emailId: userEmail });
    res.send(user)
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
