//models/user.js
const mongoose = require("mongoose");
const { hashPassword } = require("./dbMethods/userMethods");
const { encrypt } = require("../utils/encryption");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      minlength: [4, "Username must be at least 4 characters long."],
      maxlength: [20, "Username cannot exceed 20 characters."],
    },
    password: {
      type: String,
      index: true,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters long."],
    },
    email: {
      type: String,
      index: true,
      required: [true, "Email is required."],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await hashPassword(this.password);

    // if (this.isModified("email")) {
    //   this.email = encrypt(this.email);
    // }
    // if (this.isModified("phoneNumber")) {
    //   this.phoneNumber = encrypt(this.phoneNumber);
    // }
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
