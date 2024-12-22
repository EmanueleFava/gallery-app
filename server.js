const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db"); // Configurazione Sequelize
const cors = require("cors"); // Middleware per CORS
const authRoutes = require("./backend/routes/authRoutes"); // Importazione delle rotte
const imageRoutes = require("./backend/routes/imageRoutes");
const adminRoutes = require("./backend/routes/adminRoutes");

// Connettersi al database
sequelize
	.authenticate()
	.then(() => console.log("Connesso al database!"))
	.catch((err) => console.error("Errore di connessione al database:", err));

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parsing JSON
app.use(express.json());

// Registrazione delle rotte
app.use("/api/auth", authRoutes); // Rotte di autenticazione
app.use("/api/images", imageRoutes); // Rotte immagini
app.use("/api/admin", adminRoutes); // Rotte admin

// Middleware di gestione errori
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		message: "Errore interno del server",
		error: err.message,
	});
});

// Avvio del server
sequelize.sync({}).then(() => {
	app.listen(3000, () => console.log("Server running on port 3000"));
});
