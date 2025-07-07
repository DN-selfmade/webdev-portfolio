"use strict"

const cards = document.querySelectorAll(".card");
const dropzone = document.querySelector(".dropzone");
const cardsZone =  document.querySelector(".cards");
let draggedCard;

cards.forEach((card) => {
    card.addEventListener("dragstart", (event) => {
        draggedCard = event.currentTarget;
    })
});

dropzone.addEventListener("dragover", e => e.preventDefault());
dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.appendChild(draggedCard);
});

cardsZone.addEventListener("dragover", e => e.preventDefault());
cardsZone.addEventListener("drop", (event) => {
    event.preventDefault();
    cardsZone.appendChild(draggedCard);
});