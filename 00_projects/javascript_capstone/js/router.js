"use strict"
import { eventCardUrl } from "./dom/renderDetails.js";
export let hashType;
export let hashId;

export async function handleRoute() {
    const hash = window.location.hash.slice(1);
    const [mediaTypePage, mediaId] = hash.split("/");
    const [mediaType, page] = mediaTypePage.split("&")
    const main = document.getElementById("main");
    const homeActive = document.getElementById("home_nav");
    const watchlogActive = document.getElementById("watchlog_nav");
    const headLogo = document.getElementById("head_logo");
    navbarActiveToggle(mediaType, homeActive, watchlogActive);
    hashType = mediaType;
    hashId = mediaId;

    try {
        let res; 

        headLogo.dataset.status = "";
        if (mediaType === "anime" && mediaId) {
            const { renderAnimeDetailsView } = await import("./views/details.js");
            res = await fetch("./view/details.html");
            
            main.innerHTML = await res.text();
            await renderAnimeDetailsView(mediaType, mediaId);

        } else if (mediaType === "anime") {
            const { renderAnimeView } = await import("./views/anime.js");
            res = await fetch(`./view/${mediaType}.html`);
            main.innerHTML = await res.text();
            await renderAnimeView(page);

        } else if (mediaType === "movie" && mediaId) {
            const { renderAnimeDetailsView } = await import("./views/details.js");
            res = await fetch("./view/details.html");
            main.innerHTML = await res.text();
            await renderAnimeDetailsView(mediaType, mediaId);

        } else if (mediaType === "movie") {
            const { renderMovieAnimeView } = await import("./views/anime.js");
            res = await fetch(`./view/anime.html`);
            main.innerHTML = await res.text();
            await renderMovieAnimeView(page);

        } else if (mediaType === "home") {
            const { renderIndexView } = await import("./views/home.js");
            res = await fetch(`./view/${hash}.html`);
            main.innerHTML = await res.text();
            await renderIndexView();

        } else if (mediaType === "watchlog") {
            const { renderWatchlogView } = await import("./views/watchlog.js");
            res = await fetch(`./view/${hash}.html`);
            main.innerHTML = await res.text();
            renderWatchlogView();

        } else if (mediaType === "search") {
            const { renderAnimeSearchInput } = await import("./views/anime.js");
            res = await fetch(`./view/anime.html`);
            main.innerHTML = await res.text();
            await renderAnimeSearchInput(mediaId, page);

        } else if (mediaType === "type") {
            const { renderAnimeSearchType } = await import("./views/anime.js");
            res = await fetch(`./view/anime.html`);
            main.innerHTML = await res.text();
            await renderAnimeSearchType(mediaId, page);

        } else if (mediaType === "release") {
            const { renderAnimeSearchRelease } = await import("./views/anime.js");
            res = await fetch(`./view/anime.html`);
            main.innerHTML = await res.text();
            await renderAnimeSearchRelease(mediaId, page);

        } else if (mediaType === "genre") {
            const { renderAnimeSearchGenre } = await import("./views/anime.js");
            res = await fetch(`./view/anime.html`);
            main.innerHTML = await res.text();
            await renderAnimeSearchGenre(mediaId, page);

        } else if (mediaType === "top") {
            const { renderAnimeSearchTop } = await import("./views/anime.js");
            res = await fetch(`./view/anime.html`);
            main.innerHTML = await res.text();
            await renderAnimeSearchTop(page);

        } else if (mediaType === "upcoming") {
            const { renderAnimeSearchUpcoming } = await import("./views/anime.js");
            res = await fetch(`./view/anime.html`);
            main.innerHTML = await res.text();
            await renderAnimeSearchUpcoming(page);

        } else if (mediaType === "filter") {
            const { filter } = await import("./logic/filter.js");
            res = await fetch(`./view/filter.html`);
            main.innerHTML = await res.text();
            filter();

        } else if (mediaType === "rating" && mediaId) {
            const { renderRatingView } = await import("./logic/rating.js");
            res = await fetch(`./view/rating.html`);
            main.innerHTML = await res.text();
            renderRatingView(mediaId);

        } else if (mediaType === "") {
            window.location.hash = "home";
        } else if (mediaType === "clearlocalstorage") {
            localStorage.clear();
        }

        eventCardUrl();

    } catch (err) {
        main.innerHTML = "<p>View konnte nicht geladen werden.</p>";
        console.error("Fehler beim Laden des Views:", err);
    }
    
    headLogoToggle();
}


// Toggle-function for NavBar-Element Active.
function navbarActiveToggle(mediaType, homeActive, watchlogActive) {
    if (mediaType === "home") {
        homeActive.classList.add("active__nav")
    } else if (mediaType === "watchlog") {
        watchlogActive.classList.add("active__nav");
    } 
    if (!(mediaType === "home")) {
        homeActive.classList.remove("active__nav");
    } else if (!(mediaType === "watchlog")) {
        watchlogActive.classList.remove("active__nav");
    } else {
        homeActive.classList.remove("acitve__nav");
        watchlogActive.classList.remove("active__nav");
    }
};

// Toggle-function for Visibility of Watchlog X Logo
export function headLogoToggle() {
    const hash = window.location.hash.slice(1);
    const mediaId = hash.split("/")[1];
    const headLogo = document.getElementById("head_logo");

    if (!(headLogo.dataset.status === "details" || headLogo.dataset.status === "seen" || headLogo.dataset.status === "watching" || headLogo.dataset.status === "watchlist" || headLogo.dataset.status === "dropped")) {
        headLogo.classList.add("hidden-logo");
        if (headLogo.classList.contains("hidden")) headLogo.classList.remove("hidden");
    } else {
        if (headLogo.classList.contains("hidden")) {
            headLogo.classList.remove("hidden");
        } else if (headLogo.classList.contains("hidden-logo")) {
            headLogo.classList.remove("hidden-logo");
        }
    }
};