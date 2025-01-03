import { checkTokenValidity } from "./token.mjs";
import { renderHome, renderLogIn, renderSignUp } from "./auth.mjs";
import { renderGallery, renderPublicGallery } from "./gallery.mjs";
import { loadImages, loadAllImages, createImages, createAllUserImages, insertCarousel, handleCarouselMove } from "./images.mjs";


document.addEventListener("DOMContentLoaded", () => {
	const userLogged = JSON.parse(localStorage.getItem("userLogged"));
	checkTokenValidity();

	setInterval(checkTokenValidity, 60000); // 1 minuto
	if (!userLogged) {
		renderHome();
	} else {
		renderGallery();
	}
});

