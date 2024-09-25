const formElement = document.querySelector('.todo-form');
const inputElement = document.querySelector('.todo-input');
const todoListUL = document.querySelector('.todo-list');
const deleteAllButton = document.querySelector('.delete-all-button');
const errorMessageElement = document.querySelector('.error-message');

let allTasks = [];

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
});

function addTask() {
  const taskText = inputElement.value.trim();
  if (taskText.length === 0) {
    showError('Task cannot be empty');
    return;
  }

  hideError();
  allTasks.push({ text: taskText, completed: false });
  updateTodoList();
  inputElement.value = "";
}

function showError(message) {
  errorMessageElement.textContent = message;
  errorMessageElement.style.display = 'block';
}

function hideError() {
  errorMessageElement.style.display = 'none';
}

inputElement.addEventListener('input', () => {
  hideError();
});

document.addEventListener('click', (event) => {
  if (errorMessageElement.style.display === 'block') {
    hideError();
  }
});

function updateTodoList() {
  todoListUL.innerHTML = "";
  allTasks.forEach((task, taskIndex) => {
    taskItem = createTaskItem(task, taskIndex);
    todoListUL.append(taskItem);
  })

  toggleDeleteAllButton();
}

function createTaskItem(task, taskIndex) {
  const taskId = 'task-' + taskIndex;
  const taskLI = document.createElement("li");
  taskLI.className = "task";
  taskLI.innerHTML = `
    <input type="checkbox" id="${taskId}" ${task.completed ? 'checked' : ''}>
    <label class="custom-checkbox" for="${taskId}">
      <svg fill="transparent" xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    </label>
    <label for="${taskId}" class="task-text">${task.text}</label>
    <button class="delete-button">
      <svg fill="#5d5d5d" xmlns="http://www.w3.org/2000/svg"
        height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </button>
  `;

  const deleteButton = taskLI.querySelector(".delete-button");
  deleteButton.addEventListener('click', () => {
    deleteTaskItem(taskIndex);
  })

  const checkbox = taskLI.querySelector(`#${taskId}`);
  checkbox.addEventListener('change', () => {
    toggleTaskCompletion(taskIndex, checkbox.checked);
  });

  return taskLI;
}

function deleteTaskItem(taskId) {
  allTasks = allTasks.filter((_, index) => index !== taskId);
  updateTodoList();
}

function toggleTaskCompletion(taskIndex, isCompleted) {
  allTasks[taskIndex].completed = isCompleted;
  toggleDeleteAllButton();
}

function toggleDeleteAllButton() {
  const hasCompletedTasks = allTasks.some(task => task.completed);
  deleteAllButton.style.opacity = hasCompletedTasks ? '1' : '0';
  deleteAllButton.style.pointerEvents = hasCompletedTasks ? 'auto' : 'none';
}

deleteAllButton.addEventListener('click', () => {
  allTasks = allTasks.filter(task => !task.completed);
  updateTodoList();
});