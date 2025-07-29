"use strict"

export function addOrUpdateAnimeEntry(animeEntry) {

    let data = JSON.parse(localStorage.getItem("myAnimeData")) || { animes: [] };

    const index = data.animes.findIndex(a => a.id === animeEntry.id);

    if (index !== -1) {
        data.animes[index] = animeEntry;
    } else {
        data.animes.push(animeEntry);
    }

    localStorage.setItem("myAnimeData", JSON.stringify(data));

}

export function getAllAnimes() {
    const data = JSON.parse(localStorage.getItem("myAnimeData")) || { animes: [] };
    return data.animes;
}

export function getStorageAnimeById(id) {
    const data = JSON.parse(localStorage.getItem("myAnimeData")) || { animes: [] };

    return data.animes.find(a => String(a.id) === String(id));
}

export function deleteAnime(id) {
    let data = JSON.parse(localStorage.getItem("myAnimeData")) || { animes: [] };
    data.animes = data.animes.filter(a => a.id !== id);
    localStorage.setItem("myAnimeData", JSON.stringify(data));
}

export function setAnimeForStorage (
    mediaID, 
    mediaStatus, 
    mediaCharacters = null, 
    mediaStory = null, 
    mediaAtmosphere = null, 
    mediaAnimation = null, 
    mediaMusic = null, 
    mediaScore = null, 
    mediaComment = null, 
    mediaWatchedDate = null, 
    mediaRewatchCount = null) {

    let anime = {
        id: mediaID,
        status: mediaStatus,
        extras: {
            categories: {
                characters: mediaCharacters,
                story: mediaStory,
                atmosphere: mediaAtmosphere,
                animation: mediaAnimation,
                music: mediaMusic
            },
            score: mediaScore,
            comment: mediaComment
        },
        watchedDate: mediaWatchedDate,
        rewatchCount: mediaRewatchCount
    };

    return anime;
}