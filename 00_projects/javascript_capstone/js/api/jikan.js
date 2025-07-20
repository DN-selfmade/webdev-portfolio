"use strict"

export async function getCurrentAnime() {
    const res = await fetch("https://api.jikan.moe/v4/seasons/now");
    const json = await res.json();
    return json.data;
};

export async function getAnimeById(mediaId) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${mediaId}`);
    const json = await res.json();
    return json.data;
};