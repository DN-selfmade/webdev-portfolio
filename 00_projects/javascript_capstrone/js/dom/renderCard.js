"use strict"

export function renderAnime({title, images, mal_id}) {
    const div = document.createElement("div");
    div.className = "media__card";
    div.dataset.value = mal_id;
    div.dataset.text = "anime"
    
    div.innerHTML = `
    <img class="card__img" src="${images.jpg.image_url}" alt="${title}">
    <h3 class="card__title">${title}</h3>
    `;
    return div;

}