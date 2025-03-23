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