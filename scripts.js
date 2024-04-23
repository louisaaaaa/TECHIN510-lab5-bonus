let todoList = [];

function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();
    
    if (todoText !== "") {
        todoList.push(todoText);
        todoInput.value = "";
        renderTodoList();
    }
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}

function renderTodoList() {
    const todoListElement = document.getElementById("todoList");
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
