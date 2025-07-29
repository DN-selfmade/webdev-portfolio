"use strict"

import { getAllAnimes } from "../storage/watchlog.js";
import { renderWatchlog } from "../dom/renderCard.js";

function createList() {

}

export async function renderWatchlogView() {
    const watchlogList = document.querySelector('.watchlog__list');
    const animesInStorage = getAllAnimes();
    const filterRadios = document.querySelectorAll('input[name="filter"]');
    const cards = [];

    for (const anime of animesInStorage) {
        const card = await renderWatchlog(anime);
        watchlogList.appendChild(card);
        cards.push(card);
    }

    filterRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.id === "watchlist") {
                cards.forEach(card => {
                    if (!(card.dataset.status === "watchlist")) {
                        card.classList.add("hidden");
                    }  
                    if (card.dataset.status === "watchlist") {
                        card.classList.remove("hidden");
                    }
                });
            } else if (radio.id === "seen") {
                cards.forEach(card => {
                    if (!(card.dataset.status === "seen")) {
                        card.classList.add("hidden");
                    }  
                    if (card.dataset.status === "seen") {
                        card.classList.remove("hidden");
                    }
                });
            } else if (radio.id === "watching") {
                cards.forEach(card => {
                    if (!(card.dataset.status === "watching")) {
                        card.classList.add("hidden");
                    }  
                    if (card.dataset.status === "watching") {
                        card.classList.remove("hidden");
                    }
                });
            } else if (radio.id === "dropped") {
                cards.forEach(card => {
                    if (!(card.dataset.status === "dropped")) {
                        card.classList.add("hidden");
                    }  
                    if (card.dataset.status === "dropped") {
                        card.classList.remove("hidden");
                    }
                });
            } else {
                cards.forEach(card => {
                    card.classList.remove("hidden");
                });
            }
        })        
    });

}