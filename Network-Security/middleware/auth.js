// middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const revokedTokens = new Set();

const verifyToken = async (token) => {
  try {
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new Error("Invalid token format.");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }

      if (revokedTokens.has(token)) {
        return res.status(401).json({ message: "Token has been revoked." });
      }

      return decodedToken;
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired.");
    } else {
      throw new Error("Authentication failed.");
    }
  }
};

const authenticated = async (req, res, next) => {
  try {
    const token = req.session.token;

    const decodedToken = await verifyToken(token);

    req.userData = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.session.token;

    const decodedToken = await verifyToken(token);

    if (!decodedToken || !decodedToken.role || decodedToken.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access required." });
    }

    req.userData = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { authenticated, isAdmin, revokedTokens };