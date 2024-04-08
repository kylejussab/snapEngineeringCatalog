searchGames = () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchResults = gamesData.filter(game => {
        return Object.values(game).some(value => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchInput);
            } else if (Array.isArray(value)) {
                return value.some(item => item.toLowerCase().includes(searchInput));
            } else if (typeof value === 'number') {
                return value.toString().includes(searchInput);
            }
            return false;
        });
    });

    displayFilteredGames(searchResults);
    updateBackgroundImages(searchResults);
}

clearSearch = () => {
    document.getElementById('search-input').value = '';
    searchGames();

    //Code to reset filters
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    document.getElementById('minPrice').value = 0;
    document.getElementById('maxPrice').value = 100;

    // Close all expanded fieldsets
    document.querySelectorAll('.collapsible').forEach(collapsible => {
        collapsible.classList.remove('active');
        collapsible.querySelector('div').style.display = 'none'; // Hide content
    });

    // Show arrow-down icons
    document.querySelectorAll('.collapsible #publisher-arrow-down, .collapsible #platform-arrow-down, .collapsible #rating-arrow-down, .collapsible #price-arrow-down').forEach(arrow => {
        arrow.style.display = 'inline-block';
    });

    // Hide arrow-up icons
    document.querySelectorAll('.collapsible #publisher-arrow-up, .collapsible #platform-arrow-up, .collapsible #rating-arrow-up, .collapsible #price-arrow-up').forEach(arrow => {
        arrow.style.display = 'none';
    });

    // For price as it works a little different
    document.querySelectorAll('.price-input-container').forEach(element => {
        element.classList.remove('active');
        element.style.display = 'none'; // Hide content
    });

    applyFilters();
}

document.getElementById('searchButton').addEventListener('click', searchGames);
document.getElementById('clearButton').addEventListener('click', clearSearch);

document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === 'Return') {
        searchGames();
    }
});