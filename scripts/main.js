// Handles filtering and searching
// Also handles displaying cards after filtered and searched

const cardTemplate = document.querySelector("[data-game-template]");
const gameCardContainer = document.querySelector("[data-game-cards-container]");

// Helpers
addImageElement = (div, data, className) => {
    const tempImage = document.createElement('img');
    tempImage.src = data;
    tempImage.className = className;

    div.appendChild(tempImage);
};

addStarRating = (div, stars, className) => {
    let hasHalfRating;
    let numberOfStars = Math.floor(stars);

    //If there's half a star rating
    if(stars % 1 != 0){
        hasHalfRating = true;
    }
    else{
        hasHalfRating = false;
    }

    for(let i = 1; i < 6; i++){
        const starImage = document.createElement('img');
        if(i <= numberOfStars){
            starImage.src = "assets/fullStar.png";
        }
        else if(hasHalfRating){
            starImage.src = "assets/halfStar.png";
            hasHalfRating = false;
        }
        else{
            starImage.src = "assets/noStar.png";
        }
        starImage.className = className;
        div.appendChild(starImage);
    }
}

updateBackgroundImages = (filteredGames) => {
    const cardContainers = document.querySelectorAll('.card-container');

    for(let i = 0; i < filteredGames.length; i++){
        cardContainers[i].style.backgroundImage = "url('/" + filteredGames[i].image + "')";
    };
};

displayFilteredGames = (filteredGames) => {
    gameCardContainer.innerHTML = '';

    // Add data to cards in HTML
    posts = filteredGames.map(post => {
        const card = cardTemplate.content.cloneNode(true).children[0];

        const title = card.querySelector("[data-title]");
        const details = card.querySelector("[data-details]");
        const stars = card.querySelector("[data-stars]");
        const rating = card.querySelector("[data-rating]");
        const genre = card.querySelector("[data-genre]");
        const price = card.querySelector("[data-price]");
        const release = card.querySelector("[data-release]");
        const description = card.querySelector("[data-description]");

        title.textContent = post.title;
        addImageElement(details, post.publisher, "card-publisher");
        addImageElement(details, post.developer, "card-developer");

        //As there can be multiple platforms, loop over all platform images
        post.platform.forEach(platformImage => {
            addImageElement(details, platformImage, "card-platform");
        });

        addStarRating(stars, post.stars, "card-star");
        rating.textContent = "Rating: " + post.rating;
        genre.textContent = post.genre;
        price.textContent = post.price;
        release.textContent = post.release;
        description.textContent = post.description;

        gameCardContainer.append(card);
    });
}

applyFilters = () =>{
    const selectedPublishers = Array.from(document.querySelectorAll('input[type=checkbox][id^=publisher-]:checked')).map(checkbox => checkbox.id.replace('publisher-', ''));
    const selectedPlatforms = Array.from(document.querySelectorAll('input[type=checkbox][id^=platform-]:checked')).map(checkbox => checkbox.id.replace('platform-', ''));
    const selectedStars = Array.from(document.querySelectorAll('input[type=checkbox][id^=stars-]:checked')).map(checkbox => parseFloat(checkbox.id.replace('stars-', '')));

    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);

    const selectedTitleSort = document.getElementById('titleSort').value;
    const selectedPriceSort = document.getElementById('priceSort').value;
    const ratingPriceSort = document.getElementById('ratingSort').value;

    const filteredGames = gamesData.filter((game) => {
        const matchesPublishers = !selectedPublishers.length || selectedPublishers.some(publisher => game.publisherText.toLowerCase().includes(publisher));
        
        const matchesPlatforms = !selectedPlatforms.length || selectedPlatforms.some(platform => game.platformText.toLowerCase().includes(platform));

        const matchesStars = !selectedStars.length || selectedStars.some(selectedStar => {
            if(selectedStar % 1 === 0) {
                return Math.floor(game.stars) === selectedStar || Math.floor(game.stars) + 0.5 === selectedStar;
            } 
            else {
                return Math.floor(game.stars) + 0.5 === selectedStar || Math.floor(game.stars) === selectedStar;
            }
        });

        const gamePriceConverted = parseFloat(game.price.replace('$', ''));
        const matchesPrice = (isNaN(minPrice) || gamePriceConverted >= minPrice) && (isNaN(maxPrice) || gamePriceConverted <= maxPrice);


        return matchesPublishers && matchesPlatforms && matchesStars && matchesPrice;
    });

    const sortedGames = sortGames(filteredGames, selectedTitleSort, selectedPriceSort, ratingPriceSort);

    displayFilteredGames(sortedGames);
    updateBackgroundImages(sortedGames);
}

document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

document.getElementById('minPrice').addEventListener('input', applyFilters);
document.getElementById('maxPrice').addEventListener('input', applyFilters);

document.getElementById('titleSort').addEventListener('change', applyFilters);
document.getElementById('priceSort').addEventListener('change', applyFilters);
document.getElementById('ratingSort').addEventListener('change', applyFilters);

//Allow filters to be expanded and collapsed
document.addEventListener('DOMContentLoaded', function() {
    let collapsible = document.getElementsByClassName('collapsible');

    for(let i = 0; i < collapsible.length; i++) {
        let header = collapsible[i].getElementsByTagName('p')[0];
        let content = collapsible[i].querySelectorAll('div');

        let publisherArrowUp = collapsible[i].querySelector('#publisher-arrow-up');
        let publisherArrowDown = collapsible[i].querySelector('#publisher-arrow-down');
        let platformArrowUp = collapsible[i].querySelector('#platform-arrow-up');
        let platformArrowDown = collapsible[i].querySelector('#platform-arrow-down');
        let ratingArrowUp = collapsible[i].querySelector('#rating-arrow-up');
        let ratingArrowDown = collapsible[i].querySelector('#rating-arrow-down');
        let priceArrowUp = collapsible[i].querySelector('#price-arrow-up');
        let priceArrowDown = collapsible[i].querySelector('#price-arrow-down');

        header.addEventListener('click', function(event) {
            if(event.target.tagName === 'P') {
                
                this.parentNode.classList.toggle('active');

                const isPublisher = this.textContent.trim().toLowerCase() === 'publisher';
                const isPlatform = this.textContent.trim().toLowerCase() === 'platform';
                const isRating = this.textContent.trim().toLowerCase() === 'rating';
                const isPrice = this.textContent.trim().toLowerCase() === 'price range'; 

                content.forEach(div => {
                    if (div.style.display === 'block') {
                        div.style.display = 'none';

                        if(isPublisher) {
                            publisherArrowUp.style.display = 'none';
                            publisherArrowDown.style.display = 'inline-block';
                        } 
                        else if(isPlatform) {
                            platformArrowUp.style.display = 'none';
                            platformArrowDown.style.display = 'inline-block';
                        }
                        else if(isRating) {
                            ratingArrowUp.style.display = 'none';
                            ratingArrowDown.style.display = 'inline-block';
                        }
                        else if(isPrice) {
                            priceArrowUp.style.display = 'none';
                            priceArrowDown.style.display = 'inline-block';
                        }
                    }
                    else{
                        div.style.display = 'block';

                        if(isPublisher){
                            publisherArrowUp.style.display = 'inline-block';
                            publisherArrowDown.style.display = 'none';
                        } 
                        else if(isPlatform){
                            platformArrowUp.style.display = 'inline-block';
                            platformArrowDown.style.display = 'none';
                        }
                        else if(isRating){
                            ratingArrowUp.style.display = 'inline-block';
                            ratingArrowDown.style.display = 'none';
                        } 
                        else if(isPrice){
                            priceArrowUp.style.display = 'inline-block';
                            priceArrowDown.style.display = 'none';
                        } 
                    }
                });
            }
        });
    }
});

document.getElementById('resetFilters').addEventListener('click', function() {
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
});

document.getElementById('resetSort').addEventListener('click', function() {
    document.getElementById('titleSort').value = 'none';
    document.getElementById('priceSort').value = 'none';
    document.getElementById('ratingSort').value = 'none';


    applyFilters();
});

//Call applyFilters for the first load
applyFilters();