// HOMEPAGE SCRIPT
document.addEventListener("DOMContentLoaded", function () {
    // Load the navbar from navbar.html
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById('navbar');
            if (navbarContainer) {
                navbarContainer.innerHTML = data;

                // Attach hamburger menu toggle logic
                const hamburgerMenu = document.getElementById("hamburger-menu");
                const navbar = document.querySelector("nav ul");

                if (hamburgerMenu && navbar) {
                    hamburgerMenu.addEventListener("click", function () {
                        navbar.classList.toggle("show");
                    });
                } else {
                    console.error("Hamburger menu or navbar not found in the DOM.");
                }

                // Attach search functionality
                const searchForm = document.getElementById('search-form');
                if (searchForm) {
                    searchForm.addEventListener('submit', handleSearch);
                }
            }
        })
        .catch(error => console.error("Error loading navbar:", error));

    // Initialize AOS animations
    AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: true, // Whether animation should happen only once
    });

    // Initialize Swiper for the "Popular Courses" section
    initializeSwiper();

    // Handle category card clicks
    handleCategoryClicks();

    // Handle filters for the course page
    initializeFilters();

    // Handle map link click
    const mapLink = document.querySelector(".c-map-link");
    if (mapLink) {
        mapLink.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Redirecting to Google Maps...");
        });
    }

    // Animate numbers on the stats section
    animateStats();
});

// Function to handle search functionality
function handleSearch(event) {
    event.preventDefault(); // Prevent the form from submitting
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        alert(`You searched for: "${query}"`);
        // Add logic here to filter or display results dynamically if needed
    } else {
        alert("Please enter a search query.");
    }
}


// Function to handle category card clicks
function handleCategoryClicks() {
    const categoryCards = document.querySelectorAll(".hp-category-card");

    categoryCards.forEach((card, index) => {
        card.addEventListener("click", function () {
            // Redirect to a specific page based on the category
            if (index === 0) {
                window.location.href = "classXI.html"; // Redirect to Class XI page
            } else if (index === 1) {
                window.location.href = "classXII.html"; // Redirect to Class XII page
            } else {
                console.log("No page assigned for this category.");
            }
        });
    });
}

// Function to initialize filters
function initializeFilters() {
    const filters = document.querySelectorAll("input[data-filter-type]");
    const resetButton = document.getElementById("resetFilters");
    const courseCards = document.querySelectorAll(".course-card");

    // Function to apply filters
    function applyFilters() {
        let selectedCategories = [];
        let selectedAuthors = [];
        let selectedPrice = [];
        let selectedRating = null;

        // Collect selected filter values
        filters.forEach(filter => {
            if (filter.checked) {
                let filterType = filter.getAttribute("data-filter-type");
                let value = filter.value.trim();

                if (filterType === "category") {
                    selectedCategories.push(value);
                } else if (filterType === "author") {
                    selectedAuthors.push(value);
                } else if (filterType === "price") {
                    selectedPrice.push(value);
                } else if (filterType === "rating") {
                    selectedRating = value; // Radio buttons ensure only one is selected
                }
            }
        });

        // Apply filtering logic
        courseCards.forEach(card => {
            let cardCategory = card.getAttribute("data-category").trim();
            let cardAuthor = card.getAttribute("data-author").trim();
            let cardPrice = card.getAttribute("data-price").trim();
            let cardRating = card.getAttribute("data-rating").trim();

            let categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
            let authorMatch = selectedAuthors.length === 0 || selectedAuthors.includes(cardAuthor);
            let priceMatch = selectedPrice.length === 0 || selectedPrice.includes(cardPrice);
            let ratingMatch = selectedRating === null || cardRating === selectedRating;

            // Show or hide based on matching conditions
            if (categoryMatch && authorMatch && priceMatch && ratingMatch) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Attach event listeners to filters
    filters.forEach(filter => {
        filter.addEventListener("change", applyFilters);
    });

    // Reset filters
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            filters.forEach(filter => (filter.checked = false));
            applyFilters(); // Call filter function to reset display
        });
    }

    applyFilters(); // Apply initial filters (if any selected by default)
}

// Function to animate numbers in the stats section
function animateStats() {
    const stats = [
        { element: document.querySelector(".about-blue h3"), target: 94532 },
        { element: document.querySelector(".about-green h3"), target: 11223 },
        { element: document.querySelector(".about-yellow h3"), target: 25678 },
        { element: document.querySelector(".about-pink h3"), target: 2678 },
    ];

    stats.forEach(stat => {
        animateNumber(stat.element, stat.target, 2000); // 2000ms = 2 seconds
    });
}

// Function to animate numbers
function animateNumber(element, target, duration) {
    let start = 0; // Starting number
    const increment = Math.ceil(target / (duration / 50)); // Increment value
    const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target; // Ensure it doesn't exceed the target
            clearInterval(interval); // Stop the animation
        }
        element.textContent = start; // Update the element's text
    }, 50); // Update every 50ms
}

function initializeSwiper() {
    console.log("Initializing Swiper...");
    var swiper = new Swiper(".hp-mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}
document.addEventListener("DOMContentLoaded", function () {
    initializeSwiper();
});
