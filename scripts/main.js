const cardTemplate = document.querySelector("[data-game-template]");
const gameCardContainer = document.querySelector("[data-game-cards-container]");

// Helpers
addImageElement = (div, data, className) => {
    const tempImage = document.createElement('img');
    tempImage.src = data;
    tempImage.className = className;

    div.appendChild(tempImage);
};

posts = gamesData.map(post => {
    const card = cardTemplate.content.cloneNode(true).children[0];

    const title = card.querySelector("[data-title]");
    const details = card.querySelector("[data-details]");
    const genre = card.querySelector("[data-genre]");
    const price = card.querySelector("[data-price]");
    const image = card.querySelector("[data-img]");
    const description = card.querySelector("[data-description]");

    title.textContent = post.title;
    addImageElement(details, post.publisher, "card-publisher");

    //As there can be multiple platforms, loop over all platform images
    post.platform.forEach(platformImage => {
        addImageElement(details, platformImage, "card-platform");
    });

    addImageElement(details, post.developer, "card-developer");

    genre.textContent = post.genre;
    price.innerHTML = post.price;
    addImageElement(image, post.image, "card-image");
    description.textContent = post.description;

    gameCardContainer.append(card);
});

