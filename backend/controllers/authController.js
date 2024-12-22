const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TokenBlacklist = require("../models/TokenBlacklist");
const generateToken = require("./generateToken");

const register = async (req, res) => {

	const { username, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await User.create({
		username,
		email,
		password: hashedPassword,
		ruolo: "utente",
		});
		res.status(201).json(user);
	} catch (error) {
		console.error(error); // Stampa l'errore nel terminale
		res.status(400).json({ error: "User already exists or invalid input" });
	}
};

const registerPremium = async (req, res) => {

	const { username, email, password, ruolo } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await User.create({
		username,
		email,
		password: hashedPassword,
		ruolo: "utente premium",
		});
		res.status(201).json(user);
	} catch (error) {
		console.error(error); // Stampa l'errore nel terminale
		res.status(400).json({ error: "User already exists or invalid input" });
	}
};

const registerAdmin = async (req, res) => {

	const { username, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await User.create({
		username,
		email,
		password: hashedPassword,
		ruolo: "admin",
		});
		res.status(201).json(user);
	} catch (error) {
		console.error(error); // Stampa l'errore nel terminale
		res.status(400).json({ error: "User already exists or invalid input" });
	}
};


const logInUser = async (req, res) => {

	const { username, password } = req.body;
	const user = await User.findOne({ where: { username } });


	if (user && (await bcrypt.compare(password, user.password))) {
		const token = generateToken(user);
		res.json({ user, token });
	} else {
		res.status(401).json({ error: "Invalid credentials" });
	}
};

const logoutUser = async (req, res) => {

	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return res.status(400).send({ error: "No token provided" });
	}

	try {
		// Decodifica il token e ottieni il token ID (jti)
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		// Aggiungi il token ID nella tabella blacklist usando Sequelize
		await TokenBlacklist.create({ token_id: decoded.jti });

		res.status(200).send({ message: "Logged out successfully" });
	} catch (error) {
		res
		.status(401)
		.send({ error: "Failed to logout: Invalid token or expired" });
	}
};


const updateUser = async (req,res) => {

	const id = req.body.id;
	
	try {
		const user = await User.findOne({ where: { id } })
		if ( user.ruolo == "utente"){
			const update = await User.update({
				ruolo: "utente premium"
			}, {
				where: { id : id }
			}
		)
		const updatedUser = await User.findOne({ where: { id } })
		res.status(201).json({messaggio: `utente aggiornato`, updatedUser});

		} else {
			user.ruolo = "utente";
			const update = await User.update({
				ruolo: "utente"
			}, {
				where: { id : id }
			})
		const updatedUser = await User.findOne({ where: { id } })	
		res.status(201).json({messaggio: `utente aggiornato`, updatedUser});
		}
	}
	catch(error) {
		res.status(401).json({ error: "User not found" });
	}
}


module.exports = { register, registerPremium, registerAdmin ,logInUser, logoutUser, updateUser };
