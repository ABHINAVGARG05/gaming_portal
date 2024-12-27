const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/userModel")
require('dotenv').config();

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "User is not authorized or token missing" });
  }

  token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "User is not authorized" });
      }
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ message: "Invalid token payload" });
      }
      req.user = { userId: decoded.userId, role: decoded.role };
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

  
const validateIsAdmin = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "User is not authorized or token missing" });
  }

  token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "User is not authorized" });
      }
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ message: "Invalid token payload" });
      }
      const userId = decoded.userId;
      const isAdmin = decoded.role === "admin";

      if (!isAdmin) {
        return res.status(403).json({ message: "User is not an admin" });
      }

      req.userId = userId;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

  
  const isAdmin = async (req, res, next) => {
    try {
        const userID = req.user.userId;
        const user = await User.findById(userID);
        if (user.role === "admin") {
            next();
        } else {
            return res.status(403).json({
            error: "Forbidden: You do not have administrative privileges",
            });
        }
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = {
    validateToken,
    validateIsAdmin,
    isAdmin,
  };
  