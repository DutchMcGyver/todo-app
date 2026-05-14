const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const themeToggle = document.getElementById('themeToggle');

// Load theme preference and todos on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadTodos();
});

// Theme toggle handler
themeToggle.addEventListener('click', toggleTheme);

// Add event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function toggleTheme() {
    const body = document.body;
    const isDarkTheme = body.classList.toggle('dark-theme');
    
    // Update button icon
    themeToggle.textContent = isDarkTheme ? '🌙' : '☀️';
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '🌙';
    } else {
        body.classList.remove('dark-theme');
        themeToggle.textContent = '☀️';
    }
}

function addTodo() {
    const todoText = todoInput.value.trim();

    // Validate input
    if (todoText === '') {
        alert('Please enter a todo!');
        return;
    }

    // Create todo object
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    // Add to DOM
    displayTodo(todo);

    // Save to localStorage
    saveTodoToStorage(todo);

    // Clear input
    todoInput.value = '';
    todoInput.focus();
}

function displayTodo(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

function deleteTodo(id) {
    // Remove from DOM
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    if (todoItem) {
        todoItem.remove();
    }

    // Remove from localStorage
    removeTodoFromStorage(id);
}

function saveTodoToStorage(todo) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodoFromStorage(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => displayTodo(todo));
}
