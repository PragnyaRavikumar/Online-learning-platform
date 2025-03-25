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













































document.getElementById("resetFilters").addEventListener("click", function () {
    // Select all checkboxes and radio buttons
    let filters = document.querySelectorAll(".filters input[type='checkbox'], .filters input[type='radio']");

    // Uncheck all filters
    filters.forEach(input => input.checked = false);

    // Show all course cards
    document.querySelectorAll(".course-card").forEach(card => {
        card.style.display = "block";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const filters = document.querySelectorAll("input[data-filter-type]");
    const resetButton = document.getElementById("resetFilters");
    const courseCards = document.querySelectorAll(".course-card");

    function applyFilters() {
        let selectedCategories = [];
        let selectedAuthors = [];
        let selectedPrice = [];
        let selectedRating = null;

        filters.forEach(filter => {
            if (filter.checked) {
                let filterType = filter.getAttribute("data-filter-type");
                let value = filter.value;

                if (filterType === "category") {
                    selectedCategories.push(value);
                } else if (filterType === "author") {
                    selectedAuthors.push(value);
                } else if (filterType === "price") {
                    selectedPrice.push(value);
                } else if (filterType === "rating") {
                    selectedRating = value;
                }
            }
        });

        courseCards.forEach(card => {
            let cardCategory = card.getAttribute("data-category");
            let cardAuthor = card.querySelector("p strong").textContent;
            let cardPrice = card.querySelector(".course-info p:nth-of-type(3)").textContent;
            let cardRating = card.getAttribute("data-rating");

            let categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
            let authorMatch = selectedAuthors.length === 0 || selectedAuthors.includes(cardAuthor);
            let priceMatch = selectedPrice.length === 0 || selectedPrice.includes(cardPrice);
            let ratingMatch = selectedRating === null || cardRating === selectedRating;

            if (categoryMatch && authorMatch && priceMatch && ratingMatch) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    filters.forEach(filter => {
        filter.addEventListener("change", applyFilters);
    });

    resetButton.addEventListener("click", function () {
        filters.forEach(filter => (filter.checked = false));
        courseCards.forEach(card => (card.style.display = "block"));
    });
});
