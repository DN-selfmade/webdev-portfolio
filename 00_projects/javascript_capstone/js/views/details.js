"use strict"
import { getAnimeById } from "../api/jikan.js";
import { renderAnimeDetails } from "../dom/renderDetails.js";

export async function renderAnimeDetailsView(mediatype, mediaId) {
    const container = document.querySelector(".main__page");

    const animeById = await getAnimeById(mediatype, mediaId);

    console.log(animeById);

    const anime = await renderAnimeDetails(animeById);

    container.appendChild(anime);
};