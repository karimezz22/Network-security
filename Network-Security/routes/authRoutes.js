//routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../utils/validators/authValidator");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const { authenticated, isAdmin } = require('../middleware/auth');
const { encrypt, decrypt } = require('../utils/encryption');

router.post("/register",              registerValidator,   authController.register);
router.get("/getUser/:id",                authController.getUserDetails);
router.post("/login",                 loginValidator,      authController.login);
router.post("/verify-email",     authController.verifyEmail);
router.post("/logout",                 authController.logout);
router.post("/forgot-password",        authController.forgotPassword);
router.post("/reset-password",  authController.resetPassword);
// router.get("/protected",               authController.protected);
router.get('/protected', authenticated, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed.' });
  });
  
  router.get('/admin', isAdmin, (req, res) => {
    res.status(200).json({ message: 'Admin route accessed.' });
  });



//   // Route to encrypt data
// router.post('/encrypt', (req, res) => {
//   const { data } = req.body;
//   encrypt(data, (error, encryptedData) => {
//     if (error) {
//       return res.status(500).json({ error: 'Encryption failed' });
//     }
//     res.status(200).json({ encryptedData });
//   });
// });

// // Route to decrypt data
// router.post('/decrypt', (req, res) => {
//   const { data } = req.body;
//   decrypt(data, (error, decryptedData) => {
//     if (error) {
//       return res.status(500).json({ error: 'Decryption failed' });
//     }
//     res.status(200).json({ decryptedData });
//   });
// });
module.exports = router;