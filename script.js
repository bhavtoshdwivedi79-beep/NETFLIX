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
                <img src="${movie.image}" alt="${movie.title}">

                <button class="remove-btn"
                        data-title="${movie.title}">
                    ❌
                </button>
            </div>
        `;
    });

    // HTML banne ke baad events attach karo
    document.querySelectorAll(".remove-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            favorites = favorites.filter(movie =>
                movie.title !== btn.dataset.title
            );

            saveFavorites();

            displayFavorites();

            updateButtons();

        });

    });

}

favButtons.forEach(button => {

    button.addEventListener("click", () => {

        const movieCard = button.closest(".movie-card");

        const movie = {

            title: movieCard.dataset.title,
            image: movieCard.dataset.image

        };

        const index = favorites.findIndex(item =>
            item.title === movie.title
        );

        if (index === -1) {

            favorites.push(movie);

            button.textContent = "✔ Added";
            button.style.background = "green";

        } else {

            favorites.splice(index, 1);

            button.textContent = "❤️ My List";
            button.style.background = "#333";

        }

        saveFavorites();
        displayFavorites();

    });

});

displayFavorites();

function updateButtons() {

    favButtons.forEach(button => {

        const movieCard =
            button.closest(".movie-card");

        const title =
            movieCard.dataset.title;

        const exists =
            favorites.some(movie => movie.title === title);

        if (exists) {

            button.textContent = "✔ Added";
            button.style.background = "green";

        } else {

            button.textContent = "❤️ My List";
            button.style.background = "#333";

        }

    });

}

displayFavorites();
updateButtons();