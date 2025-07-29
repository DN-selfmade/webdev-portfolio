"use strict"
export let currentPage;
export let lastPage;

export async function getCurrentAnime(page = 1) {

    const res = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}`);
    const json = await res.json();


    if (!json || !json.pagination || !json.data) return [];
    currentPage = json.pagination.current_page;
    lastPage = json.pagination.last_visible_page;

    return json.data
        .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
        .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
};


export async function getAnimeById(mediaType, mediaId) {
    const res = await fetch(`https://api.jikan.moe/v4/${mediaType}/${mediaId}`);
    const json = await res.json();
    return json.data;
};

export async function getCurrentAnimeMovies(year, page = 1) {
    let allMovies = [];


    const res = await fetch(`https://api.jikan.moe/v4/anime?type=movie&start_date=${year}-01-01&page=${page}`);
    const json = await res.json();
    const movies = json.data

    allMovies = allMovies.concat(movies);

    if (!json.pagination.has_next_page) return;

    currentPage = json.pagination.current_page;
    lastPage = json.pagination.last_visible_page;

    return allMovies
}

export async function getSearchAnimeInput(value = "", page = 1) {
    let allAnime = [];


    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${value}&sfw=true&page=${page}`);
    const json = await res.json();

    allAnime = allAnime.concat(json.data);

    if (!json || !json.pagination || !json.data) return;

    currentPage = json.pagination.current_page;
    lastPage = json.pagination.last_visible_page;
    
    return allAnime
    .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
    .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
            
};

export async function getSearchAnimeType(value, page = 1) {
    let allAnime = [];

    const res = await fetch(`https://api.jikan.moe/v4/anime?type=${value}&sfw=true&page=${page}`);
    const json = await res.json();

    allAnime = allAnime.concat(json.data);

    if (!json || !json.pagination || !json.data) return;

    currentPage = json.pagination.current_page;
    lastPage = json.pagination.last_visible_page;
    
    return allAnime
    .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
    .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
            
};

export async function getSearchAnimeRelease(value, page = 1) {
    let allAnime = [];
    const valueArray = value.split("&");

    if (valueArray.length > 1 && !(valueArray[0] === "null")) {
        const [season, year] = [valueArray[0], valueArray[1]];
        
            const res = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?sfw=true&page=${page}`);
            const json = await res.json();

            allAnime = allAnime.concat(json.data);

        if (!json || !json.pagination || !json.data) return;

        currentPage = json.pagination.current_page;
        lastPage = json.pagination.last_visible_page;

        return allAnime
        .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
        .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
    
        
    } else {
        
        allAnime = getCurrentAnimeMovies(value, page);
        
        return allAnime;
    }     
};

export async function getSearchAnimeGenre(value, page = 1) {
    let allAnime = [];

     
    
        const res = await fetch(`https://api.jikan.moe/v4/top/anime?genres=${value}&sfw&page=${page}`);
        const json = await res.json();

        allAnime = allAnime.concat(json.data);

    if (!json || !json.pagination || !json.data) return;
    currentPage = json.pagination.current_page;
    lastPage = json.pagination.last_visible_page;
    
    return allAnime
    .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
    .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));      
};

export async function getSearchAnimeTop(page = 1) {
    let allAnime = [];

    const res = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    const json = await res.json();

    allAnime = allAnime.concat(json.data);

    if (!json || !json.pagination || !json.data) return;
    currentPage = json.pagination.current_page;
    lastPage = json.pagination.last_visible_page;

    return allAnime
        .filter(anime => ["Finished Airing", "Currently Airing"].includes(anime.status))
        .sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
};

export async function getSearchAnimeUpcoming(page = 1) {
    let allAnime = [];

    const res = await fetch(`https://api.jikan.moe/v4/seasons/upcoming?page=${page}`);
    const json = await res.json();

    allAnime = allAnime.concat(json.data);

    if (!json || !json.pagination || !json.data) return;
    currentPage = json.pagination.current_page;
    lastPage = json.pagination.last_visible_page;

    return allAnime
};