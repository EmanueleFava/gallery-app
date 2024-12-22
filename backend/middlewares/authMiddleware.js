const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/TokenBlacklist"); // Importa il modello TokenBlacklist

const authMiddleware = async (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		return res.status(401).send({ error: "Access Denied" });
	}

	try {
		// Verifica il token
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		// Controlla se il token è stato revocato (blacklist)
		const blacklistToken = await TokenBlacklist.findOne({
			where: { token_id: decoded.jti },
		});

		if (blacklistToken) {
			return res
				.status(401)
				.send({ error: "Token has been invalidated" });
		}

		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).send({ error: "Invalid or expired token", error });
	}
};

module.exports = authMiddleware;
