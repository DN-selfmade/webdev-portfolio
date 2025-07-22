"use strict"
import { handleRoute, headLogoToggle } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {

   const searchBtn = document.getElementById("search-btn");
   const searchInput = document.getElementById("search-txt");
   const navbar = document.querySelector(".navbar");
   const homeNav = document.getElementById("home_nav");
   const watchlogNav = document.getElementById("watchlog_nav");
   const headLogo = document.getElementById("head_logo");

   handleRoute(); // at start
   window.addEventListener("hashchange", handleRoute); // while navigation

   searchBtn.addEventListener("click", () => {  // enable to search media with text.
      searchInput.classList.remove("hidden");
      searchInput.focus();
      searchBtn.classList.add("hidden");
      navbar.classList.add("hidden");
      homeNav.classList.add("hidden");
      watchlogNav.classList.add("hidden");
      headLogo.classList.add("hidden");
   });

   searchInput.addEventListener("blur", () => { // disable searching media with text
      searchInput.classList.add("hidden");
      searchBtn.classList.remove("hidden");
      navbar.classList.remove("hidden");
      homeNav.classList.remove("hidden");
      watchlogNav.classList.remove("hidden");
      headLogoToggle();
   });

   searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
         window.location.hash = `search/${searchInput.value}`;
      }
   })
});