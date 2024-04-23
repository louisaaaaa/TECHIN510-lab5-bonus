// ---- Selectors
const todoAdd = document.querySelector("#todo-add");
const todoList = document.querySelector("#todo-list");
const addTodoTitle = document.querySelector("#add-todo-title");
const todos = getLocalStorage() ? getLocalStorage() : [];

// ---- Event Listeners

// ADD Event Listener
todoAdd.addEventListener("click", addTodo);

// Event delegation for COMPLETING and DELETING dynamic todo items
todoList.addEventListener("click", (event) => {
  if (event.target.className === "far fa-check-square") {
    completeTodo();
  }
  if (event.target.className === "far fa-trash-alt") {
    removeTodo();
  }
});

// GET TODOS FROM LOCAL STORAGE AND RENDER ON PAGE
if (todos && todos.length > 0) {
  todos.forEach((todo) => {
    renderTodo(todo);
  });
}

// ---- Functions
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("todos"));
}

function addTodo(event) {
  // Prevent form from refreshing
  event.preventDefault();
  // Sanitize user input
  const cleanString = sanitize(addTodoTitle.value);
  let id = todos.length + 1;
  let newTodo = {
    id,
    title: cleanString,
    is_complete: false,
  };
  // Add new item to todos object
  todos.push(newTodo);
  // Render new item to screen
  renderTodo(newTodo);
  // Empty text input
  addTodoTitle.value = "";
  // Update localStorage item
  localStorage.setItem("todos", JSON.stringify(todos));
}

function completeTodo() {
  let id = parseInt(event.target.parentElement.parentElement.id, 10);
  let resultIndex = todos.findIndex((item) => item.id === id);
  todos[resultIndex].is_complete = !todos[resultIndex].is_complete;
  event.target.parentElement.parentElement.classList.toggle("completed");
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo() {
  let id = parseInt(event.target.parentElement.parentElement.id, 10);
  let result = todos.map((item) => item.id).indexOf(id);
  todos.splice(result, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  event.target.parentElement.parentElement.remove();
}

function renderTodo(obj) {
  let status = "";
  if (obj.is_complete) {
    status = " completed";
  }

  todoList.insertAdjacentHTML(
    "afterbegin",
    `
        <li class="todo-item${status}" id="${obj.id}">
          <h4>${obj.title}</h4>
          <span>
            <i class="far fa-check-square"></i>
            <i class="far fa-trash-alt"></i>
          </span>
        </li>
      `
  );
}

function sanitize(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}