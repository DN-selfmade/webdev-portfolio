"use strict"

const loadButton = document.getElementById("laden1");
const userList = document.getElementById("liste1");

fetch("https://jsonplaceholder.typicode.com/users")
.then(response => {
    if (!response.ok) throw new Error("Fehlerhafte Antwort.");
    return response.json()
})
.then(data => {
    loadButton.addEventListener("click", () => {
        data.forEach(user => {
            const newLi =  document.createElement("li");
            newLi.innerHTML = `<strong>Name: </strong>${user.name} <strong>E-Mail: </strong>${user.email} <strong>City: </strong>${user.address.city}`;
            userList.appendChild(newLi);
        });
    })
})
.catch(err => console.error("Fehler: ", err));