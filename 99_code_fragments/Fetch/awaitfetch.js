 "use strict"

 const loadButton2 = document.getElementById("laden2");
 const userList2 = document.getElementById("liste2");

 async function loadData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (fehler) {
        console.error("Fehler beim Laden: ", fehler.message);
        alert("Fehler beim laden, bitte versuche es später erneut.")
    }
 }

 async function fillList() {
    const data = await loadData();
    if (!data) return;
    data.forEach(user => {
        const newLi = document.createElement("li");
        newLi.innerHTML = `<strong>Name: </strong>${user.name} <strong>E-Mail: </strong>${user.email} <strong>City: </strong>${user.address.city}`;
        userList2.appendChild(newLi);
    });
 }


 loadButton2.addEventListener("click", () => {
    fillList();
 })