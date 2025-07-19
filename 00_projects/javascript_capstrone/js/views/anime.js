"use strict"
import { getCurrentAnime } from "../api/jikan.js";
import { renderAnime } from "../dom/renderCard.js"

export async function renderAnimeView() {
    const container = document.getElementById("animeList");
    const anime = await getCurrentAnime();
    let id = 0;

    for (let i = 0; i < anime.length; i++) {
        if (id === anime[i].mal_id) continue;
        id = anime[i].mal_id;
        const element = anime[i];
        const card  = renderAnime(element);
        container.appendChild(card);
    };
};