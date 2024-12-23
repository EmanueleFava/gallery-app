const app = require("./app");
const sequelize = require("./db"); // Configurazione Sequelize

// Connettersi al database e avviare il server
sequelize
	.authenticate()
	.then(() => {
		console.log("Connesso al database!");
		return sequelize.sync({}); // Sincronizza i modelli
	})
	.then(() => {
		app.listen(3000, () => console.log("Server running on port 3000"));
	})
	.catch((err) => console.error("Errore di connessione al database:", err));
