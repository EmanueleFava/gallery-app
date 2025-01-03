import { checkTokenValidity } from "./token.mjs";
import { renderHome, renderSignUp, renderLogIn } from "./auth.mjs";
import { renderGallery, renderPublicGallery } from "./gallery.mjs";
import { loadImages, loadAllImages, createImages, createAllUserImages, insertCarousel, handleCarouselMove } from "./images.mjs";

export function renderEditTitle() {
	const container = document.querySelector(".gallery-container");

	// Creazione del container del form
	const editFormContainer = document.createElement("div");
	editFormContainer.setAttribute("id", "editFormContainer");
	editFormContainer.classList.add("edit-form-container");

	// Creazione del form
	const editForm = document.createElement("form");
	editForm.setAttribute("id", "editForm");

	const label = document.createElement("label");
	label.innerText = `Nuovo titolo`;
	label.setAttribute("for", "newTitle");

	const input = document.createElement("input");
	input.setAttribute("id", "newTitle");
	input.setAttribute("required", "");
	input.setAttribute("placeholder", "Enter title");
	input.setAttribute("type", "text");

	const submitBtn = document.createElement("button");
	submitBtn.classList.add("submit-btn");
	submitBtn.setAttribute("type", "submit");
	submitBtn.innerText = "Save";

	const cancelBtn = document.createElement("button");
	cancelBtn.classList.add("cancel-btn");
	cancelBtn.setAttribute("type", "button");
	cancelBtn.setAttribute("id", "cancelEdit");
	cancelBtn.innerText = "Cancel";

	// Aggiunta degli elementi al form
	editForm.appendChild(label);
	editForm.appendChild(input);
	editForm.appendChild(submitBtn);
	editForm.appendChild(cancelBtn);
	editFormContainer.appendChild(editForm);
	container.appendChild(editFormContainer);

	// Impostazione focus sul campo input
	input.focus();

	// Funzione per gestire il click fuori dalla modale
	const handleClickOutside = (event) => {
		if (!editFormContainer.contains(event.target)) {
			editFormContainer.remove();
			document.removeEventListener("click", handleClickOutside);
		}
	};

	cancelBtn.addEventListener("click", () => {
		editFormContainer.remove();
		document.removeEventListener("click", handleClickOutside);
	});

	// Aggiungi listener per il click fuori dalla modale
	setTimeout(() => {
		document.addEventListener("click", handleClickOutside);
	}, 0);


	return new Promise((resolve) => {
		editForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const newTitle = input.value;
			editFormContainer.remove();
			resolve(newTitle);
		});
	});
}

export function renderDeleteForm() {
	const container = document.querySelector(".gallery-container");

	// Creazione del container del form
	const deleteFormContainer = document.createElement("div");
	deleteFormContainer.setAttribute("id", "deleteFormContainer");
	deleteFormContainer.classList.add("edit-form-container");

	// Creazione del form
	const deleteForm = document.createElement("form");
	deleteForm.setAttribute("id", "deleteForm");

	const label = document.createElement("label");
	label.innerText = `Sei sicuro di voler eliminare questa immagine?`;

	const submitBtn = document.createElement("button");
	submitBtn.classList.add("submit-btn");
	submitBtn.setAttribute("type", "submit");
	submitBtn.innerText = "Conferma";

	const cancelBtn = document.createElement("button");
	cancelBtn.classList.add("cancel-btn");
	cancelBtn.setAttribute("type", "button");
	cancelBtn.innerText = "Annulla";

	// Aggiunta degli elementi al form
	deleteForm.appendChild(label);
	deleteForm.appendChild(submitBtn);
	deleteForm.appendChild(cancelBtn);
	deleteFormContainer.appendChild(deleteForm);
	container.appendChild(deleteFormContainer);

	// Funzione per gestire il click fuori dalla modale
	const handleClickOutside = (event) => {
		if (!deleteFormContainer.contains(event.target)) {
			deleteFormContainer.remove();
			document.removeEventListener("click", handleClickOutside);
		}
	};

	cancelBtn.addEventListener("click", () => {
		deleteFormContainer.remove();
		document.removeEventListener("click", handleClickOutside);
	});

	// Aggiungi listener per il click fuori dalla modale
	setTimeout(() => {
		document.addEventListener("click", handleClickOutside);
	}, 0);

	return new Promise((resolve) => {
		deleteForm.addEventListener("submit", (e) => {
			e.preventDefault();
			deleteFormContainer.remove();
			resolve(true); // Conferma l'eliminazione
		});

		cancelBtn.addEventListener("click", () => {
			deleteFormContainer.remove();
			resolve(false); // Annulla l'eliminazione
		});
	});
}
