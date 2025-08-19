const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new error("Token not found !!!!!!!!!!!!!");
    }

    var decoded = await jwt.verify(token, "Dev@Tinder@123@456");
    const user = await User.findById({ _id: decoded.userId });
    console.log(decoded.userId);
    console.log("useruseruser", user);
    if (!user) {
      throw new Error("usrr not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Error("user not allowed");
  }
};
module.exports = {
  userAuth,
};
