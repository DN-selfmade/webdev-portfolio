"use strict"
import { 
    getCurrentAnime, 
    getCurrentAnimeMovies, 
    getSearchAnimeGenre, 
    getSearchAnimeInput, 
    getSearchAnimeRelease, 
    getSearchAnimeType, 
    getSearchAnimeTop,
    getSearchAnimeUpcoming,
    currentPage,
    lastPage
} from "../api/jikan.js";
import { renderAnime } from "../dom/renderCard.js";
import { animeTvFilter, animeMovieFilter, animeDoubleFilter } from "../logic/filter.js";
import { checkAnimeCard } from "../logic/rating.js";
import { hashType, hashId } from "../router.js";

function showPages() {
    const pages = document.querySelectorAll(".pageNum");
    const latestPages = document.querySelectorAll(".lastPageNum");
    const oneLefts = document.querySelectorAll(".oneLeft");
    const oneRights = document.querySelectorAll(".oneRight");
    const allLefts = document.querySelectorAll(".allLeft");
    const allRights = document.querySelectorAll(".allRight");

    pages.forEach(page => {
        page.textContent = currentPage;
    });

    latestPages.forEach(latestPage => {
        latestPage.textContent = lastPage;
    });

    oneLefts.forEach(oneLeft => {
        if (currentPage === 1) {
            const blockLeft = document.querySelectorAll(".num__page-left");
            blockLeft.forEach(left => left.classList.add("hidden-pageArrow"));
        } else {
            oneLeft.addEventListener("click", () => {
                let previousPage = currentPage - 1;
                if (hashId === undefined) {
                    window.location.hash = `${hashType}&${previousPage}`;
                } else {
                    window.location.hash = `${hashType}&${previousPage}/${hashId}`;
                }
                
            });
        }
    });
    oneRights.forEach(oneRight => {
        if (currentPage === lastPage) {
            const blockRight = document.querySelectorAll(".num__page-right");
            blockRight.forEach(right => right.classList.add("hidden-pageArrow"));
        } else {
            oneRight.addEventListener("click", () => {
                let nextPage = currentPage + 1;
                if (hashId === undefined) {
                    window.location.hash = `${hashType}&${nextPage}`;
                } else {
                    window.location.hash = `${hashType}&${nextPage}/${hashId}`;
                }
                
            });
        }
    });
    allLefts.forEach(allLeft => {
            allLeft.addEventListener("click", () => {
                let firstPage = 1;
                if (hashId === undefined) {
                    window.location.hash = `${hashType}&${firstPage}`;
                } else {
                    window.location.hash = `${hashType}&${firstPage}/${hashId}`;
                }
                
            });
        });
    allRights.forEach(allRight => {
        
        
        allRight.addEventListener("click", () => {
            if (hashId === undefined) {
                window.location.hash = `${hashType}&${lastPage}`;
            } else {
                window.location.hash = `${hashType}&${lastPage}/${hashId}`;
            }
                
            
        })
    });
    
}

export async function renderAnimeView(page) {
    const container = document.getElementById("animeList");
    const anime = await getCurrentAnime(page);
    console.log(anime)
    const animes = animeTvFilter(anime);
    showPages();

    filterNavigation()

    for (let i = 0; i < animes.length; i++) {
        const element = animes[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

export async function renderMovieAnimeView(page) {
    const container = document.getElementById("animeList");
    const date = new Date();
    const year = date.getFullYear();
    
    filterNavigation()

    const anime = await getCurrentAnimeMovies(year, page);
    const animes = animeMovieFilter(anime);
    showPages();

    for (let i = 0; i < animes.length; i++) {
        const element = animes[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchInput(value, page) {
    const container = document.getElementById("animeList");
    const anime = await getSearchAnimeInput(value, page);
    showPages();
    filterNavigation()

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchType(value, page) {
    const container = document.getElementById("animeList");
    const anime = await getSearchAnimeType(value, page);
    showPages();
    filterNavigation()

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchRelease(value, page) {
    const container = document.getElementById("animeList");
    const anime = await getSearchAnimeRelease(value, page);
    showPages();
    filterNavigation()

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchGenre(value, page) {
    const container = document.getElementById("animeList");
    const anime = await getSearchAnimeGenre(value, page);
    showPages();
    filterNavigation()

    for (let i = 0; i < anime.length; i++) {
        const element = anime[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchTop(page) {
    const container = document.getElementById("animeList");
    const animes = await getSearchAnimeTop(page);
    showPages();
    filterNavigation()

    for (let i = 0; i < animes.length; i++) {
        const element = animes[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

export async function renderAnimeSearchUpcoming(page) {
    const container = document.getElementById("animeList");
    const anime = await getSearchAnimeUpcoming(page);
    const animes = animeDoubleFilter(anime);
    showPages();
    filterNavigation()



    for (let i = 0; i < animes.length; i++) {
        const element = animes[i];

        const card  = renderAnime(element);
        checkAnimeCard(card);
        container.appendChild(card);
    };
};

function filterNavigation() {
    const filterBtn = document.querySelector('.pageList__filter');

    filterBtn.addEventListener("click", () => {
        window.location.hash = "filter";
    });
}
