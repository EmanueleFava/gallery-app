

// ---------------------------------------------------------------------------------------------------
// gestione sessione token expired
// ---------------------------------------------------------------------------------------------------


function checkTokenValidity() {
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


// ---------------------------------------------------------------------------------------------------
// evento di caricamento pagine
// ---------------------------------------------------------------------------------------------------


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


// ---------------------------------------------------------------------------------------------------
// gestione rendering pagine
// ---------------------------------------------------------------------------------------------------


function renderHome() {
	const userLogged = JSON.parse(localStorage.getItem("userLogged"));

	let navbar = `<nav><header class="header">
	<nav class="navbar" id="doughyNav">
		<div class="logo">
		<img src="./assets/images/logo.png" alt="doughyClicks" id="home"/>
		</div>
		<div class="buttons">
		<button class="signUpBtn">Sign up</button>
		<button class="logInBtn">Log in</button></div>
	</nav>
	</header></nav>`;

	let footer = ` <footer class="footer">
	<div class="footer-content">
		<div class="footer-logo">
			<img src="./assets/images/logo.png" alt="Logo DoughyClicks">
		</div>
		<div class="footer-buttons">
			<button class="signUpBtn">Sign Up</button>
			<button class="logInBtn">Log In</button>
		</div>
	</div>
	</footer>`;

	if (userLogged) {
		navbar = `<nav><header class="header">
		<nav class="navbar" id="doughyNav">
			<div class="logo">
			<img src="./assets/images/logo.png" alt="doughyClicks" id="home"/>
			</div>
			<div class="buttons">
			<button class="galleryBtn">Gallery</button>
			<button class="publicGalleryBtn">Public Gallery</button>
			<button class="logOutBtn">Log out</button></div>
		</nav>
		</header></nav>`;

		footer = ` <footer class="footer">
		<div class="footer-content">
			<div class="footer-logo">
				<img src="./assets/images/logo.png" alt="Logo DoughyClicks">
			</div>
			<div class="footer-buttons">
				<button class="galleryBtn">Gallery</button>
				<button class="publicGalleryBtn">Public Gallery</button>
				<button class="logOutBtn">Log out</button>
			</div>
		</div>
		</footer>`;
	}

	const container = `<div class="container">
        <div class="content">
          <div class="logoText">
            <img src="./assets/images/DoughyClicks.png" alt="Logo">
          </div>
          <h1>Condividi i tuoi <br> momenti più dolci</h1>
          <p>
            <strong>Carica</strong> le tue foto, <strong>esplora</strong> gallerie mozzafiato e <strong>connettiti</strong><br>
            con una community di menti <strong>creative</strong>.
            <br>
            <br>
            <strong>Ogni immagine ha una storia da raccontare.</strong><br>
            Con Doughy Clicks valorizza <strong>ogni momento</strong> catturato e <br><strong>condividilo</strong> con gli altri!
          </p>
          <button class="signUpBtn">Registrati!</button>
        </div>
        <div class="image">
            <div class="white-cover"></div>
			<iframe src='https://my.spline.design/untitled-5f0ee2c9aeb47af0fa62e42a237aa1f8/' frameborder='0' width='100%' height='100%'></iframe>
      	</div>     
        </div>
        <div class="containerBody">
            <div class="image-container">
              <img src="./assets/images/pic.png" alt="Immagine" />
            </div>
            <div class="text-container">
              <h1>Unisciti alla Rivoluzione</h1>
              <h2>DOUGHY</h2>
              <p>Crea. Condividi. Ispira.</p>
              <p class="description">
                Unisciti a <strong>migliaia</strong> di appassionati di fotografia <br>e <strong>guarda</strong> il mondo attraverso una <strong>lente</strong> nuova, <strong>dolce</strong> e <strong>creativa</strong>.<br>
                <br>
                <strong>Utenti Standard</strong>: fino a <strong>3</strong> scatti nella tua gallery personale.<br>
                <strong>Utenti Premium</strong>: fino a <strong>10</strong> scatti nella tua gallery personale.
              </p>
            </div>
    </div>`;

	const body = document.querySelector("body");
	body.innerHTML = `${navbar}${container}${footer}`;

	const galleryBtn = document.querySelectorAll(".galleryBtn");
	galleryBtn.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			renderGallery();
		});
	});

	const publicGalleryBtn = document.querySelectorAll(".publicGalleryBtn");
	publicGalleryBtn.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			renderPublicGallery();
		});
	});

	const logOutBtn = document.querySelectorAll(".logOutBtn");
	logOutBtn.forEach((button) => {
		button.addEventListener("click", async (e) => {
			e.preventDefault();
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					"http://localhost:3000/api/auth/logout",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					},
				);

				if (response.ok) {
					alert("Logout successful!");
					localStorage.removeItem("token"); // Rimuove il token
					localStorage.removeItem("userLogged"); // Rimuove i dati utente
					renderHome();
				} else {
					const errorData = await response.json();
					alert(`Error: ${errorData.error}`);
				}
			} catch (err) {
				alert(`An unexpected error occurred: ${err.message}`);
			}
		});
	});

	const buttonSignUp = document.querySelectorAll(".signUpBtn");
	buttonSignUp.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			renderSignUp();
		});
	});

	const buttonLogIn = document.querySelectorAll(".logInBtn");
	buttonLogIn.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			renderLogIn();
		});
	});
}

function renderSignUp() {
	const body = document.querySelector("body");
	const navbar = `<nav><header class="header">
	<nav class="navbar" id="doughyNav">
		<div class="logo">
		<img src="./assets/images/logo.png" alt="doughyClicks" id="home"/>
		</div>
		<div class="buttons">
		<button class="signUpBtn">Sign up</button>
		<button class="logInBtn">Log in</button></div>
	</nav>
	</header></nav>`;

	const container = ` <div class="container-logIn"> 
        <div class="signup-card">
            <img src="./assets/images/logoBig.png" alt="Logo" class="logo">
            <h2>Sign up!</h2>
            <form id="sign-up-form">
                <label for="username">Username</label>
                <input type="username" id="username" name="username" placeholder="Enter your username" required>

                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
                
                
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>

                <label for="role">Role</label>
                <select id="role" name="role" required>
                    <option value="utente">utente</option>
                    <option value="utente premium">utente premium</option>
                    <option value="admin">admin</option>
                </select>

                <button type="submit" class="register-button">Register</button>
            </form>
        </div>    
    </div>`;

	const footer = ` <footer class="footer">
	<div class="footer-content">
		<div class="footer-logo">
			<img src="./assets/images/logo.png" alt="Logo DoughyClicks" id="footerLogo">
		</div>
		<div class="footer-buttons">
			<button class="signUpBtn">Sign Up</button>
			<button class="logInBtn">Log In</button>
		</div>
	</div>
	</footer>`;

	body.innerHTML = ` ${navbar}${container}${footer}`;

	const formSignUp = document.getElementById("sign-up-form");
	formSignUp.addEventListener("submit", async (e) => {
		e.preventDefault();
		const username = document.getElementById("username").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const ruolo = document.getElementById("role").value;

		try {
			const response = await fetch(
				"http://localhost:3000/api/auth/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, email, password, ruolo }),
				},
			);

			if (response.ok) {
				alert("Registration successful!");
				renderLogIn();
			} else {
				const errorData = await response.json();
				alert(`Error: ${errorData.error}`);
			}
		} catch (err) {
			alert(`An unexpected error occurred: ${err.message}`);
		}
	});

	const buttonLogIn = document.querySelectorAll(".logInBtn");
	buttonLogIn.forEach((button) => {
		button.addEventListener("click", () => {
			renderLogIn();
		});
	});

	const home = document.getElementById("home");
	home.addEventListener("click", () => {
		renderHome();
	});

	const footerHome = document.getElementById("footerLogo");
	footerHome.addEventListener("click", () => {
		renderHome();
	});
}

function renderLogIn() {
	const body = document.querySelector("body");
	const navbar = `<nav><header class="header">
	<nav class="navbar" id="doughyNav">
		<div class="logo">
		<img src="./assets/images/logo.png" alt="doughyClicks" id="home"/>
		</div>
		<div class="buttons">
		<button class="signUpBtn">Sign up</button>
		<button class="logInBtn">Log in</button></div>
	</nav>
	</header></nav>`;

	const container = ` <div class="container-logIn"> 
        <div class="login-card">
            <img src="./assets/images/logoBig.png" alt="Logo" class="logo">
            <h2>Login</h2>
            <form id="log-in-form">
                <label for="username">Username</label>
                <input type="username" id="username" name="username" placeholder="Enter your username" required>
                
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
                
                <button type="submit" class="login-button">Log in</button>
            </form>
        </div>    
    </div>`;

	const footer = ` <footer class="footer">
	<div class="footer-content">
		<div class="footer-logo">
			<img src="./assets/images/logo.png" alt="Logo DoughyClicks" id="footerLogo">
		</div>
		<div class="footer-buttons">
			<button class="signUpBtn">Sign Up</button>
			<button class="logInBtn">Log In</button>
		</div>
	</div>
	</footer>`;

	body.innerHTML = `${navbar}${container}${footer}`;

	const logInForm = document.getElementById("log-in-form");
	logInForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		try {
			const response = await fetch(
				"http://localhost:3000/api/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, password }),
				},
			);
			if (response.ok) {
				const data = await response.json();
				alert("Login successful!");
				localStorage.setItem("userLogged", JSON.stringify(data.user));
				localStorage.setItem("token", data.token);
				localStorage.setItem("tokenCreationTime", Date.now()); // Salva il timestamp
				renderGallery();
			} else {
				const errorData = await response.json();
				alert(`Error: ${errorData.error}`);
			}
		} catch (err) {
			alert(`An unexpected error occurred: ${err.message}`);
		}
	});

	const buttonSignUp = document.querySelectorAll(".signUpBtn");
	buttonSignUp.forEach((button) => {
		button.addEventListener("click", () => {
			renderSignUp();
		});
	});

	const home = document.getElementById("home");
	home.addEventListener("click", () => {
		renderHome();
	});

	const footerHome = document.getElementById("footerLogo");
	footerHome.addEventListener("click", () => {
		renderHome();
	});
}

function renderGallery() {
	const user = JSON.parse(localStorage.getItem("userLogged"));
	const username = user.username;
	const userCount = user.photo_count;
	const ruolo = user.ruolo;
	const id = user.id;
	const token = localStorage.getItem("token");
	checkTokenValidity();

	document.addEventListener("DOMContentLoaded", loadImages(id, token));

	const body = document.querySelector("body");
	const navbar = `<nav><header class="header">
	<nav class="navbar" id="doughyNav">
		<div class="logo">
		<img src="./assets/images/logo.png" alt="doughyClicks" id="home"/>
		</div>
		<div class="buttons">
		<button class="publicGalleryBtn">Public Gallery</button>
		<button class="logOutBtn">Log out</button></div>
	</nav>
	</header></nav>`;

	const container = `<div class="gallery-container">
        <div class="header-section">
          <h1 class="section-title">${username}</h1>
          <div class="user-type">
			<span class="premium-text">${ruolo}</span>
          </div>
          <div class="photo-count">${userCount}</div>
          <div class="photo-text">Photos</div>
        </div>

        <button id="addPhotoBtn" class="add-photo-btn">Add Photo</button>

        <!-- Photo Form (initially hidden) -->
        <div id="photoForm" class="photo-form-container">
        <form id="addPhotoForm">
            <label for="imageUrl">Image URL:</label>
            <input type="url" id="imageUrl" name="imageUrl" required placeholder="Enter image URL">
            
            <label for="imageTitle">Image Title:</label>
            <input type="text" id="imageTitle" name="imageTitle" required placeholder="Enter image title">
            
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" id="cancelBtn" class="cancel-btn">Cancel</button>
        </form>
    </div>
	<div class="carousel"><button class="carousel-arrow carousel-arrow--prev" onclick="handleCarouselMove(false)">
    &#8249;
	</button>
	<button class="carousel-arrow carousel-arrow--next" onclick="handleCarouselMove()">
    &#8250;
	</button>
  
  	<div class="carousel-container" dir="ltr">
  	</div></div>

	<img src="./assets/images/donuts.png" alt="donutsLogo" class="donut"/>


	<div class="cards-container">
	</div>`;

	const footer = ` <footer class="footer">
	<div class="footer-content">
		<div class="footer-logo">
			<img src="./assets/images/logo.png" alt="Logo DoughyClicks" id="footerLogo">
		</div>
		<div class="footer-buttons">
			<button class="publicGalleryBtn">Public Gallery</button>
			<button class="logOutBtn">Log out</button></div>
		</div>
	</div>
	</footer>`;

	body.innerHTML = ` ${navbar}${container}${footer}`;

	const addPhotoBtn = document.getElementById("addPhotoBtn");
	const photoForm = document.getElementById("photoForm");
	const cancelBtn = document.getElementById("cancelBtn");

	const handleClickOutside = (event) => {
		if (!photoForm.contains(event.target) && event.target !== addPhotoBtn) {
			photoForm.style.display = "none";
			document.removeEventListener("click", handleClickOutside); // Rimuovi il listener
		}
	};

	addPhotoBtn.addEventListener("click", () => {
		photoForm.style.display = "block";
		setTimeout(() => {
			document.addEventListener("click", handleClickOutside);
		}, 0);
	});

	cancelBtn.addEventListener("click", () => {
		photoForm.style.display = "none";
		document.removeEventListener("click", handleClickOutside); // Rimuovi il listener
	});

	document
		.getElementById("addPhotoForm")
		.addEventListener("submit", async (e) => {
			e.preventDefault();

			const imageUrl = document.getElementById("imageUrl").value;
			const imageTitle = document.getElementById("imageTitle").value;

			try {
				const response = await fetch(
					`http://localhost:3000/api/images/${id}/create`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							title: imageTitle,
							url: imageUrl,
						}),
					},
				);

				if (response.ok) {
					alert("Image added!");
					const photoCountElement =
						document.querySelector(".photo-count");
					let currentCount = parseInt(
						photoCountElement.innerText,
						10,
					);
					currentCount += 1; // Decrementa il conteggio delle foto
					photoCountElement.innerText = currentCount;
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

			photoForm.style.display = "none";
		});

	const home = document.getElementById("home");
	home.addEventListener("click", () => {
		renderHome();
	});

	const footerHome = document.getElementById("footerLogo");
	footerHome.addEventListener("click", () => {
		renderHome();
	});

	const publicGalleryBtn = document.querySelectorAll(".publicGalleryBtn");
	publicGalleryBtn.forEach((button) => {
		button.addEventListener("click", () => {
			renderPublicGallery();
		});
	});

	const logOutBtn = document.querySelectorAll(".logOutBtn");
	logOutBtn.forEach((button) => {
		button.addEventListener("click", async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					"http://localhost:3000/api/auth/logout",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					},
				);

				if (response.ok) {
					alert("Logout successful!");
					localStorage.removeItem("token");
					localStorage.removeItem("userLogged");
					renderHome();
				} else {
					const errorData = await response.json();
					alert(`Error: ${errorData.error}`);
				}
			} catch (err) {
				alert(`An unexpected error occurred: ${err.message}`);
			}
		});
	});
}

function renderPublicGallery() {
	const user = JSON.parse(localStorage.getItem("userLogged"));
	const username = user.username;
	const userCount = user.photo_count;
	const ruolo = user.ruolo;
	const id = user.id;
	const token = localStorage.getItem("token");
	checkTokenValidity();
	document.addEventListener("DOMContentLoaded", loadAllImages(id, token));

	const body = document.querySelector("body");
	const navbar = `<nav><header class="header">
	<nav class="navbar" id="doughyNav">
		<div class="logo">
		<img src="./assets/images/logo.png" alt="doughyClicks" id="home"/>
		</div>
		<div class="buttons">
		<button class="galleryBtn">Gallery</button>
		<button class="logOutBtn">Log out</button></div>
	</nav>
	</header></nav>`;

	const container = `<div class="gallery-container">
        <div class="header-section">
          <h1 class="section-title">Public Gallery</h1>
          <div class="photo-text">Photos</div>
        </div>
	<div class="carousel"><button class="carousel-arrow-public carousel-arrow--prev" onclick="handleCarouselMove(false)">
    &#8249;
	</button>
	<button class="carousel-arrow-public carousel-arrow--next" onclick="handleCarouselMove()">
    &#8250;
	</button>
  
  	<div class="carousel-container" dir="ltr">
  	</div></div>

	<img src="./assets/images/donuts.png" alt="donutsLogo" class="donut"/>


	<div class="cards-container">
	</div>`;

	const footer = ` <footer class="footer">
	<div class="footer-content">
		<div class="footer-logo">
			<img src="./assets/images/logo.png" alt="Logo DoughyClicks" id="footerLogo">
		</div>
		<div class="footer-buttons">
			<button class="galleryBtn">Gallery</button>
			<button class="logOutBtn">Log out</button></div>
		</div>
	</div>
	</footer>`;

	body.innerHTML = ` ${navbar}${container}${footer}`;

	const home = document.getElementById("home");
	home.addEventListener("click", () => {
		renderHome();
	});

	const footerHome = document.getElementById("footerLogo");
	footerHome.addEventListener("click", () => {
		renderHome();
	});

	const logOutBtn = document.querySelectorAll(".logOutBtn");
	logOutBtn.forEach((button) => {
		button.addEventListener("click", async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					"http://localhost:3000/api/auth/logout",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					},
				);

				if (response.ok) {
					alert("Logout successful!");
					localStorage.removeItem("token");
					localStorage.removeItem("userLogged");
					renderHome();
				} else {
					const errorData = await response.json();
					alert(`Error: ${errorData.error}`);
				}
			} catch (err) {
				alert(`An unexpected error occurred: ${err.message}`);
			}
		});
	});

	const galleryBtn = document.querySelectorAll(".galleryBtn");
	galleryBtn.forEach((button) => {
		button.addEventListener("click", () => {
			renderGallery();
		});
	});
}



// ---------------------------------------------------------------------------------------------------
// modals
// ---------------------------------------------------------------------------------------------------


function renderEditTitle() {
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

function renderDeleteForm() {
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


// ---------------------------------------------------------------------------------------------------
// handling caricamento, creazione di immagini e carosello
// ---------------------------------------------------------------------------------------------------


async function loadImages(userId, token) {
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

async function loadAllImages(userId, token) {
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

function createImages(id, title, url, createdAt) {
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

function createAllUserImages(id, title, url, createdAt) {
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

function insertCarousel(id, title, url, createdAt) {
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

function handleCarouselMove(positive = true) {
	const carousel = document.querySelector(".carousel-container");
	const slide = document.querySelector(".carousel-slide");
	const slideWidth = slide.clientWidth;
	carousel.scrollLeft = positive
		? carousel.scrollLeft + slideWidth
		: carousel.scrollLeft - slideWidth;
}
