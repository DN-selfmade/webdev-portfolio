"use strict"

const setVhUnit = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', setVhUnit);
window.addEventListener('orientationchange', setVhUnit);
setVhUnit();


document.addEventListener ("DOMContentLoaded",  () => {
    let buttonCount = document.getElementById("count")
    let buttonReset = document.getElementById("reset")
    let count = document.getElementById("output")

    buttonCount.addEventListener("click", () => {
        if (parseInt(count.innerText) >= 0) {
            let num = parseInt(count.innerText)
            num++
            count.innerText = num
            }
        else {
            count.innerText = "0"
            alert("Something went wrong with, to prevent an error the counter does a reset.")
        }
    })

    buttonReset.addEventListener("click", () => {
        count.innerText = "0"
    })
})