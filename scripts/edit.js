//Contains all the relevant js, to add and remove game content

//Add content
document.getElementById('game-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
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
    
    gamesData.push(newGame);
    
    document.getElementById('game-form').reset();
    
    applyFilters();
});

//Delete content
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const button = event.target;
        const cardContainer = button.closest('.card-container');
        const title = cardContainer.querySelector(".card-title").textContent;
        const index = gamesData.findIndex(game => game.title === title);
        if (index !== -1){
            console.log(index);

            gamesData.splice(index, 1);

            cardContainer.parentNode.removeChild(cardContainer);
        }
    }
});

//Edit content
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')){
        const button = event.target;
        const cardContainer = button.closest('.card-container');
        const title = cardContainer.querySelector(".card-title").textContent;
        const index = gamesData.findIndex(game => game.title === title);
        
        cardContainer.querySelector(".edit-title").value = gamesData[index].title;
        cardContainer.querySelector(".edit-publisher").value = gamesData[index].publisherText;
        cardContainer.querySelector(".edit-platform").value = gamesData[index].platformText.split(',')[0];
        cardContainer.querySelector(".edit-developer").value = gamesData[index].developerText;
        cardContainer.querySelector(".edit-genre").value = gamesData[index].genre;
        cardContainer.querySelector(".edit-price").value = parseFloat(gamesData[index].price.replace("$", ""));
        cardContainer.querySelector(".edit-release").value = gamesData[index].release;
        cardContainer.querySelector(".edit-stars").value = gamesData[index].stars;
        cardContainer.querySelector(".edit-rating").value = parseFloat(gamesData[index].rating.replace("%", ""));
        cardContainer.querySelector(".edit-description").value = gamesData[index].description;

        

        //Show (or hide) the edit form
        if(cardContainer.querySelector(".edit-form").style.display == 'block'){
            cardContainer.querySelector(".edit-title").value = "";
            cardContainer.querySelector(".edit-publisher").value = "";
            cardContainer.querySelector(".edit-platform").value = "";
            cardContainer.querySelector(".edit-developer").value = "";
            cardContainer.querySelector(".edit-genre").value = "";
            cardContainer.querySelector(".edit-price").value = "";
            cardContainer.querySelector(".edit-release").value = "";
            cardContainer.querySelector(".edit-stars").value = "";
            cardContainer.querySelector(".edit-rating").value = "";
            cardContainer.querySelector(".edit-description").value = "";
            cardContainer.querySelector(".edit-form").style.display = 'none';

            //Show the main content
            cardContainer.querySelector(".card-content").style.display = 'block';
        }
        else{
            cardContainer.querySelector(".edit-form").style.display = 'block';

            //Hide the main content
            cardContainer.querySelector(".card-content").style.display = 'none';
        }
    }
});

//Submit editted content
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-submit-button')) {
        const button = event.target;
        const cardContainer = button.closest('.card-container');
        const title = cardContainer.querySelector(".card-title").textContent;
        const index = gamesData.findIndex(game => game.title === title);

        //Check validation steps
        if (!(/^\d{4}$/.test(cardContainer.querySelector(".edit-release").value))) {
            alert("Release must be a 4-digit number.");
            return;
        };

        if (cardContainer.querySelector(".edit-price").value < 0) {
            alert("Price cannot be negative.");
            return;
        }

        // Handles publisher, developer, and platform
        let publisherText = cardContainer.querySelector(".edit-publisher").value;
        let publisher;
        let developerText = cardContainer.querySelector(".edit-developer").value;
        let developer;
        let platformText = cardContainer.querySelector(".edit-platform").value;
        let platform;

        const matchingPublisher = gamesData.find(game => game.publisherText.toLowerCase() === publisherText.toLowerCase());
        const matchingDeveloper = gamesData.find(game => game.developerText.toLowerCase() === developerText.toLowerCase());
        const matchingPlatform = gamesData.some(game => game.platformText.toLowerCase().includes(platformText.toLowerCase()));

        if(!matchingPublisher){
            publisherText = "unknownpublisher";
            publisher = "assets/" + publisherText.toLowerCase() + ".png";
        }
        else{
            publisher = "assets/" + publisherText.replace(/\s/g, '').toLowerCase() + ".png";
        }

        if(!matchingDeveloper){
            developerText = "unknowndeveloper";
            developer = "assets/" + developerText.toLowerCase() + ".png";
        }
        else{
            developer = "assets/" + developerText.replace(/\s/g, '').toLowerCase() + ".png";
        }

        if(!matchingPlatform){
            platformText = "unknownplatform";
            platform = ["assets/" + platformText.toLowerCase() + ".png"];
        }
        else{
            platform = ["assets/" + platformText.toLowerCase() + ".png"];
        }


        gamesData[index].title = cardContainer.querySelector(".edit-title").value;
        cardContainer.querySelector(".edit-title").value = '';

        gamesData[index].publisherText = cardContainer.querySelector(".edit-publisher").value;
        cardContainer.querySelector(".edit-publisher").value = '';
        gamesData[index].publisher = publisher;

        gamesData[index].developerText = cardContainer.querySelector(".edit-developer").value;
        cardContainer.querySelector(".edit-developer").value = '';
        gamesData[index].developer = developer;

        gamesData[index].platformText = cardContainer.querySelector(".edit-platform").value;
        cardContainer.querySelector(".edit-platform").value = '';
        gamesData[index].platform = platform;

        gamesData[index].genre = cardContainer.querySelector(".edit-genre").value;
        cardContainer.querySelector(".edit-genre").value = '';

        gamesData[index].price = "$" + parseFloat(cardContainer.querySelector(".edit-price").value).toFixed(2);
        cardContainer.querySelector(".edit-price").value = '';

        gamesData[index].release = cardContainer.querySelector(".edit-release").value;
        cardContainer.querySelector(".edit-release").value = '';

        gamesData[index].stars = cardContainer.querySelector(".edit-stars").value;
        cardContainer.querySelector(".edit-stars").value = '';

        gamesData[index].rating = cardContainer.querySelector(".edit-rating").value + "%";
        cardContainer.querySelector(".edit-rating").value = '';

        gamesData[index].description = cardContainer.querySelector(".edit-description").value;
        cardContainer.querySelector(".edit-description").value = '';

        console.log(gamesData[index]);

        applyFilters();
    }
});

//Cancel button
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-cancel-button')){
        const button = event.target;
        const cardContainer = button.closest('.card-container');
        
        cardContainer.querySelector(".edit-title").value = "";
        cardContainer.querySelector(".edit-publisher").value = "";
        cardContainer.querySelector(".edit-platform").value = "";
        cardContainer.querySelector(".edit-developer").value = "";
        cardContainer.querySelector(".edit-genre").value = "";
        cardContainer.querySelector(".edit-price").value = "";
        cardContainer.querySelector(".edit-release").value = "";
        cardContainer.querySelector(".edit-stars").value = "";
        cardContainer.querySelector(".edit-rating").value = "";
        cardContainer.querySelector(".edit-description").value = "";
    }
});