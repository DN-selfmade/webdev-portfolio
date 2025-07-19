"use strict"

export function eventCardUrl() {
    const cards = document.querySelectorAll(".media__card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const type = card.dataset.text;
            const id = card.dataset.value;
            window.location.hash = `${type}/${id}`;
      })
   })
}

export async function renderAnimeDetails(anime) {
    const div = document.createElement("div");
    div.className = "anime__info";
    div.dataset.value = anime.mal_id;
    div.dataset.text = "anime"
    const genres = [];
    const pg = anime.rating.split("-")

    for (let i = 0; i < anime.genres.length; i++) {
        const element = anime.genres[i].name;
        genres.push(` ${element}`);    
    }

    div.innerHTML = `
    <img class="" src="${anime.images.jpg.image_url}" alt="${anime.title}">
    <h2 class="">${anime.title}</h2>
    <p>Typ: ${anime.type}</p>
    <p>Dauer pro Folge: ${anime.duration[0]}${anime.duration[1]} Minuten.</p>
    <p>Geplante Folgenanzahl: ${anime.episodes}</p>
    <p>Genres:${genres}</p>
    <p>Altersbeschränkung: ${pg[0]}-${pg[1]}</p>
    <p>Rating auf MyAnimeList: ${anime.score}/10</p>
    <p>Status: ${anime.status}
    <p>Anime-Season: ${anime.season}, ${anime.year}</p>
    <p>Studio: ${anime.studios[0].name}</p>
    <h3>Titeln: </h3>
    <p>
    Titel: ${anime.title}<br>
    Englischer Titel: ${anime.title_english}<br>
    Japanischer Titel: ${anime.title_japanese}
    </p>
    <p>Trailer: </p>
    <iframe width="400px" height="300px" src="https://www.youtube.com/embed/${anime.trailer.youtube_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;

    return div;
}