"use strict"
import { animeRatingFilterDetails } from "../logic/filter.js";

// Navigation for details of mediasource by his ID and adding a small delayed click animation.
export function eventCardUrl() {
    const cards = document.querySelectorAll(".media__card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.add("media__card--clicked")
            setTimeout(() => {
                card.classList.remove("media__card--clicked");
                const type = card.dataset.text;
                const id = card.dataset.value;
                window.location.hash = `${type}/${id}`;
            }, 100)
            
      })
   })
}

// Creating the highest DOM-Tag of a detail page
export function renderAnimeDetails(anime) {
    const div = document.createElement("div");
    const head = document.createElement("div");
    head.classList = "info__head";
    div.className = "anime__info";
    div.dataset.value = anime.mal_id;
    div.dataset.text = "anime";
    div.dataset.status = "";
    
    head.appendChild(titleAnimeDetails(anime));
    head.appendChild(subTitlesAnime(anime));
    div.appendChild(head);
    div.appendChild(showAnimeDetails(anime));
    return div;
}

// Creating the first DOM-Tag of a Anime-detail page.
function titleAnimeDetails(anime) {
    const title = document.createElement("div");
    title.classList = "anime__head";

    title.appendChild(ratingAnimeDetails(anime));
    title.appendChild(hTitleAnimeDetails(anime));
    title.appendChild(watchCounter());

    return title;
}

// Creating Rating-DOM of a Anime-detail page.
function ratingAnimeDetails(anime) {

    const ratingTag = document.createElement("p");
    const info = document.createElement("i");
    const rating = animeRatingFilterDetails(anime.rating);

    info.classList = "rating__description hidden";
    ratingTag.classList = "info__rating info__rating-Anime";

    if(rating.toUpperCase() === "G") {
        info.textContent = `${rating} - Steht für alle Altersgruppen.`;
    } else if (rating.toUpperCase() === "PG") {
        info.textContent = `${rating} - Steht für eine empfohlene elternliche Begleitung.`;
    } else if (rating.toUpperCase() === "PG-13") {
        info.textContent = `${rating} - Steht für eine Altersfreigabe ab 13 Jahren.`;
    } else if (rating.toUpperCase() === "R-17+" || rating.toUpperCase() === "R-17") {
        info.textContent = `${rating} - Steht für "Nur ab 17 Jahren", beinhaltet Gewalt u.ä..`;
    } else if (rating.toUpperCase() === "R" || rating.toUpperCase() === "R+") {
        info.textContent = `${rating} - Steht für "Nur ab 17 Jahren", Gewalt etc. und eventuell milde Nacktheit.`;
    } else if (rating.toUpperCase() === "RX") {
        info.textContent = `${rating} - Steht für "Erwachseneninhalte", enthält "Hentai".`;
    }

    ratingTag.textContent = rating;
    ratingTag.appendChild(info);

    ratingTag.addEventListener("click", (event) => {
        const x = event.clientX;
        const y = event.clientY;

        info.style.left = `${x + 10}px`;
        info.style.top = `${y + 10}px`;
        
        info.classList.remove("hidden");
        
        setTimeout(() => info.classList.add("hidden"), 4000);
    });

    return ratingTag;
}
// Creating Score-part for MyAnimeList Score.
function scoreDetails(score, source) {

    const scoreTag = document.createElement("div");
    const info = document.createElement("p");

    info.classList = "score__description hidden";
    scoreTag.classList = "info__score info__score-Anime";

    if(source === "MAL") {
        info.textContent = "Diese Bewertung kommt von MyAnimeList.";
    } else {
        info.textContent = "Diese Bewertung kommt von Watchlog X.";
    };

    scoreTag.textContent = `${score}/10`;
    scoreTag.appendChild(info);

    scoreTag.addEventListener("click", (event) => {
        const x = event.clientX;
        const y = event.clientY;

        info.style.left = `${x - 10}px`;
        info.style.top = `${y}px`;
        info.style.transform = "translateX(-100%)";
        
        info.classList.remove("hidden");
        
        setTimeout(() => info.classList.add("hidden"), 4000);
    });

    return scoreTag;
}

// Creating h-Title-DOM-Tag of the Anime-detail page.
function hTitleAnimeDetails(anime) {
    const titleContainer = document.createElement("div");
    const title = document.createElement("h1");
    
    titleContainer.classList = "title__container";
    title.classList = "title__main";

    title.textContent = anime.title;

    
    titleContainer.appendChild(title);

    return titleContainer;
}

function subTitlesAnime(anime) {
    const subTitles = document.createElement("div");
    const gb = document.createElement("span");
    const gbTitle = document.createElement("h2");
    const jpn = document.createElement("span");
    const jpnTitle = document.createElement("h2");
    const placeHolder = document.createElement("span");

    subTitles.classList = "title__lang";
    gb.classList = "title__lang-tag";
    jpn.classList = "title__lang-tag";
    placeHolder.classList = "title__placeholder";

    gb.textContent = "🇬🇧";
    jpn.textContent = "🇯🇵";
    placeHolder.textContent = "•";

    gbTitle.textContent = anime.title_english;
    jpnTitle.textContent = anime.title_japanese;

    if (!(gbTitle.textContent === "")) {
        subTitles.appendChild(gb);
        subTitles.appendChild(gbTitle);
        if (!(jpnTitle.textContent === "")){
            subTitles.appendChild(placeHolder);
            subTitles.appendChild(jpn);
            subTitles.appendChild(jpnTitle);
        }
    } else if (!(jpnTitle.textContent === "")) {
        subTitles.appendChild(jpn);
        subTitles.appendChild(jpnTitle);
    }
    return subTitles;
}

// Creating WatchCounter-Tag.
function watchCounter() {
    const watchCounter = document.createElement("div");

    watchCounter.id = "watchCounter";
    watchCounter.classList = "hidden-logo";

    watchCounter.textContent = "";

    return watchCounter;
}

// Creating a Show-DOM-tags of anime-detail page
function showAnimeDetails(anime) {
    const show = document.createElement("div");
    const image = document.createElement("img");
    const studioContainer = document.createElement("div");
    const producersContainer = document.createElement("div");
    const infoContainer = document.createElement("div");
    const scoreTitle = document.createElement("h3");
    const scoreContainer = document.createElement("div");
    const placeHolder = document.createElement("span");
    const sourceContainer = document.createElement("div");
    const sourceTitle = document.createElement("h3");
    const sourceList = document.createElement("ul");
    const sourceContent = document.createElement("li");

    const ourScore = 0;                                     // Change this for Watchlog later

    image.classList = "image__detail";
    show.classList = "show__detail";
    placeHolder.classList = "score__placeholder";
    infoContainer.classList = "detail__info";
    scoreTitle.classList = "score__title";
    scoreContainer.classList = "detail__score";
    sourceContent.classList = "source__li";

    image.src = anime.images.jpg.large_image_url;
    placeHolder.textContent = "•";
    scoreTitle.textContent = "Bewertungen:";
    sourceTitle.textContent = "Anime-Quelle:";
    sourceContent.textContent = anime.source;
    
    if (anime.studios.length === 1) {
        studioContainer.innerHTML = `<h3 class="studio__title">Studio:</h3><ul><li class="studio__li">${anime.studios[0].name}</li></ul>`;
        infoContainer.appendChild(studioContainer);
    } else if (anime.studios.length > 1) {
        studioContainer.innerHTML = `<h3 class="studio__title">Studios:</h3>`;
        const studioList = document.createElement("ul");
        
        for (let i = 0; i < anime.studios.length; i++) {
            const element = anime.studios[i].name;
            const liElement = document.createElement("li")
            liElement.classList = "studio__li";
            liElement.textContent = element;
            studioList.appendChild(liElement);
        }
        studioContainer.appendChild(studioList);
        infoContainer.appendChild(studioContainer);
    };

    if (anime.producers.length === 1) {
        producersContainer.innerHTML = `<h3 class="publisher__title">Publisher/Verlag:</h3><ul><li class="publisher__li">${anime.producers[0].name}</li></ul>`;
        infoContainer.appendChild(producersContainer);
    } else if (anime.producers.length > 1) {
        producersContainer.innerHTML = `<h3 class="publisher__title">Publisher/Verläge:</h3>`;
        const producersList = document.createElement("ul");
        
        for (let i = 0; i < anime.producers.length; i++) {
            const element = anime.producers[i].name;
            const liElement = document.createElement("li")
            liElement.classList = "publisher__li";
            liElement.textContent = element;
            producersList.appendChild(liElement);
        }
        producersContainer.appendChild(producersList);
        infoContainer.appendChild(producersContainer);
    };

    sourceContainer.appendChild(sourceTitle);
    sourceList.appendChild(sourceContent);
    sourceContainer.appendChild(sourceList);
    
    scoreContainer.appendChild(scoreDetails(anime.score, "MAL"));
    scoreContainer.appendChild(placeHolder);
    scoreContainer.appendChild(scoreDetails(ourScore));

    infoContainer.appendChild(sourceContainer);
    infoContainer.appendChild(scoreTitle);
    infoContainer.appendChild(scoreContainer);

    show.appendChild(image);
    show.appendChild(infoContainer);
    

    return show;
}