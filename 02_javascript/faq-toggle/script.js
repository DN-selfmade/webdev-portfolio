"use strict"

function setVhUnit() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('DOMContentLoaded', () => {
  setVhUnit();
  window.addEventListener('resize', setVhUnit);

  const togglers = document.querySelectorAll(".fa-solid");

  togglers.forEach(toggler => {
    toggler.addEventListener("click", () => {
      const content = toggler.closest(".content__faq").querySelector(".faq__content");
      const contentHeader = toggler.closest(".content__faq").querySelector(".faq__header");

      if (content.classList.contains("open") && contentHeader.classList.contains("open")) {
        content.style.maxHeight = "0px";
        content.style.opacity = "0";
        content.style.transform = "translateY(-1rem)";
        content.classList.remove("open");
        contentHeader.classList.remove("open")
        contentHeader.classList.add("closing")
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
        content.classList.add("open");
        contentHeader.classList.remove("closing")
        contentHeader.classList.add("open")
      }
    });
  });
});