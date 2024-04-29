//models/dbMethods/userMethods.js
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

async function comparePassword(candidatePassword, hashedPassword) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
