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

export function animeDoubleFilter(anime) {
    const animeList = [];
    const animeIds = [];

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];
        
        if (!(animeIds.includes(element.mal_id))) {
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

export function filter() {
    const typeBtn = document.getElementById("filterType");
    const topBtn = document.getElementById("filterTop");
    const genreBtn = document.getElementById("filterGenre");
    const seasonBtn = document.getElementById("searchBtn");
    const typeContainer = document.querySelector('.filter__dropdown');
    const genreContainer = document.querySelector('.genre__list');

    topBtn.addEventListener("click", () => {
        window.location.hash = "top";
    });

    typeBtn.addEventListener("click", (event) => {    
        const typeList = document.querySelectorAll('.dropdown-option');
        const x = event.pageX;
        const y = event.pageY;

        typeContainer.style.left = `${x + 10}px`;
        typeContainer.style.top = `${y + 10}px`;
        typeContainer.style.transform = "translateX(+10%)";
        
        typeContainer.classList.toggle("hidden");

        typeList.forEach(type => {
            type.addEventListener("click", () => {
                window.location.hash = `type/${type.dataset.name.toLowerCase()}`;
            });
        });

    });
    genreBtn.addEventListener("click", (event) => {    
        const genreList = document.querySelectorAll('.genre__option');
        const x = event.pageX;
        const y = event.pageY;

        genreContainer.style.left = `${x + 10}px`;
        genreContainer.style.top = `${y + 10}px`;
        genreContainer.style.transform = "translateX(-100%)";
        
        genreContainer.classList.toggle("hidden");

        genreList.forEach(genre => {
            genre.addEventListener("click", () => {
                window.location.hash = `genre/${genre.dataset.id}`;
            });
        });

    });
    seasonBtn.addEventListener("click", () => {
        const selectedSeason = document.getElementById('season').value;
        const selectedYear = document.getElementById('year').value;

        window.location.hash = `release/${selectedSeason}&${selectedYear}`;
    })
}
