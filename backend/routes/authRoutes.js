const express = require("express");
const {
	register,
	registerPremium,
	registerAdmin,
	logInUser,
	logoutUser,
	updateUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/registerPremium", registerPremium);
router.post("/registerAdmin", registerAdmin);
router.post("/login", logInUser);
router.post("/logout", logoutUser);
router.put("/updateuser", updateUser);

module.exports = router;
