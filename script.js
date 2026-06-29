const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        item.classList.toggle("active");

    });

});

// searchbar 
const searchInput =
    document.getElementById("searchInput");

const movieCards =
    document.querySelectorAll(".movie-card");

searchInput.addEventListener("keyup", () => {

    const value =
        searchInput.value.toLowerCase();

    movieCards.forEach(card => {

        const title =
            card.dataset.title.toLowerCase();

        if (title.includes(value)) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }

    });

});

// themetoggle
const themeToggle =
    document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {
        themeToggle.innerHTML = "☀️";
    }
    else {
        themeToggle.innerHTML = "🌙";
    }

});

// hamburger menu
const hamburger =
    document.getElementById("hamburger");

const navMenu =
    document.getElementById("navMenu");

hamburger.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});

// movie modal
const modalCards =
    document.querySelectorAll(".movie-card");

const modal =
    document.getElementById("movieModal");

const movieTitle =
    document.getElementById("movieTitle");

const movieDescription =
    document.getElementById("movieDescription");

const closeBtn =
    document.querySelector(".close-btn");

const modalImage =
    document.getElementById("modalImage");

modalCards.forEach(card => {

    card.addEventListener("click", () => {

        movieTitle.textContent =
            card.dataset.title;

        movieDescription.textContent =
            card.dataset.description;

        modalImage.src =
            card.dataset.image;

        modal.style.display = "flex";

    });

});

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

// my list
const favButtons =
    document.querySelectorAll(".fav-btn");

const myListContainer =
    document.getElementById("myListContainer");

let favorites =
    JSON.parse(
        localStorage.getItem("favorites")
    ) || [];

function saveFavorites() {

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

}

function displayFavorites() {

    myListContainer.innerHTML = "";

    favorites.forEach(movie => {

        myListContainer.innerHTML += `

        <div class="favorite-card">

            <img src="${movie.image}">

        </div>

        `;

    });

}

favButtons.forEach(button => {

    button.addEventListener("click", () => {

        const movieCard =
            button.closest(".movie-card");

        const movie = {

            title:
                movieCard.dataset.title,

            image:
                movieCard.dataset.image

        };

        const exists =
            favorites.some(
                item => item.title === movie.title
            );

        if (!exists) {

            favorites.push(movie);

            saveFavorites();

            displayFavorites();

        }

    });

});

displayFavorites();