const express = require("express");
const {
	register,
	registerPremium,
	registerAdmin,
	logInUser,
	logoutUser,
	updateUser,
	updateUsername,
	updatePassword
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/registerPremium", registerPremium);
router.post("/registerAdmin", registerAdmin);
router.post("/login", logInUser);
router.post("/logout", logoutUser);
router.put("/updateuser/:id", authMiddleware, updateUser);
router.put("/updateusername/:id", authMiddleware, updateUsername);
router.put("/updatepassword/:id", authMiddleware, updatePassword);


module.exports = router;
