// HOMEPAGE SCRIPT

// Load the navbar from navbar.html
document.addEventListener("DOMContentLoaded", function () {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            // Attach the search handler after the navbar is loaded
            const searchForm = document.getElementById('search-form');
            if (searchForm) {
                searchForm.addEventListener('submit', handleSearch);
            }
        })
        .catch(error => console.error("Error loading navbar:", error));
});

// Handle the search functionality
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

// Handle the "Get Started" button for instructors
function handleClick() {
    window.location.href = "teachCourse.html"; // Redirect to the "Teach a Course" page
}

// Handle category card clicks
document.addEventListener("DOMContentLoaded", function () {
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
});

// Initialize filters for the course cards
document.addEventListener("DOMContentLoaded", function () {
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
});

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
// Handle hp-clickable-lines clicks to change paragraph content and refresh the page
document.addEventListener("DOMContentLoaded", function () {
    const clickableLines = document.querySelectorAll(".hp-line");
    const paragraph = document.querySelector(".hp-start-paragraph");

    // Define the content for each line
    const contentMap = [
        "Discover your potential and take the first step toward success.",
        "Explore innovative ideas and bring them to life.",
        "Challenge the norm and embrace new perspectives.",
        "Reach new heights and achieve your dreams."
    ];

    // Check if a line index is stored in localStorage
    const storedIndex = localStorage.getItem("selectedLineIndex");
    if (storedIndex !== null) {
        // Update the paragraph content based on the stored index
        paragraph.innerHTML = `<strong>${contentMap[storedIndex]}</strong>`;
        // Clear the stored index after updating the content
        localStorage.removeItem("selectedLineIndex");
    }

    // Add click event listeners to each line
    clickableLines.forEach((line, index) => {
        line.addEventListener("click", function () {
            // Store the clicked line's index in localStorage
            localStorage.setItem("selectedLineIndex", index);
            // Refresh the page
            location.reload();
        });
    });
});
  window.addEventListener("DOMContentLoaded", () => {
    const bgVideo = document.querySelector(".hp-bg-video");
    if (bgVideo) {
      bgVideo.playbackRate = 1.2; // Half the normal speed (1 is default)
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    // Handle Signup Form Submission
    const signupForm = document.querySelector(".auth-form");
    if (signupForm && window.location.pathname.includes("signup.html")) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();

            // Validate form inputs
            if (!name || !email || !password || !confirmPassword) {
                alert("All fields are required.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify({ name, email, password }));
            alert("Signup successful! You can now log in.");
            window.location.href = "login.html"; // Redirect to login page
        });
    }

    // Handle Login Form Submission
    const loginForm = document.querySelector(".auth-form");
    if (loginForm && window.location.pathname.includes("login.html")) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Validate form inputs
            if (!email || !password) {
                alert("Both email and password are required.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Retrieve user data from localStorage
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to homepage
            } else {
                alert("Invalid email or password.");
            }
        });
    }
});

// Utility function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
