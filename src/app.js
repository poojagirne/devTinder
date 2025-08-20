const express = require("express");
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");
const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/requests");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);


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
