"use strict"
import { handleRoute } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
   handleRoute(); // beim Start
   window.addEventListener("hashchange", handleRoute); // beim Navigieren

   const searchBtn = document.getElementById("search-btn");
   const searchInput = document.getElementById("search-txt");
   const navbar = document.querySelector(".navbar");
   const homeNav = document.getElementById("home_nav");
   const watchlogNav = document.getElementById("watchlog_nav");
   const headLogo = document.getElementById("head_logo");

   searchBtn.addEventListener("click", () => {
      searchInput.classList.remove("hidden");
      searchInput.focus();
      searchBtn.classList.add("hidden");
      navbar.classList.add("hidden");
      homeNav.classList.add("hidden");
      watchlogNav.classList.add("hidden");
   });

   searchInput.addEventListener("blur", () => {
      searchInput.classList.add("hidden");
      searchBtn.classList.remove("hidden");
      navbar.classList.remove("hidden");
      homeNav.classList.remove("hidden");
      watchlogNav.classList.remove("hidden");
   });
   
   headLogo.addEventListener("click", () => {
      window.location.hash = "home";
   });
});
