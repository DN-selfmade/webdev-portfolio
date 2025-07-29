"use strict"
import { getAnimeById } from "../api/jikan.js";
import { setAnimeForStorage, addOrUpdateAnimeEntry, getStorageAnimeById } from "../storage/watchlog.js";

export async function renderRatingView(mediaId) {

    const animeById = await getAnimeById("anime", mediaId);
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const ratingOptions = document.querySelector(".rating__value");
    const ratedAnime = document.querySelector('.rating__anime');
    const saveBtn = document.getElementById('submit-btn');
    const today = new Date().toISOString().split('T')[0];
    
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
        const status = document.querySelector('input[name="status"]:checked')?.value;
        const character = document.querySelector('input[name="character"]:checked')?.value;
        const story = document.querySelector('input[name="story"]:checked')?.value;
        const atmosphere = document.querySelector('input[name="atmosphere"]:checked')?.value;
        const animation = document.querySelector('input[name="animation"]:checked')?.value;
        const music = document.querySelector('input[name="music"]:checked')?.value;
        const comment = document.getElementById('comment').value.trim();
        const watchedDate = document.getElementById('date').value;
        const score = animeRatingScore(character, story, atmosphere, animation, music);
        let anime;
        
        if (status === "seen") {
            const errInput = [];
            if (!character) {
                errInput.push('Bewertung für "Charakter" muss ausgefüllt sein.');
            }
            if (!story) {
                errInput.push('Bewertung für "Story" muss ausgefüllt sein.');
            }
            if (!atmosphere) {
                errInput.push('Bewertung für "Atmosphäre" muss ausgefüllt sein.');
            }
            if (!animation) {
                errInput.push('Bewertung für "Animation" muss ausgefüllt sein.');
            }
            if (!music) {
                errInput.push('Bewertung für "Soundtrack" muss ausgefüllt sein.');
            }
            if (!comment) {
                errInput.push('Bitte gib einen Kommentar ab.');
            }

            if (errInput.length > 0) {
                alert(errInput.join('\n'));
            } else {
                alert(`Vielen dank für die Bewertung, dein Score lautet: ${score}`);
                anime = setAnimeForStorage(
                    mediaId, 
                    status, 
                    character, 
                    story, 
                    atmosphere, 
                    animation, 
                    music, 
                    score, 
                    comment, 
                    watchedDate, 
                    1);
            }
        } else {
            alert(`Gespeichert.`);
            anime = setAnimeForStorage(mediaId, status);
        }
        addOrUpdateAnimeEntry(anime);
    });

    document.getElementById('date').value = today;

    checkAnime(animeById, mediaId);
    if (ratedAnime.dataset.status === "seen") {
        ratingOptions.classList.remove("hidden")
    }



}

function checkAnime({images, title}, mediaId) {
    const animeImg = document.querySelector(".rating__image");
    const animeTitle = document.querySelector(".rating__title-anime");
    const animeHeadStatus = document.querySelector('.rating__anime');
    const characters = document.querySelectorAll('input[name="character"]');
    const storys = document.querySelectorAll('input[name="story"]');
    const atmospheres = document.querySelectorAll('input[name="atmosphere"]');
    const animations = document.querySelectorAll('input[name="animation"]');
    const musics = document.querySelectorAll('input[name="music"]');
    const comment = document.getElementById('comment');
    const watchedDate = document.getElementById('date');
    const anime = getStorageAnimeById(mediaId);
    const statusRadios = document.querySelectorAll('input[name="status"]');

    if (!anime) {
        animeHeadStatus.dataset.status = "watchlist";
        statusRadios.forEach(radio => {
            radio.checked = radio.value === "watchlist";
        });
    } else {
        animeHeadStatus.dataset.status = anime.status;
        statusRadios.forEach(radio => {
            radio.checked = radio.value === anime.status;
        });

        characters.forEach(char => char.checked = char.value === anime.extras.categories.characters);
        storys.forEach(story => story.checked = story.value === anime.extras.categories.story);
        atmospheres.forEach(atmo => atmo.checked = atmo.value === anime.extras.categories.atmosphere);
        animations.forEach(ani => ani.checked = ani.value === anime.extras.categories.animation);
        musics.forEach(music => music.checked = music.value === anime.extras.categories.music);
        comment.value = anime.extras.comment;
        watchedDate.value = anime.watchedDate;
    }

    animeImg.src = images.jpg.image_url;
    animeTitle.textContent = title;
}

function animeRatingScore (character, story, atmosphere, animation, music) {
    let num1 = character * 0.25;
    let num2 = story * 0.25;
    let num3 = atmosphere * 0.15;
    let num4 = animation * 0.25;
    let num5 = music * 0.1;
 
    let sum = num1 + num2 + num3 + num4 + num5;

    let score = Math.round(sum * 10) / 10;

    return score;
}

export function checkAnimeCards(cards) {
    cards.forEach(card => {
        const anime = getStorageAnimeById(card.dataset.value);
        if (anime) {
            card.dataset.status = anime.status;
        }
    })
}

export function checkAnimeCard(card) {
    const anime = getStorageAnimeById(card.dataset.value);
    if (anime) {
        card.dataset.status = anime.status;
    }
}