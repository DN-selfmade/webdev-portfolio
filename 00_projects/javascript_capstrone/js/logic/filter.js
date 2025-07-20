"use strict"

export function animeMovieFilter(type) {
    if (type.toLowerCase() === "movie") return true;
};

export function animeRatingFilterDetails(rating) {
    const ratingSpaceTrimmed = rating.trim();
    const ratingArray = ratingSpaceTrimmed.split(" ");
    rating = ratingArray[0];
    return rating;
}