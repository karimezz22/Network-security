// controllers/authController.js
const UserModel = require("../models/user");
const { comparePassword } = require("../models/dbMethods/userMethods");
const { sendVerificationEmail, sendPasswordResetEmail} = require("../utils/email");
const { generateToken, generateRandomCode } = require("../utils/token");
const jwt = require("jsonwebtoken");
const { revokedTokens } = require("../middleware/auth");
const { encrypt, decrypt } = require("../utils/encryption");

const register = async (req, res, next) => {
  try {
    const { username, password, email, phoneNumber } = req.body;

    const code = generateRandomCode();

    const decryptedEmail = decrypt(email);
    const decryptedPhone = decrypt(phoneNumber);

    const newUser = await UserModel.create({
      username,
      password,
      email: decryptedEmail,
      phoneNumber: decryptedPhone,
      verificationCode: code.toString(),
    }); 

    await sendVerificationEmail(decryptedEmail, code.toString(), username);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification.",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const decryptedEmail = decrypt(email);

    const user = await UserModel.findOne({ email: decryptedEmail });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!user.emailVerified) {
      return res.status(401).json({
        message:
          "Email not verified. Please check your email for verification.",
      });
    }

    const token = generateToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      // secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    req.session.token = token;
    console.log(req.session.token);
    
    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }

    const encryptedEmail = encrypt(user.email);
    const encryptedPhoneNumber = encrypt(user.phoneNumber);

    res.status(200).json({
      user: {
        ...user.toObject(),
        email: encryptedEmail,
        phoneNumber: encryptedPhoneNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.body;

    const decryptedCode = decrypt(code);

    const user = await UserModel.findOne({ verificationCode: decryptedCode });

    if (!user || user.verificationCode !== decryptedCode) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    user.emailVerified = true;
    user.verificationCode = undefined;
    await user.save();

    res.status(200).json({ message: "Email verification successful." });
  } catch (error) {
    next(error);
  }
};


const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const [, jwtToken] = token.split("Bearer ").filter(Boolean);
      revokedTokens.add(jwtToken);
    }

    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const decryptedEmail = decrypt(email);

    const user = await UserModel.findOne({ email: decryptedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const resetCode = generateRandomCode().toString();
    user.verificationCode = resetCode;

    await user.save();

    await sendPasswordResetEmail(email, resetCode);

    res.status(200).json({
      message: "Password reset email sent. Please check your email.",
    });
  } catch (error) {
    next(error);
  }
};

const verifyResetCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const encryptedEmail = encrypt(email);

    const user = await UserModel.findOne({ email: encryptedEmail });

    if (!user || user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid reset code." });
    }

    res.status(200).json({ message: "Reset code verified successfully." });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    const decryptedEmail = decrypt(email);
    const decryptedCode = decrypt(resetCode);


    const user = await UserModel.findOne({ email: decryptedEmail });

    if (!user) {
      return res.status(404).json({ message: "Invalid email." });
    }

    if (decryptedCode !== user.verificationCode) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    user.password = newPassword;
    user.verificationCode = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    next(error);
  }
};

const protected = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const [, jwtToken] = token.split("Bearer ").filter(Boolean);

    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const userId = decodedToken.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User associated with token does not exist." });
    }

    req.user = user;

    res.status(200).json({ message: "User authenticated." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getUserDetails,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  protected,
};
