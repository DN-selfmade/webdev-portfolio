"use strict"

import { getCurrentAnime, getCurrentAnimeMovies } from "../api/jikan.js";
import { renderAnime } from "../dom/renderCard.js";
import { animeTvFilter } from "../logic/filter.js";

export async function renderIndexView() {
   await animeList();
   listEnd('animeList', 'anime');
   await animeMovieList();
   listEnd('movieList', 'movie');
};

async function animeList() {
    const container = document.getElementById("animeList");

    const anime = await getCurrentAnime();
    const animes = animeTvFilter(anime);

    for (let i = 0; i <= 7; i++) {
        const element = animes[i];

        const card  = renderAnime(element);
        container.appendChild(card);
    };
};

async function animeMovieList() {
    const container = document.getElementById("movieList");
    const year = new Date().getFullYear();
    const movies = await getCurrentAnimeMovies(year, 1);

    for (let i = 0; i <= 7; i++) {
        const element = movies[i];

        const card  = renderAnime(element);
        container.appendChild(card);
    };
};

function listEnd(element, page) {
    const type = document.getElementById(element);
    
    const div = document.createElement('div');

    div.classList = 'home__card-end';

    div.innerHTML = `
    <a href="#${page}" class="more-arrow" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="13 17 18 12 13 7"></polyline>
    <polyline points="6 17 11 12 6 7"></polyline>
    </svg>
    </a>
    `;
    type.appendChild(div);
}