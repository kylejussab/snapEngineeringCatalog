sortGames = (games, titleSortOrder, priceSortOrder, ratingSortOrder) => {
    let sortedGames = [...games];

    if (titleSortOrder !== 'none') {
        sortedGames = sortedGames.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
        
            if (titleSortOrder === 'asc') {
                return titleA.localeCompare(titleB);
            } else {
                return titleB.localeCompare(titleA);
            }
        });
    }

    if(priceSortOrder !== 'none') {
        sortedGames = sortedGames.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));

            if (priceSortOrder === 'asc') {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        });
    }

    if(ratingSortOrder !== 'none') {
        sortedGames = sortedGames.sort((a, b) => {
            const ratingA = parseFloat(a.rating.match(/\d+/)[0]);
            const ratingB = parseFloat(b.rating.match(/\d+/)[0]);

            if (ratingSortOrder === 'asc') {
                return ratingA - ratingB;
            } else {
                return ratingB - ratingA;
            }
        });
    }

    return sortedGames;
}

// Only have 1 sort selected at a time
document.getElementById('priceSort').addEventListener('change', function() {
    document.getElementById('titleSort').value = 'none';
    document.getElementById('ratingSort').value = 'none';
});

document.getElementById('titleSort').addEventListener('change', function() {
    document.getElementById('priceSort').value = 'none';
    document.getElementById('ratingSort').value = 'none';
});

document.getElementById('ratingSort').addEventListener('change', function() {
    document.getElementById('priceSort').value = 'none';
    document.getElementById('titleSort').value = 'none';
});