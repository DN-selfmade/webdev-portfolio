"use strict"
import { eventCardUrl } from "./dom/renderDetails.js";

export async function handleRoute() {
    const hash = window.location.hash.slice(1);
    const [mediaType, mediaId] = hash.split("/");
    const main = document.getElementById("main");
    const homeActive = document.getElementById("home_nav");
    const watchlogActive = document.getElementById("watchlog_nav");
    const headLogo = document.getElementById("head_logo");

    try {
        let res; 

        if (mediaType === "anime" && mediaId) {
            const { renderAnimeDetailsView } = await import("./views/details.js");
            res = await fetch("./view/details.html");
            main.innerHTML = await res.text();
            await renderAnimeDetailsView(mediaType, mediaId);

        } else if (mediaType === "anime") {
            const { renderAnimeView } = await import("./views/anime.js");
            res = await fetch(`./view/${hash}.html`);
            main.innerHTML = await res.text();
            await renderAnimeView();

        } else if (mediaType === "movie" && mediaId) {
            const { renderAnimeDetailsView } = await import("./views/details.js");
            res = await fetch("./view/details.html");
            main.innerHTML = await res.text();
            await renderAnimeDetailsView(mediaType, mediaId);

        } else if (mediaType === "movie") {
            const { renderMovieAnimeView } = await import("./views/anime.js");
            res = await fetch(`./view/anime.html`);
            main.innerHTML = await res.text();
            await renderMovieAnimeView();

        } else if (mediaType === "home") {
            const { renderIndexView } = await import("./views/home.js");
            res = await fetch(`./view/${hash}.html`);
            main.innerHTML = await res.text();
            await renderIndexView();

        } else if (mediaType === "watchlog") {
            const { renderWatchlogView } = await import("./views/watchlog.js");
            res = await fetch(`./view/${hash}.html`);
            main.innerHTML = await res.text();
            await renderWatchlogView();

        } else if (mediaType === "") {
            window.location.hash = "home";
        }

        eventCardUrl();

    } catch (err) {
        main.innerHTML = "<p>View konnte nicht geladen werden.</p>";
        console.error("Fehler beim Laden des Views:", err);
    }
    navbarActiveToggle(mediaType, homeActive, watchlogActive);
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
    }
};

// Toggle-function for Visibility of Watchlog X Logo
export function headLogoToggle() {
    const hash = window.location.hash.slice(1);
    const mediaId = hash.split("/")[1];
    const headLogo = document.getElementById("head_logo");

    if (mediaId === undefined) {
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