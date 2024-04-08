//Contains all the relevant js, to add and remove game content

//Add content
document.getElementById('game-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Get the values from the form
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    
    let price = document.getElementById('price').value;
    price = '$' + (Math.round(price * 100) / 100).toFixed(2);

    let rating = document.getElementById('rating').value;
    rating = rating + '%';

    const stars = document.getElementById('stars').value;
    const release = document.getElementById('release').value;


    const description = document.getElementById('description').value;

    let publisherText = document.getElementById('publisher').value;
    let platformText = document.getElementById('platform').value;
    let developerText = document.getElementById('developer').value;

    const matchingPublisher = gamesData.find(game => game.publisherText.toLowerCase() === publisherText.toLowerCase());
    const matchingDeveloper = gamesData.find(game => game.developerText.toLowerCase() === developerText.toLowerCase());

    platformText = platformText.replace(/\s/g, '');
    const matchingPlatform = gamesData.some(game => game.platformText.toLowerCase().includes(platformText.toLowerCase()));

    if(!matchingPublisher){
        publisherText = "unknownpublisher";
        publisher = "assets/" + publisherText + ".png";
    }
    else{
        publisher = "assets/" + publisherText.replace(/\s/g, '') + ".png";
    }

    if(!matchingDeveloper){
        developerText = "unknowndeveloper";
        developer = "assets/" + developerText + ".png";
    }
    else{
        developer = "assets/" + developerText.replace(/\s/g, '') + ".png";
    }

    if(!matchingPlatform){
        platformText = "unknownplatform";
        platform = ["assets/" + platformText + ".png"];
    }
    else{
        platform = ["assets/" + platformText + ".png"];
    }
    
    // Create a new game object
    const newGame = {
        image: "assets/tempcardbackgroundimage.png",
        title: title,
        publisher: publisher,
        publisherText: publisherText,
        genre: genre,
        developerText: developerText,
        developer: developer,
        platformText: platformText,
        platform: platform,
        price: price,
        rating: rating,
        stars: stars,
        release: release,
        description: description
    };
    
    // Push the new game object to the gamesData array
    gamesData.push(newGame);
    
    // Optionally, you can clear the form fields after submission
    document.getElementById('game-form').reset();
    
    // Optionally, you can trigger any necessary updates or re-renders
    // For example:
    applyFilters();
});


//Delete content
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const button = event.target;
        const cardContainer = button.closest('.card-container'); // Find the parent card container
        const title = cardContainer.querySelector(".card-title").textContent;
        const index = gamesData.findIndex(game => game.title === title);
        if (index !== -1){
            console.log(index);

            gamesData.splice(index, 1);

            cardContainer.parentNode.removeChild(cardContainer);
        }
    }
});