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
// app.use("/", requestRouter);
// app.get("/userInfo/:id", userAuth, async (req, res) => {
//   try {
//     const userId = req.params;
//     console.log("userId", userId);
//     const user=await User.findById(userId.id)
//     res.send(user)
//   } catch (error) {
//     res.send("error",error.message)
//   }
// });

// app.post("/sendConnectionRequest", userAuth, async (req, res) => {
//   try {
//   } catch (error) {}
// });

// app.get("/user", async (req, res) => {
//   try {
//     const userEmail = req.body.emailId;
//     console.log(userEmail);
//     const user = await User.find({ emailId: userEmail });
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("not found");
//   }
// });


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
