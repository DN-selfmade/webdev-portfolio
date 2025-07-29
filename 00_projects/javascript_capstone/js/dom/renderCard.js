"use strict"
import { checkAnimeCard } from "../logic/rating.js";
import { getAnimeById } from "../api/jikan.js";
import { deleteAnime } from "../storage/watchlog.js";

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

export async function renderWatchlog(anime) {
    const divMain = document.createElement("div");
    const divAnime = document.createElement("div");
    const divInfo = document.createElement("div");
    const animeImg = document.createElement("img");
    const animeTitle = document.createElement("h1");
    const animeType = document.createElement("div");
    const watchlogStatus = document.createElement("div");
    const watchlogOptions = document.createElement("div");
    const watchlogRelease = document.createElement("div");
    
    const watchlogNav = document.getElementById("watchlog_nav");
    const animeById = await getAnimeById("anime", Number(anime.id));

    divMain.classList = "card__watchlog";
    divAnime.classList = "watchlog__anime";
    divInfo.classList = "watchlog__info";
    animeTitle.classList = "watchlog__title";
    animeImg.classList = "watchlog__image";
    animeType.classList = "watchlog__type";
    watchlogStatus.classList = "watchlog__status";
    watchlogOptions.classList = "watchlog__options";
    watchlogRelease.classList = "watchlog__release";

    animeTitle.textContent = animeById.title;
    animeImg.src = animeById.images.jpg.image_url;
    watchlogOptions.textContent = "•••";

    divMain.dataset.status = anime.status;


    divAnime.addEventListener("click", () => {
        window.location.hash = `anime/${anime.id}`;
        watchlogNav.classList.remove("active__nav");
    })

    

    switch (animeById.type.toUpperCase()) {
        case "TV":
            animeType.textContent = `Anime`;
            break;
        
        case "MOVIE":
            animeType.textContent = `Film`;
            break;
        
        case "OVA":
            animeType.textContent = `OVA`;
            break;
    
        case "SPECIAL":
            animeType.textContent = `Spezial`;
            break;
        
        case "ONA":
            animeType.textContent = `ONA`;
            break;

        case "MUSIC":
            animeType.textContent = `Musik`;
            break;
        
        default:
            break;
    }

    if (animeById.year && animeById.season) {
        switch (animeById.season.toLowerCase()) {
            case 'winter':
                watchlogRelease.textContent = `Winter\n${animeById.year}`;
                break;

            case 'summer':
                watchlogRelease.textContent = `Sommer\n${animeById.year}`;
                break;

            case 'fall':
                watchlogRelease.textContent = `Herbst\n${animeById.year}`;
                break;

            case 'spring':
                watchlogRelease.textContent = `Frühling\n${animeById.year}`;
                break;
        
            default:
                break;
        }
    } else { 
        const releaseWithTime = animeById.aired.from.split("T");
        const release = releaseWithTime[0];
        const [releaseYear, releaseMonth, releaseDay] = release.split("-");

        watchlogRelease.textContent = `${releaseDay}.${releaseMonth}.\n${releaseYear}`;
    }
    
    if (anime.status === "seen") {
        const watchlogSeenDate = document.createElement("div");
        watchlogSeenDate.classList = "watchlog__watched";
        const watchlogSeen = document.createElement("span");
        watchlogSeen.classList = "watchlog__date";
        const [year, month, day]  = anime.watchedDate.split("-");

        watchlogSeen.textContent = `${day}.${month}.\n${year}`;

        divInfo.appendChild(animeType);
        divInfo.appendChild(watchlogRelease);
        watchlogSeenDate.appendChild(watchlogSeen);
        divInfo.appendChild(watchlogSeenDate);
        watchlogStatus.appendChild(watchlogOptions);

        const watchedCounter = document.createElement("div");
        const watchedOperator = document.createElement("div");
        const watchedRwatch = document.createElement("div");

        watchedCounter.classList = "watched__counter";
        watchedOperator.classList = "watchlog__operator";
        watchedRwatch.classList = "watchlog__rewatch";

        watchedOperator.textContent = "+";
        watchedRwatch.textContent = anime.rewatchCount;

        watchedCounter.appendChild(watchedOperator);
        watchedCounter.appendChild(watchedRwatch);

        watchedOperator.addEventListener("click", () => {
            const id = anime.id;
            const data = JSON.parse(localStorage.getItem("myAnimeData")) || { animes: [] };
            const index = data.animes.findIndex(a => String(a.id) === String(id));

            if (index !== -1) {
                const entry = data.animes[index];
                entry.rewatchCount = (entry.rewatchCount || 0) + 1;
                localStorage.setItem("myAnimeData", JSON.stringify(data));
                watchedRwatch.textContent = entry.rewatchCount;
            } 
            
        })

        watchlogStatus.appendChild(watchedCounter);

    } else if (anime.status === "watchlist") {
        const watchlogDelete = document.createElement("div");
        watchlogDelete.classList = "watchlog__delete";
        watchlogDelete.textContent = "X";

        divInfo.appendChild(animeType);
        divInfo.appendChild(watchlogRelease);
        watchlogStatus.appendChild(watchlogOptions);
        watchlogStatus.appendChild(watchlogDelete);

        watchlogDelete.addEventListener("click", () => {
            divMain.remove();
            deleteAnime(anime.id);
        });
    } else {
        divInfo.appendChild(animeType);
        divInfo.appendChild(watchlogRelease);
        watchlogStatus.appendChild(watchlogOptions);
    }

    watchlogOptions.addEventListener("click", () => {
        window.location.hash = `rating/${anime.id}`;
        watchlogNav.classList.remove("active__nav");
    });

    
    
    divAnime.appendChild(animeImg);
    divAnime.appendChild(animeTitle);

    
    
    divInfo.appendChild(watchlogStatus);

    divMain.appendChild(divAnime);
    divMain.appendChild(divInfo);

    return divMain;
}