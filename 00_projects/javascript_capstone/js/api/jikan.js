"use strict"

export async function getCurrentAnime(nextPage = 1, maxPages = 1) {
    let allAnime = [];

    for (let page = nextPage; page <= maxPages; page++) {
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

export async function getSearchAnimeInput(value = "", maxPages = 1) {
    let allAnime = [];

    if (!(value === "")) {
        for (let page = 1; page <= maxPages; page++) {
            const res = await fetch(`https://api.jikan.moe/v4/anime?q=${value}&sfw=true`);
            const json = await res.json();

            allAnime = allAnime.concat(json.data);

        if (!json || !json.pagination || !json.data) break;
        
        return allAnime
        .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
        .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
        }
    }

    return;      
};

export async function getSearchAnimeType(value, maxPages = 1) {
    let allAnime = [];

    if (!(value === "")) {
        for (let page = 1; page <= maxPages; page++) {
            const res = await fetch(`https://api.jikan.moe/v4/anime?type=${value}&sfw=true`);
            const json = await res.json();

            allAnime = allAnime.concat(json.data);

        if (!json || !json.pagination || !json.data) break;
        
        return allAnime
        .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
        .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
        }
    }

    return;      
};

export async function getSearchAnimeRelease(value, maxPages = 1) {
    let allAnime = [];
    const valueArray = value.split("&");

    if (valueArray.length > 1 && !(valueArray[0] === "null")) {
        const [season, year] = [valueArray[0], valueArray[1]];
        for (let page = 1; page <= maxPages; page++) {
            const res = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?sfw=true`);
            const json = await res.json();

            allAnime = allAnime.concat(json.data);

        if (!json || !json.pagination || !json.data) break;
        
        return allAnime
        .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
        .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
    
        }
    } else {
        
        allAnime = getCurrentAnimeMovies(value);
        
        return allAnime;
    }  
     
    

    return;      
};

export async function getSearchAnimeGenre(value, maxPages = 1) {
    let allAnime = [];

     
    for (let page = 1; page <= maxPages; page++) {
        const res = await fetch(`https://api.jikan.moe/v4/anime?genres=${value}&sfw`);
        const json = await res.json();

        allAnime = allAnime.concat(json.data);

    if (!json || !json.pagination || !json.data) break;
    
    return allAnime
    .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
    .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
    
    }

    return;      
};