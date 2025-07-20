"use strict"
import { animeRatingFilterDetails } from "../logic/filter.js";

export function eventCardUrl() {
    const cards = document.querySelectorAll(".media__card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const type = card.dataset.text;
            const id = card.dataset.value;
            window.location.hash = `${type}/${id}`;
      })
   })
}

export function renderAnimeDetails(anime) {
    const div = document.createElement("div");
    div.className = "anime__info";
    div.dataset.value = anime.mal_id;
    div.dataset.text = "anime";
    div.dataset.status = "";
    
    div.appendChild(titleAnimeDetails(anime));

    return div;
}


function titleAnimeDetails(anime) {
    const title = document.createElement("div");

    title.appendChild(ratingAnimeDetails(anime));

    return title;
}

function ratingAnimeDetails(anime) {
    const ratingTag = document.createElement("div");

    ratingTag.classList = "info__rating info__rating-Anime";
    const rating = animeRatingFilterDetails(anime.rating);

    

    ratingTag.textContent = rating;
    console.log(typeof rating);

    return ratingTag;
}