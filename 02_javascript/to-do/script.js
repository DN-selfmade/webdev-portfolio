"use strict";

// Variable with a path of Empty checkbox SVG
const checkboxEmpty = `
<svg class="checkbox__svg" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352z"/>
</svg>
`;

// Variable with a path of Checked checkbox SVG
const checkboxChecked = `
<svg class="checkbox__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
  <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-43.8 130.8l-184 184c-4.7 4.7-12.3 4.7-17 0l-104-104c-4.7-4.7-4.7-12.3 0-17l28.3-28.3c4.7-4.7 12.3-4.7 17 0L176 270.1l150.5-150.5c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17z"/>
</svg>
`;

// Variable for Text input to create a new task
const taskInput = document.getElementById("js-task-input");

// Variable for the KeyCode of "Enter"
const KEY_ENTER = 13;

// Variable for done-tasks "clear"-Button
const clearButton = document.getElementById("done__button");


/**
 * This function change by hover the checkbox icon on open tasks.
 */
function applyCheckboxHover() {
if (window.matchMedia("(hover: hover)").matches) {
  const wrappers = document.querySelectorAll(".tasks__item__checkbox");

  wrappers.forEach((wrapper) => {
    if (wrapper.dataset.state === "empty") {
    wrapper.addEventListener("mouseenter", () => {
      wrapper.innerHTML = checkboxChecked;
    });
    wrapper.addEventListener("mouseleave", () => {
      wrapper.innerHTML = checkboxEmpty;
    })};
  });
}

document.getElementsByClassName("content__textinput")[0].addEventListener("submit", (event) => {
    event.preventDefault();
});
};

/**
 * let the deltet Button delete his LI-Parent and place  a placeholder if needed.
 */
function applyDeleteButton(deleteButton) {
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement.remove();
        const doneList = document.querySelector(".tasks__list--done").querySelectorAll(".tasks__item");
        
        if (doneList.length === 0) {
            placeholder()
        }        
    });
};

/**
 * allow the use to mark the Task as done and move it to the "done"-list.
 */
function toggleTaskState(checkbox) {
  checkbox.addEventListener("click", () => {
    const sourceLi = checkbox.parentElement;
    const doneList = document.querySelector(".tasks__list--done");
    const openList = document.querySelector(".tasks__list--heading");

    const isDone = sourceLi.parentElement.classList.contains("tasks__list--done");

    if (isDone) {
      checkbox.innerHTML = checkboxEmpty;
      openList.appendChild(sourceLi);
    } else {
      checkbox.innerHTML = checkboxChecked;
      doneList.appendChild(sourceLi);
    }

    placeholder();
  });
}


function placeholder() {
  const doneList = document.querySelector(".tasks__list--done");
  const items = doneList.querySelectorAll(".tasks__item:not(.tasks__item--empty)");
  const placeholderItem = doneList.querySelector(".tasks__item--empty");

  if (items.length === 0 && !placeholderItem) {
    const li = document.createElement("li");
    li.classList.add("tasks__item", "tasks__item--empty");

    const p = document.createElement("p");
    p.classList.add("tasks__item__text--empty");
    p.innerText = 'Your "done"-list is empty!';

    li.appendChild(p);
    doneList.appendChild(li);
  }

  if (items.length > 0 && placeholderItem) {
    placeholderItem.remove();
  }
}


/**
 * This function adds a new liElement as a task and resets the input.value to "".
 */
document.addEventListener("keydown", (event) => {
    if (event.keyCode === KEY_ENTER && taskInput.value === "") {
        alert("Please enter a Task")
    }
    else if (event.keyCode === KEY_ENTER) {
        const liElement = document.createElement("li");
        const iElement = document.createElement("i");
        const pContentElement = document.createElement("p");
        const pDeleteElement = document.createElement("p");

        liElement.classList.add("tasks__item");

        iElement.classList.add("tasks__item__checkbox");
        iElement.dataset.state = "empty";

        pContentElement.classList.add("tasks__item__text");

        pDeleteElement.classList.add("tasks__item__delete");
        applyDeleteButton(pDeleteElement);

        iElement.innerHTML = checkboxEmpty;
        toggleTaskState(iElement);

        pContentElement.innerText = taskInput.value;

        pDeleteElement.innerHTML = "&#10006;";

        liElement.appendChild(iElement);
        liElement.appendChild(pContentElement);
        liElement.appendChild(pDeleteElement);

        document.getElementsByClassName("tasks__list--heading")[0].appendChild(liElement);

        taskInput.value = "";
        applyCheckboxHover()
    }
});

/**
 * This function will remove alle done Tasks and add a placeholder task.
 * Including a small style change for a clickevent of the done-button!
 */

clearButton.addEventListener("click", () => {
    clearButton.classList.add("done__button--clicked");
    const doneTasks = document.querySelectorAll(".tasks__list--done .tasks__item");

    doneTasks.forEach((doneTask) => {
        doneTask.remove();
        
    });
    const liElement = document.createElement("li");
    const pContentElement = document.createElement("p");

    liElement.classList.add("tasks__item", "tasks__item--empty");

    pContentElement.innerText = 'Your "done"-list is empty!';
    pContentElement.classList.add("tasks__item__text--empty");

    liElement.appendChild(pContentElement);

    document.getElementsByClassName("tasks__list--done")[0].appendChild(liElement);
    setTimeout(() => {
        clearButton.classList.remove("done__button--clicked");
    }, 100);
});

