const express = require("express");
const router = express.Router();
const { userAuth } = require("./config/middleware/auth");

router.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("user", user);
    res.send(user);
  } catch (error) {
    res.send("error", error.message);
  }
});

module.exports = router;
