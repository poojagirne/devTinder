const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { userAuth } = require("../config/middleware/auth");

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.send("error", error.message);
  }
});

router.patch("/profile/edit",userAuth,async( req,res)=>{
  try {
    const loggedInUser=req.user;
    console.log("findUser",loggedInUser)
    Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key])
    loggedInUser.save()
    res.send(loggedInUser)
  } catch (error) {
    res.status(400).send("unable to update")
  }
})
module.exports = router;
