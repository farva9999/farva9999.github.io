// Import the functions you need from the SDKs you need
import { initializeApp } from "/__/firebase/10.1.0/firebase-app-compat.js";
import { getAnalytics } from "/__/firebase/10.1.0/firebase-analytics-compat.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGOD0_6NzfiX8ry4zt_c-yRUrGn12rMHg",
  authDomain: "wfhpilot.firebaseapp.com",
  projectId: "wfhpilot",
  storageBucket: "wfhpilot.appspot.com",
  messagingSenderId: "1081769478389",
  appId: "1:1081769478389:web:cfeb559316fe003162ddbc",
  measurementId: "G-JMN3S73Y94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener("DOMContentLoaded", function () {
  let todoItems = [];

  const todoForm = document.getElementById("new-todoform");
  const todoList = document.getElementById("todo-list");

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newTodoText = e.target.elements.content.value;
    addTodoItem(newTodoText);
    e.target.elements.content.value = "";
  });

  todoList.addEventListener("click", function (e) {
    if (e.target.className === "delete") {
      const todoItem = e.target.parentNode.parentNode;
      const index = Array.from(todoList.children).indexOf(todoItem);
      deleteTodoItem(index);
    }

    if (e.target.className === "edit") {
      const todoItem = e.target.parentNode.parentNode;
      const index = Array.from(todoList.children).indexOf(todoItem);
      const newTodoText = prompt("Enter new text");
      editTodoItem(index, newTodoText);
    }
  });

  function addTodoItem(text) {
    const newTodo = document.createElement("div");
    newTodo.innerHTML = `
            <label>
                <input type="checkbox" />
            </label>
            <div class="todo-content">
                <input type="text" value="${text}" readonly>
            </div>
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
    newTodo.classList.add("todo-item");
    todoList.appendChild(newTodo);
    todoItems.push(text);
  }

  function deleteTodoItem(index) {
    const todoItem = todoList.children[index];
    todoItem.parentNode.removeChild(todoItem);
    todoItems.splice(index, 1);
  }

  function editTodoItem(index, newText) {
    const todoItem = todoList.children[index];
    todoItem.querySelector(".todo-content input").value = newText;
    todoItems[index] = newText;
  }
});

//declare global countdown variable to control interval and clear it when counter is below 0
let countdown;
const timerDisplay = document.querySelector(".timer");
let startButton = document.querySelector(".start");
let resetButton = document.querySelector(".reset");

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if we should stop
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    //display
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  console.log({ minutes, remainderSeconds });
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
}

startButton.addEventListener("click", () => {
  clearInterval(countdown);
  startButton.disabled = true;
  timer(20 * 60);
});

resetButton.addEventListener("click", () => {
  startButton.disabled = false;
  clearInterval(countdown);
  timerDisplay.textContent = "20:00";
});
