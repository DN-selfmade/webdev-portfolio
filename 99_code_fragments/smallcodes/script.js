"use strict"

const formButton = document.querySelector(".form__button");

formButton.addEventListener("click", () => {
    let inputText1 = document.getElementById("inputText-one");
    alert(inputText1.value);
    if (!(inputText1.value === "")) {
        inputText1.value = "";
    }
});