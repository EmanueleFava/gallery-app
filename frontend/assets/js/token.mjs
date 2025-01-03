import { renderHome } from "./auth.mjs";

export function checkTokenValidity() {
	const token = localStorage.getItem("token");
	const tokenCreationTime = localStorage.getItem("tokenCreationTime");

	if (token && tokenCreationTime) {
		const currentTime = Date.now();
		const elapsedTime = currentTime - tokenCreationTime; // Tempo trascorso in millisecondi

		// Controlla se è passato più di 1 ora (3600000 ms)
		if (elapsedTime > 3600000) {
			localStorage.removeItem("token");
			localStorage.removeItem("userLogged");
			localStorage.removeItem("tokenCreationTime");
			alert("Session expired. Please log in again.");
			renderHome(); // Reindirizza l'utente alla pagina di login
		}
	} else {
		// Se il token o il timestamp non esistono, reindirizza al login
		renderHome();
	}
}
