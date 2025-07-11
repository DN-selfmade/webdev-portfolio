"use strict"

export function renderAnime({ title, images}) {
    const div = document.createElement("div");
    div.className = "media-card-list";
    
    div.innerHTML = `
    <img src="${images.jpg.image_url}" alt="${title}">
    <h3>${title}</h3>
    `;
    return div;

}