const express = require("express");
const {
	register,
	registerPremium,
	registerAdmin,
	logInUser,
	logoutUser,
	updateUser,
	updateUsername,
	updatePassword,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/registerPremium", registerPremium);
router.post("/registerAdmin", registerAdmin);
router.post("/login", logInUser);
router.post("/logout", logoutUser);
router.put("/updateUser/:id", authMiddleware, updateUser);
router.put("/updateUsername/:id", authMiddleware, updateUsername);
router.put("/updatePassword/:id", authMiddleware, updatePassword);

module.exports = router;
