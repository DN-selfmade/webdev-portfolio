"use strict"

import { getCurrentAnime } from "../api/jikan.js";
import { renderAnime } from "../dom/renderCard.js";

export async function renderIndexView() {
    const main = document.getElementById("main");
    const container = document.createElement("div");
    container.className = "home-anime";
    const title = document.createElement("h2");
    title.textContent = "Aktuelle Anime Season: ";
    container.appendChild(title);
    main.appendChild(container);

    const anime = await getCurrentAnime();
    anime.forEach(item => {
        const card  = renderAnime(item);
        container.appendChild(card);
    });
}