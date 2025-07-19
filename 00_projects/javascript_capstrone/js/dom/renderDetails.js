"use strict"

export function eventCardUrl() {
    const cards = document.querySelectorAll(".media__card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const hash = window.location.hash.slice(1);
            const [mediaType, mediaId] = hash.split("/");
            const type = card.dataset.text;
            const id = card.dataset.value;
            console.log(`hash: ${window.location.hash}\nmediatype: ${mediaType}\nmediaID: ${mediaId}\ntype: ${type}\nid: ${id}`)
      })
   })
}