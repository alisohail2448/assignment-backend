const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Dean = require("../models/deanModel.js");

const deanMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }

  const jwtSecret = process.env.JWT_SECRET;
  // console.log(token);
  try {
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await Dean.findOne({universityID: decoded?.id});
        req.user = user;
        // console.log(user);
        next();
      }
    }
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = { deanMiddleware };
