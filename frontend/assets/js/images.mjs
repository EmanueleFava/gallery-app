import { checkTokenValidity } from "./token.mjs";
import { renderHome, renderSignUp, renderLogIn } from "./auth.mjs";
import { renderGallery, renderPublicGallery } from "./gallery.mjs";
import { renderEditTitle, renderDeleteForm } from "./modals.mjs";


export async function loadImages(userId, token) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/images/${userId}/gallery`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		if (response.ok) {
			const data = await response.json();
			console.log("Images loaded!");
			console.log(data);

			data.forEach((image) => {
				createImages(image.id, image.title, image.url, image.createdAt);
				insertCarousel(
					image.id,
					image.title,
					image.url,
					image.createdAt,
				);
			});
		} else {
			const errorData = await response.json();
			alert(`Error: ${errorData.error}`);
		}
	} catch (err) {
		alert(`An unexpected error occurred: ${err.message}`);
	}
}

export async function loadAllImages(userId, token) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/images/${userId}/publicGallery`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		if (response.ok) {
			const data = await response.json();
			console.log("Images loaded!");
			console.log(data);

			data.forEach((image) => {
				createAllUserImages(
					image.id,
					image.title,
					image.url,
					image.createdAt,
				);
				insertCarousel(
					image.id,
					image.title,
					image.url,
					image.createdAt,
				);
			});
		} else {
			const errorData = await response.json();
			alert(`Error: ${errorData.error}`);
		}
	} catch (err) {
		alert(`An unexpected error occurred: ${err.message}`);
	}
}

export function createImages(id, title, url, createdAt) {
	const container = document.querySelector(".cards-container");

	// Crea la card
	const card = document.createElement("article");
	card.classList.add("card");

	// Immagine
	const img = document.createElement("img");
	img.src = url;
	img.classList.add("card-image");
	card.appendChild(img);

	// Contenuto della card
	const cardContent = document.createElement("div");
	cardContent.classList.add("card-content");

	const h2 = document.createElement("h2");
	h2.classList.add("card-heading");
	h2.innerText = title;

	const p = document.createElement("p");
	p.classList.add("card-description");
	p.innerHTML = `
		<strong>Id:</strong> ${id}<br>
		<strong>Data di creazione:</strong> <br> ${createdAt}
	`;

	cardContent.appendChild(h2);
	cardContent.appendChild(p);
	card.appendChild(cardContent);

	// Gruppo pulsanti
	const buttonGroup = document.createElement("div");
	buttonGroup.classList.add("button-group");

	const btnChangeTitle = document.createElement("button");
	btnChangeTitle.classList.add("primary-btn");
	btnChangeTitle.innerText = "Edit Title";

	const btnDeleteImage = document.createElement("button");
	btnDeleteImage.classList.add("delete-btn");
	btnDeleteImage.innerText = "Delete Image";

	buttonGroup.appendChild(btnChangeTitle);
	buttonGroup.appendChild(btnDeleteImage);
	cardContent.appendChild(buttonGroup);

	// Aggiungi la card al container
	container.appendChild(card);

	// Event listener per "Edit Title"
	btnChangeTitle.addEventListener("click", async (e) => {
		e.preventDefault();
		// const newTitle = prompt("Inserisci il nuovo titolo:");
		const newTitleModal = await renderEditTitle();
		if (newTitleModal) {
			h2.innerText = newTitleModal;

			try {
				const token = localStorage.getItem("token");
				const user = JSON.parse(localStorage.getItem("userLogged"));
				const username = user.username;
				const userId = user.id;
				const response = await fetch(
					`http://localhost:3000/api/images/${userId}/updateImage/${id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ title: newTitleModal }),
					},
				);
				if (response.ok) {
					const responseData = await response.json();
					alert("Image updated!!");
				} else {
					const errorData = await response.json();
					alert(`Error: ${errorData.error}`);
				}
			} catch (err) {
				alert(`An unexpected error occurred: ${err.message}`);
			}
		}
	});

	// Event listener per "Delete Image"
	btnDeleteImage.addEventListener("click", async (e) => {
		e.preventDefault();
		// const confirmDelete = confirm(
		// 	"Sei sicuro di voler eliminare questa immagine?",
		// );

		const confirmDelete = await renderDeleteForm();
		if (confirmDelete) {
			try {
				const token = localStorage.getItem("token");
				const user = JSON.parse(localStorage.getItem("userLogged"));
				const username = user.username;
				const userId = user.id;
				const response = await fetch(
					`http://localhost:3000/api/images/${userId}/deleteImage/${id}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					},
				);
				if (response.ok) {
					const responseData = await response.json();
					const photoCountElement =
						document.querySelector(".photo-count");
					let currentCount = parseInt(
						photoCountElement.innerText,
						10,
					);
					currentCount -= 1; // Decrementa il conteggio delle foto
					photoCountElement.innerText = currentCount;
					alert("Image Deleted!!");
					user.photo_count = currentCount;
					localStorage.setItem("userLogged", JSON.stringify(user));
					renderGallery();
				} else {
					const errorData = await response.json();
					alert(`Error: ${errorData.error}`);
				}
			} catch (err) {
				alert(`An unexpected error occurred: ${err.message}`);
			}
			container.removeChild(card);
		}
	});
}

export function createAllUserImages(id, title, url, createdAt) {
	const container = document.querySelector(".cards-container");

	// Crea la card
	const card = document.createElement("article");
	card.classList.add("card");

	// Immagine
	const img = document.createElement("img");
	img.src = url;
	img.classList.add("card-image");
	card.appendChild(img);

	// Contenuto della card
	const cardContent = document.createElement("div");
	cardContent.classList.add("card-content");

	const h2 = document.createElement("h2");
	h2.classList.add("card-heading");
	h2.innerText = title;

	const p = document.createElement("p");
	p.classList.add("card-description");
	p.innerHTML = `
		<strong>Id:</strong> ${id}<br>
		<strong>Data di creazione:</strong> <br> ${createdAt}
	`;

	cardContent.appendChild(h2);
	cardContent.appendChild(p);
	card.appendChild(cardContent);

	// Aggiungi la card al container
	container.appendChild(card);
}

export function insertCarousel(id, title, url, createdAt) {
	const containerCarousel = document.querySelector(".carousel-container");
	const slide = document.createElement("div");
	slide.classList.add("carousel-slide");
	const img = document.createElement("img");
	img.src = url;
	slide.appendChild(img);
	const overlay = document.createElement("div");
	overlay.classList.add("overlay");
	overlay.innerHTML = `<p><strong>Titolo</strong>: ${title} <br> <strong>creata</strong>: <br> ${createdAt}</p>`;
	slide.appendChild(overlay);
	containerCarousel.appendChild(slide);
}

export function handleCarouselMove(positive = true) {
	const carousel = document.querySelector(".carousel-container");
	const slide = document.querySelector(".carousel-slide");
	const slideWidth = slide.clientWidth;
	carousel.scrollLeft = positive
		? carousel.scrollLeft + slideWidth
		: carousel.scrollLeft - slideWidth;
}

