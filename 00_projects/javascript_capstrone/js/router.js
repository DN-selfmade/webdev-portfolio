"use strict";
import { eventCardUrl } from "./dom/renderDetails.js";

export async function handleRoute() {
    const hash = window.location.hash.slice(1);
    const [mediaType, mediaId] = hash.split("/");
    const main = document.getElementById("main");
    const homeActive = document.getElementById("home_nav");
    const watchlogActive = document.getElementById("watchlog_nav");

    try {
        const res = await fetch(`./view/${hash}.html`);
        const html = await res.text();
        main.innerHTML = html;

        if (mediaType === "anime" && mediaId) {
            const { renderAnimeDetails } = await import("./views/details.js");
            await renderAnimeDetails(mediaId);
        } else if (mediaType === "anime") {
            const { renderAnimeView } = await import("./views/anime.js");
            await renderAnimeView(); 
        } else if (mediaType === "movie") {
            // renderMovieDetails(mediaId)
        } else if (mediaType === "home") {
            const { renderIndexView } = await import("./views/home.js");
            await renderIndexView();
        } else if (mediaType === "watchlog") {
            const { renderWatchlogView } = await import("./views/watchlog.js");
            await renderWatchlogView();
        } else if (mediaType === "") {
            window.location.hash = "home"
        }
        eventCardUrl();
    } catch (err) {
        main.innerHTML = "<p>View konnte nicht geladen werden.</p>";
        console.error("Fehler beim Laden des Views:", err);
    }
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
}