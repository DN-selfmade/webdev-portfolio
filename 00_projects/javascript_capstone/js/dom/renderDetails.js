"use strict"
import { animeRatingFilterDetails } from "../logic/filter.js";
import { translateToGerman } from "../api/deepl.js";

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

// Creating the Content of a detail page
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
    div.appendChild(infoAnimeDetails(anime));
    div.appendChild(lengthAnimeDetails(anime));
    div.appendChild(genresAnimeDetails(anime));
    div.appendChild(synopsisAnimeDetails(anime));
    
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
    if (anime.rating === null) {
        ratingTag.textContent = "k.A";
    } else {
        if(rating.toUpperCase() === "G") {
            info.textContent = `${rating} - Steht für alle Altersgruppen.`;
        } else if (rating.toUpperCase() === "PG") {
            info.textContent = `${rating} - Steht für eine empfohlene elternliche Begleitung.`;
        } else if (rating.toUpperCase() === "PG-13") {
            info.textContent = `${rating} - Steht für eine Altersfreigabe ab 13 Jahren.`;
        } else if (rating.toUpperCase() === "R" || rating.toUpperCase() === "R-17") {
            info.textContent = `${rating} - Steht für "Nur ab 17 Jahren", beinhaltet Gewalt u.ä.`;
        } else if (rating.toUpperCase() === "R-17+" || rating.toUpperCase() === "R+") {
            info.textContent = `${rating} - Steht für "Nur ab 17 Jahren", beinhaltet milde Nacktheit.`;
        } else if (rating.toUpperCase() === "RX") {
            info.textContent = `${rating} - Steht für "Erwachseneninhalte", enthält "Hentai".`;
        }

        ratingTag.textContent = rating;
        ratingTag.appendChild(info);

        ratingTag.addEventListener("click", (event) => {
            const x = event.pageX;
            const y = event.pageY;

            info.style.left = `${x + 10}px`;
            info.style.top = `${y + 10}px`;
            
            info.classList.remove("hidden");
            
            setTimeout(() => info.classList.add("hidden"), 4000);
        });
    }
    

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

    const scoreRounded = Math.floor(score * 10) / 10;

    scoreTag.innerHTML = `${scoreRounded}<strong>/</strong>10`;
    scoreTag.appendChild(info);

    scoreTag.addEventListener("click", (event) => {
        const x = event.pageX;
        const y = event.pageY;

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

// Creating subtitles for Title-Tag of Anime-details
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
    const imgDiv = document.createElement("div");
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

    const ourScore = 0;                                // Change this for Watchlog later

    imgDiv.classList = "image__detail";
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

    imgDiv.appendChild(image);

    sourceContainer.appendChild(sourceTitle);
    sourceList.appendChild(sourceContent);
    sourceContainer.appendChild(sourceList);
    
    scoreContainer.appendChild(scoreDetails(anime.score, "MAL"));
    scoreContainer.appendChild(placeHolder);
    scoreContainer.appendChild(scoreDetails(ourScore));

    infoContainer.appendChild(sourceContainer);
    infoContainer.appendChild(scoreTitle);
    infoContainer.appendChild(scoreContainer);

    show.appendChild(imgDiv);
    show.appendChild(infoContainer);
    

    return show;
}

function createPlaceholderPoint() {
    const placeholder = document.createElement("span");
    
    placeholder.classList = "info__placeholder";
    placeholder.textContent = "•";

    return placeholder;
}

// Creating the info-part of anime-detail page
function infoAnimeDetails(anime) {
    const div = document.createElement("div");

    div.classList = "info__status-details";

    div.appendChild(typeInfoAnimeDetails(anime));
    div.appendChild(createPlaceholderPoint());
    div.appendChild(statusInfoAnimeDetails(anime));
    div.appendChild(createPlaceholderPoint());
    div.appendChild(seasonInfoAnimeDetails(anime));

    return div;
}

// Creating the type tag of info.part
function typeInfoAnimeDetails({type}) {
    const typeTag = document.createElement("div");

    typeTag.classList = "status__type-details";
    typeTag.dataset.type = `${type}`;

    typeTag.addEventListener("click", () => {
        window.location.hash = `type/${type}`;
    });

    switch (type.toUpperCase()) {
        case "TV":
            typeTag.textContent = `Anime`;
            break;
        
        case "MOVIE":
            typeTag.textContent = `Film`;
            break;
        
        case "OVA":
            typeTag.textContent = `OVA`;
            break;
    
        case "SPECIAL":
            typeTag.textContent = `Spezial`;
            break;
        
        case "ONA":
            typeTag.textContent = `ONA`;
            break;

        case "MUSIC":
            typeTag.textContent = `Musik`;
            break;
        
        default:
            break;
    }

    return typeTag;
}

// Creating  Status for infoAnimeDetails.
function statusInfoAnimeDetails({status}) {
    const statusTag = document.createElement("div");

    statusTag.classList = "status__status-details";

    const statusArray = status.split(" ");

    switch (statusArray[0].toLowerCase()) {
        case "finished":
            statusTag.textContent = "Ausgestrahlt";
            statusTag.dataset.status = "finished";
            break;

        case "currently":
            statusTag.textContent = "Läuft";
            statusTag.dataset.status = "airing";
            break;
            
        case "not":
            statusTag.textContent = "Ausstehend";
            statusTag.dataset.status = "not";
            break;

        default:
            break;
    }

    statusTag.dataset.value = status;

    return statusTag;
}

// Creating Season info for status
function seasonInfoAnimeDetails({season, year, aired}) {
    const seasonTag = document.createElement("div");

    seasonTag.classList = "status__season-details";
    seasonTag.dataset.year = year;
    seasonTag.dataset.season = season;

    if (season === null) {
        seasonTag.textContent = {year};
        if (year === null) {
            
            if (aired.from === null) {
                seasonTag.textContent = "k.A.";
            } else {
                const dateYMDHour = aired.from.split("T");
                const dateYMD = dateYMDHour[0];
                const [dateY, dateM, dateD] = dateYMD.split("-");
                 
                seasonTag.textContent = `${dateD}.${dateM}.${dateY}`;
                seasonTag.dataset.year = dateY;
            }
        }
    } else {
        switch (season.toLowerCase()) {
            case "spring":
                seasonTag.textContent = `Frühling ${year}`;
                break;
            
            case "summer":
                seasonTag.textContent = `Sommer ${year}`;
                break;
        
            case "fall":
                seasonTag.textContent = `Herbst ${year}`;
                break;
            
            case "autumn":
                seasonTag.textContent = `Herbst ${year}`;
                break;
        
            case "winter":
                seasonTag.textContent = `Winter ${year}`;
                break;
        
            default:
                break;
        }
    }
    seasonTag.addEventListener("click", () => {
        if (season === "null") {
            window.location.hash = `release/${season}&${seasonTag.dataset.year}`;
        } else {
            window.location.hash = `release/${seasonTag.dataset.year}`;
        }
        
    })

    return seasonTag;
}

// Creating the length-part of the anime detail page.
function lengthAnimeDetails(anime) {
    const div = document.createElement("div");
    div.classList = "info__length";

    div.appendChild(durationAnimeDetails(anime.duration, anime.episodes));
    div.appendChild(episodesAnimeDetails(anime));

    return div;
}

// Creating the duration-tag of length-part
function durationAnimeDetails(duration, episodes) {
    const div = document.createElement("div");
    const title = document.createElement("h3");
    const content = document.createElement("p");

    const durationParts = duration.split(" ");
    const durationNumbers = durationParts.filter(part => !isNaN(part));

    div.classList = "length__duration";
    title.classList = "duration__title";
    content.classList = "duration__content";

    title.textContent = "Spiellänge:";

    if (durationParts.includes("hr")) {

        if (episodes > 1) {
            content.textContent = `ca. ${durationNumbers[0]} Stunden und ${durationNumbers[1]} Minuten pro Teil.`;
        } else {
            content.textContent = `${durationNumbers[0]} Stunden und ${durationNumbers[1]} Minuten.`;
        }

    } else if (durationParts.includes("min")) {

        if (episodes > 1) {
            content.textContent = `${durationNumbers} Minuten pro Folge.`;
        } else {
            content.textContent = `${durationNumbers} Minuten.`;
        }

    } else {
        content.textContent = "Keine Angaben vorhanden.";
    }

    div.appendChild(title);
    div.appendChild(content);

    return div;
}

// Create episode content for length part
function episodesAnimeDetails(anime) {
    const div = document.createElement("div");
    const title = document.createElement("h3");
    const content = document.createElement("p");
    const statusTag = statusInfoAnimeDetails(anime);
    const typeTag = typeInfoAnimeDetails(anime);
    const episodes = anime.episodes;

    const status = statusTag.dataset.status;
    const type = typeTag.dataset.type.toLowerCase();
    

    div.classList = "length__episodes";
    title.classList = "episodes__title";
    content.classList = "episodes__content";

    if (status === "airing" || status === "not") {

        if (type === "movie") {

            title.textContent = "Geplante Filmteile:";
            content.textContent = episodes;
        
        } else if (episodes >= 1) {

            title.textContent = "Geplante Folgenanzahl:";
            content.textContent = episodes;

        } else {
            title.textContent = "Geplante Menge:";
            content.textContent = "Keine Angabe.";
        }

    } else {

        if (type === "movie") {

            title.textContent = "Filmteile:";
            content.textContent = episodes;

        } else if (episodes >= 1) {

            title.textContent = "Folgenanzahl:";
            content.textContent = episodes;

        } else {
            title.textContent = "Geplante Menge:";
            content.textContent = "Keine Angabe.";
        }
    }

    div.appendChild(title);
    div.appendChild(content);

    return div;
}

function genresAnimeDetails({genres}) {
    const div = document.createElement("div");
    const divTitle = document.createElement("h3");
    const divContent = document.createElement("div");

    divTitle.textContent = "Genres:"; 

    div.classList = "details__genre";
    divTitle.classList = "genre__title";
    divContent.classList = "genre__content";
    
    for (let i = 0; i < genres.length; i++) {
        const element = genres[i];
        const genre = document.createElement("div");
        
        genre.classList = "genre__element";

        genre.dataset.id = element.mal_id;
        genre.dataset.type = element.type;
        genre.dataset.name = element.name;

        genre.textContent = element.name;

        genre.addEventListener("click", () => {
            window.location.hash = `genre/${element.mal_id}`;
        });

        divContent.appendChild(genre);
    }

    div.appendChild(divTitle);
    div.appendChild(divContent);

    return div;
}

// Creating synopsis part of detail page
function synopsisAnimeDetails(anime) {
    const div = document.createElement("div");

    div.classList = "details__synopsis";

    div.appendChild(synopsisTextAnimeDetails(anime));
    div.appendChild(synopsisTrailerAnimeDetails(anime));

    return div;
}

// Creating synopsis Content for  Synopsis part of detail page
function synopsisTextAnimeDetails({synopsis}) {
    const div = document.createElement("div");
    const divTitle = document.createElement("h3");
    const divContent = document.createElement("blockquote");

    div.classList = "synopsis__container";
    divTitle.classList = "synopsis__title";
    divContent.classList = "synopsis__content";
    
    divTitle.textContent = "Beschreibung:";
    const text = synopsis//translateToGerman(synopsis);
    divContent.textContent = text;
    

    div.appendChild(divTitle);
    div.appendChild(divContent);

    return div;
}

// Creating Trailer Content for Synopsis part of detail page
function synopsisTrailerAnimeDetails({trailer}) {
    const div = document.createElement("div");
    const divTitle = document.createElement("div");
    const divVideo = document.createElement("div");

    div.classList = "synopsis__trailer";
    divTitle.classList = "trailer__head";
    divVideo.classList = "trailer__container hidden-trailer"; // and visible-trailer for animation with css

    divTitle.innerHTML = '<svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg><h3>Trailer</h3>';
    
    divVideo.innerHTML = `
    <iframe class="trailer__video"
    width="949" height="534" 
    src="https://www.youtube-nocookie.com/embed/${trailer.youtube_id}"  
    allow="accelerometer; autoplay;" allowfullscreen></iframe>`;

    divTitle.addEventListener("click", () => {
        if (divVideo.classList.contains("hidden-trailer")) {

            divVideo.classList.remove("hidden-trailer");
            divVideo.classList.add("visible-trailer");
            divTitle.innerHTML = '<svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg><h3>Trailer</h3>';
             setTimeout(() => {
                divVideo.innerHTML = `
                <iframe class="trailer__video"
                src="https://www.youtube-nocookie.com/embed/${trailer.youtube_id}"  
                allow="accelerometer; autoplay;" allowfullscreen></iframe>`;
            }, 400);

        } else {

            divVideo.classList.remove("visible-trailer");
            divVideo.classList.add("hidden-trailer");
            divTitle.innerHTML = '<svg id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg><h3>Trailer</h3>';
            setTimeout(() => {
                divVideo.innerHTML = `
                <iframe class="trailer__video"
                src="https://www.youtube-nocookie.com/embed/${trailer.youtube_id}"  
                allow="accelerometer; autoplay;" allowfullscreen></iframe>`;
            }, 400);
        }
    });

    div.appendChild(divTitle);
    div.appendChild(divVideo);

    return div;
}