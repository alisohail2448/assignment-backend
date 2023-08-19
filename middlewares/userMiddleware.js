const Student = require("../models/studentModel.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const userMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }

  const jwtSecret = process.env.JWT_SECRET;

  try {
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await Student.findOne({universityID: decoded?.id});
        req.user = user;
        // console.log(decoded);
        next();
      }
    }
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = { userMiddleware };
