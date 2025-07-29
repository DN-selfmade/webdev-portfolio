"use strict"

import { getCurrentAnime, getCurrentAnimeMovies, getSearchAnimeUpcoming } from "../api/jikan.js";
import { renderAnime } from "../dom/renderCard.js";
import { animeTvFilter, animeDoubleFilter } from "../logic/filter.js";
import { checkAnimeCard, checkAnimeCards } from "../logic/rating.js";

export async function renderIndexView() {

    await animeList();
    listEnd('animeList', 'anime');
    await animeMovieList();
    listEnd('movieList', 'movie');
    await animeUpcoming();
    listEnd('upcomingList', 'upcoming');

};

async function animeList() {
    const container = document.getElementById("animeList");

    const anime = await getCurrentAnime();
    const animes = animeTvFilter(anime);

    for (let i = 0; i <= 7; i++) {
        const element = animes[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

async function animeUpcoming() {
    const container = document.getElementById("upcomingList");

    const anime = await getSearchAnimeUpcoming();
    const animes = animeDoubleFilter(anime);

    for (let i = 0; i <= 7; i++) {
        const element = animes[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

async function animeMovieList() {
    const container = document.getElementById("movieList");
    const year = new Date().getFullYear();
    const movies = await getCurrentAnimeMovies(year, 1);

    for (let i = 0; i <= 7; i++) {
        const element = movies[i];

        const card = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

function listEnd(element, page) {
    const type = document.getElementById(element);
    
    const div = document.createElement('div');

    div.classList = 'home__card-end';

    div.innerHTML = `
    <a href="#${page}&1" class="more-arrow" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="13 17 18 12 13 7"></polyline>
    <polyline points="6 17 11 12 6 7"></polyline>
    </svg>
    </a>
    `;
    type.appendChild(div);
}