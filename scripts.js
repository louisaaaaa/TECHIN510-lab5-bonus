const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addButton = document.getElementById('add-button');

let todos = [];

// Load todos from localStorage (optional)
const storedTodos = localStorage.getItem('todos');
if (storedTodos) {
  todos = JSON.parse(storedTodos);
}

// Display existing todos
displayTodos();

function displayTodos() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo;
    todoItem.addEventListener('click', toggleTodo);
    todoItem.classList.add(todo.completed ? 'completed' : '');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => deleteTodo(todoItem.textContent));
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  });
}

function addTodo() {
  const newTodo = newTodoInput.value.trim();
  if (newTodo) {
    todos.push({ text: newTodo, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos)); // Save to localStorage
    newTodoInput.value = '';
    displayTodos();
  }
}

function deleteTodo(todoText) {
  const todoIndex = todos.findIndex(todo => todo.text === todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodos();
}

function toggleTodo(event) {
  const clickedTodo = event.target;
  const todoText = clickedTodo.textContent.trim();
  const todoIndex = todos.findIndex(todo => todo.text === todoText);
  todos[todoIndex].completed = !todos[todoIndex].completed;
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodos();
}

addButton.addEventListener('click', addTodo);