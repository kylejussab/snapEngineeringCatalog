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

        //As there can be multiple platforms, loop over all platform images
        post.platform.forEach(platformImage => {
            addImageElement(details, platformImage, "card-platform");
        });

        addImageElement(details, post.developer, "card-developer");
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

        return matchesPublishers && matchesPlatforms && matchesStars;
    });

    displayFilteredGames(filteredGames);
    updateBackgroundImages(filteredGames);
}

//Add all event listeners
document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

//Call applyFilters for the first load
applyFilters();