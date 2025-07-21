"use strict"

export function animeTvFilter(anime) {
    const animeList = [];
    const animeIds = [];

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];

        if (element.type.toLowerCase() === "tv" && !(animeIds.includes(element.mal_id))) {
            animeList.push(element);
            animeIds.push(element.mal_id);
        };
    }
    return animeList;
};

export function animeMovieFilter(anime) {
    const animeList = [];
    const animeIds = [];

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];
        
        if (element.type.toLowerCase() === "movie" && !(animeIds.includes(element.mal_id))) {
            animeList.push(element);
            animeIds.push(element.mal_id);
        };
    }
    return animeList;
};

export function animeRatingFilterDetails(rating) {
    if (rating === null) {
        return 0;
    } else {
        const ratingSpaceTrimmed = rating.trim();
        const ratingArray = ratingSpaceTrimmed.split(" ");
        rating = ratingArray[0];
        return rating;
    }
    
}