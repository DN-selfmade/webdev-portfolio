"use strict"
import { getAnimeById } from "../api/jikan.js";

export async function renderRatingView(mediaId) {

    const animeById = await getAnimeById("anime", mediaId);
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const ratingOptions = document.querySelector(".rating__value");
    const ratedAnime = document.querySelector('.rating__anime');
    const saveBtn = document.getElementById('submit-btn');
    
    statusRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'seen') {
                ratingOptions.classList.remove('hidden');
            } else if (!(radio.value === 'seen')) {
                ratingOptions.classList.add('hidden');
            }

            switch (radio.value) {
                case 'seen':
                    ratedAnime.dataset.status = 'seen';
                    break;

                case 'watching':
                    ratedAnime.dataset.status = 'watching';
                    break;

                case 'watchlist':
                    ratedAnime.dataset.status = 'watchlist';
                    break;

                case 'dropped':
                    ratedAnime.dataset.status = 'dropped';
                    break;
            
                default:
                    break;
            }
        });
    });

    saveBtn.addEventListener('click', (e) => {
        e.preventDefault;
        
    });

    console.log(animeById)

    checkAnime(animeById);



}

function checkAnime({images, title}) {
    const animeImg = document.querySelector(".rating__image");
    const animeTitle = document.querySelector(".rating__title-anime");

    animeImg.src = images.jpg.image_url;
    animeTitle.textContent = title;
}