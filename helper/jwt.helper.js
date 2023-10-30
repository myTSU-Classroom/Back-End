const jwt = require("jsonwebtoken");
require("dotenv/config");
const secret = "" + process.env.JWT_SECRET;
const { User } = require("../models/user.model");

// Validate user credentials
async function validateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      error: true,
      message: "Access token is missing.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, secret);

    if (!decodedToken) {
      return res.status(403).json({
        error: true,
        message: "Access token is invalid.",
      });
    }

    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User is not found.",
      });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
}

// Validate admin credentials
async function validateAdminToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      error: true,
      message: "Access token is missing.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, secret);

    if (!decodedToken) {
      return res.status(403).json({
        error: true,
        message: "Access token is invalid.",
      });
    }

    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Admin user is not found in the access token.",
      });
    }

    if (!user.isAdmin) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized access.",
      });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
}

module.exports = {
  validateToken,
  validateAdminToken,
};
