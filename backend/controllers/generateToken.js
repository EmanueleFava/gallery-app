const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
dotenv.config();

const generateToken = (user) => {
	const token = jwt.sign(
		{ userId: user.id, username: user.username, ruolo: user.ruolo },
		process.env.SECRET_KEY,
		{ expiresIn: "1h", jwtid: uuidv4() },
	);
	return token;
};

module.exports = generateToken;
