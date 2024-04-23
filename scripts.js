let todoList = [];

function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();
    
    if (todoText !== "") {
        todoList.push(todoText);
        todoInput.value = "";
        renderTodoList();
    } else {
        alert("Please enter a valid todo.");
    }
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}

function renderTodoList() {
    const todoListElement = document.getElementById("todoList");
    if (!todoListElement) {
        console.error("Todo list element not found.");
        return;
    }
    
    todoListElement.innerHTML = "";
    
    todoList.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteTodo(index);
        
        li.appendChild(deleteBtn);
        todoListElement.appendChild(li);
    });
}

// Ensure the DOM content is loaded before accessing elements
document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("addButton");
    if (!addButton) {
        console.error("Add button not found.");
        return;
    }
    addButton.addEventListener("click", addTodo);
    
    renderTodoList();
});
