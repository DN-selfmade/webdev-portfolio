"use strict"
import { getAnimeById } from "../api/jikan.js";
import { renderAnimeDetails } from "../dom/renderDetails.js";

export async function renderAnimeDetailsView(mediaId) {
    const container = document.querySelector(".anime__page");

    const animeById = await getAnimeById(mediaId);
    console.log(animeById);
    const anime = await renderAnimeDetails(animeById);
    container.appendChild(anime);
}