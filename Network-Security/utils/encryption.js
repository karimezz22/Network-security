//utils/encryption.js
const crypto = require("crypto");

const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

function encrypt(data, next) {
  try {
    const iv = crypto.randomBytes(8);
    const cipher = crypto.createCipheriv("des-ede3-cbc", key, iv);
    let encryptedData = cipher.update(data, "utf8", "base64");
    encryptedData += cipher.final("base64");
    return iv.toString('hex') + encryptedData;
  } catch (error) {
    next(error);
  }
}

function decrypt(data, next) {
  try {
      const ivHex = data.substring(0, 16);
      const iv = Buffer.from(ivHex, 'hex');
      const encryptedText = data.substring(16);
      const decipher = crypto.createDecipheriv("des-ede3-cbc", key, iv);
      let decryptedData = decipher.update(encryptedText, "base64", "utf8");
      decryptedData += decipher.final("utf8");
      return decryptedData;
  } catch (error) {
      console.error(error);
      next(error);
  }
}


module.exports = {
  encrypt,
  decrypt,
};

