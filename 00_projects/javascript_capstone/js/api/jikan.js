"use strict"

export async function getCurrentAnime(maxPages = 1) {
    let allAnime = [];

    for (let page = 1; page <= maxPages; page++) {
        const res = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}`);
        const json = await res.json();

        allAnime = allAnime.concat(json.data);

        if (!json || !json.pagination || !json.data) break;
    }

    return allAnime
        .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
        .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
};


export async function getAnimeById(mediaType, mediaId) {
    const res = await fetch(`https://api.jikan.moe/v4/${mediaType}/${mediaId}`);
    const json = await res.json();
    return json.data;
};

export async function getCurrentAnimeMovies(year, maxPages = 2) {
    let allMovies = [];

    for (let page = 1; page <= maxPages; page++) {
        const res = await fetch(`https://api.jikan.moe/v4/anime?type=movie&start_date=${year}-01-01&page=${page}`);
        const json = await res.json();
        const movies = json.data.filter(anime =>
            ["Finished Airing", "Currently Airing"].includes(anime.status)
            && anime.aired?.from && !isNaN(new Date(anime.aired.from))
        );

        allMovies = allMovies.concat(movies);

        if (!json.pagination.has_next_page) break;
    }

    return allMovies.sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
}