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
