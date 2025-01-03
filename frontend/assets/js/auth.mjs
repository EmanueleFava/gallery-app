import { checkTokenValidity } from "./token.mjs";
import { renderGallery, renderPublicGallery } from "./gallery.mjs";


export function renderHome() {
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
					localStorage.removeItem("tokenCreationTime"); // Rimuove il tempo di creazione del token
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

export function renderSignUp() {
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

export function renderLogIn() {
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
