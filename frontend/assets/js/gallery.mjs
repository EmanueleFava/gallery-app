import { checkTokenValidity } from "./token.mjs";
import { renderHome, renderSignUp, renderLogIn } from "./auth.mjs";
import { loadImages, loadAllImages, createImages, createAllUserImages, insertCarousel, handleCarouselMove } from "./images.mjs";

window.handleCarouselMove = handleCarouselMove;

export function renderGallery() {
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
					localStorage.removeItem("tokenCreationTime"); 
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

export function renderPublicGallery() {
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
                    localStorage.removeItem("tokenCreationTime"); 
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
