"use strict"
import { getCurrentAnime, getCurrentAnimeMovies, getSearchAnimeGenre, getSearchAnimeInput, getSearchAnimeRelease, getSearchAnimeType } from "../api/jikan.js";
import { renderAnime } from "../dom/renderCard.js";
import { animeTvFilter, animeMovieFilter } from "../logic/filter.js";

export async function renderAnimeView() {
    const container = document.getElementById("animeList");
    const anime = await getCurrentAnime();
    const animes = animeTvFilter(anime);

    for (let i = 0; i < animes.length; i++) {
        const element = animes[i];

        const card  = renderAnime(element);
        container.appendChild(card);
    };
};

export async function renderMovieAnimeView() {
    const container = document.getElementById("animeList");
    const date = new Date();
    const year = date.getFullYear();

    const anime = await getCurrentAnimeMovies(year);
    const animes = animeMovieFilter(anime);

    for (let i = 0; i < animes.length; i++) {
        const element = animes[i];

        const card  = renderAnime(element);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchInput(value) {
    const container = document.getElementById("animeList");
    const anime = await getSearchAnimeInput(value);

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];

        const card  = renderAnime(element);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchType(value) {
    const container = document.getElementById("animeList");
    const anime = await getSearchAnimeType(value);

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];

        const card  = renderAnime(element);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchRelease(value) {
    const container = document.getElementById("animeList");
    const anime = await getSearchAnimeRelease(value);

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];

        const card  = renderAnime(element);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchGenre(value) {
    const container = document.getElementById("animeList");
    const anime = await getSearchAnimeGenre(value);

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];

        const card  = renderAnime(element);
        container.appendChild(card);
    };
};

function nextPage() {
    
}