
// Load the to-do list from cookies
function loadTodos() {
    const todos = getCookie('todos');
    if (todos) {
        const todoList = JSON.parse(todos);
        todoList.forEach(todo => {
            createTodoItem(todo);
        });
    }
}

// Save the to-do list to cookies
function saveTodos() {
    const todoItems = document.querySelectorAll('.todo-item');
    const todos = [];
    todoItems.forEach(item => {
        todos.push(item.textContent.trim());
    });
    setCookie('todos', JSON.stringify(todos), 7); // 7 days expiry
}

// Get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Create a new TO DO item
function createTodoItem(todoText) {
    const todoList = document.getElementById('ft_list');
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.textContent = todoText;
    todoItem.onclick = function() {
        const confirmRemove = confirm("Do you really want to remove this TO DO?");
        if (confirmRemove) {
            todoList.removeChild(todoItem);
            saveTodos();
        }
    };
    todoList.insertBefore(todoItem, todoList.firstChild);
}

// Create a new TO DO when the New button is clicked
document.getElementById('newButton').onclick = function() {
    const newTodoText = prompt("Enter a new TO DO:");
    if (newTodoText && newTodoText.trim()) {
        createTodoItem(newTodoText.trim());
        saveTodos();
    } else {
        alert("You cannot add an empty TO DO.");
    }
};

// Load the saved todos on page load
loadTodos();
 