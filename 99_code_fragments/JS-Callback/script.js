"use strict"

const trainButton = document.querySelector(".main__button");
const trainText = document.querySelector(".main__paragraph");

function warmUP()  {
    trainText.textContent = "Callback wird trainiert, Aufwärmung läuft";

    const intervalStart = setInterval(() => {
        trainText.textContent = trainText.textContent + ".";
    }, 500);

    setTimeout(() => {
        clearInterval(intervalStart);
        trainText.textContent = "Aufwärmung abgeschlossen.";
    }, 2000);
}

function train() {
    trainText.textContent = "Callback wird trainiert, Training läuft";
    const intervalEnd = setInterval(() => {
        trainText.textContent = trainText.textContent + ".";
    }, 500);

    setTimeout(() => {
        clearInterval(intervalEnd);
        trainText.textContent = "Training abgeschlossen."
    }, 2000);
}

trainButton.addEventListener("click", () => {
    warmUP();
    setTimeout(() => {
        train();
    }, 10000);
});