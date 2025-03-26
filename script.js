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
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false, // Disable looping to avoid extra bullets
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

function handleClick() {
    window.location.href = "teachCourse.html"; // Replace with your actual link
}
// Handle category card clicks
document.addEventListener("DOMContentLoaded", function () {
    const categoryCards = document.querySelectorAll(".category-card");

    categoryCards.forEach((card, index) => {
        card.addEventListener("click", function () {
            // Redirect to a specific page based on the category
            if (index === 0) {
                window.location.href = "classXI.html"; // Replace with the actual link for Class XI
            } else if (index === 1) {
                window.location.href = "classXII.html"; // Replace with the actual link for Class XII
            } else {
                console.log("No page assigned for this category.");
            }
        });
    });
});

