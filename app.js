const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db"); // Configurazione Sequelize
const cors = require("cors"); // Middleware per CORS
const authRoutes = require("./backend/routes/authRoutes"); // Importazione delle rotte
const imageRoutes = require("./backend/routes/imageRoutes");
const adminRoutes = require("./backend/routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parsing JSON
app.use(express.json());


// Registrazione delle rotte
app.use("/api/auth", authRoutes); // Rotte di autenticazione
app.use("/api/images", imageRoutes); // Rotte immagini
app.use("/api/admin", adminRoutes); // Rotte admin

// Rotte Front End

// utilizzo cartelle contenuti 
app.use(express.static("frontend"));
app.use(express.static(__dirname + "/frontend"));
app.use("/assets", express.static(__dirname + "/frontend/assets"));


// Imposta la cartella delle viste e il motore di template EJS
app.set("views", "./frontend/views");
app.set("view engine", "ejs");


// rotta rendering pagina front end 
// http://localhost:3000/doughyClicks
app.get("/doughyClicks", (req, res) => {
	res.render("index", { text: "Doughy Clicks!" });
  });

// Middleware di gestione errori
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		message: "Errore interno del server",
		error: err.message,
	});
});

module.exports = app; // Esportazione dell'app
