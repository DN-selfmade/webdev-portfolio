"use strict"
import { getAnimeById } from "../api/jikan.js";
import { renderAnimeDetails } from "../dom/renderDetails.js";

export async function renderAnimeDetailsView(mediatype, mediaId) {
    const headLogo = document.getElementById("head_logo")
    const container = document.querySelector(".main__page");

    headLogo.dataset.status = "details";
    const animeById = await getAnimeById(mediatype, mediaId);

    console.log(animeById);

    const anime = await renderAnimeDetails(animeById);

    container.appendChild(anime);
};