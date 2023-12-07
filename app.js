document.addEventListener('DOMContentLoaded', function() {
  const todoForm = document.getElementById('todo-form');
  const taskInput = document.getElementById('task');
  const descriptionInput = document.getElementById('description');
  const eventDateInput = document.getElementById('event-date');
  const taskList = document.getElementById('task-list');
  const errorMessage = document.getElementById('error-message');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      const taskId = `task-${index}`; // Generate unique ID for each task
      li.innerHTML = `
        <span><strong>ID:</strong> ${taskId}</span>
        <span><strong>Task:</strong> ${task.task}</span>
        <span><strong>Description:</strong> ${task.description}</span>
        <span><strong>Date:</strong> ${task.date}</span>
        <span><strong>Event:</strong> ${task.event}</span>
        <button class="edit-task-btn" data-index="${index}">Edit Task</button>
        <button class="edit-description-btn" data-index="${index}">Edit Description</button>
        <button class="edit-date-btn" data-index="${index}">Edit Date</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      taskList.appendChild(li);
    });
  }

  function updateLocalStorageAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  todoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const newTask = taskInput.value.trim();
    const newDescription = descriptionInput.value.trim();
    const newEventDate = eventDateInput.value;

    if (newTask !== '' && newDescription !== '' && newEventDate !== '') {
      const currentDate = new Date().toLocaleDateString();
      tasks.push({
        task: newTask,
        description: newDescription,
        date: currentDate,
        event: newEventDate
      });
      updateLocalStorageAndRender();
      taskInput.value = '';
      descriptionInput.value = '';
      eventDateInput.value = '';
      errorMessage.textContent = '';
    } else {
      errorMessage.textContent = 'Please fill in all required fields!';
    }
  });

  taskList.addEventListener('click', function(e) {
    const index = e.target.getAttribute('data-index');

    if (e.target.classList.contains('edit-task-btn')) {
      const updatedTask = prompt('Edit task:', tasks[index].task);
      if (updatedTask !== null && updatedTask.trim() !== '') {
        tasks[index].task = updatedTask.trim();
        updateLocalStorageAndRender();
      } else {
        alert('Task cannot be empty!');
      }
    }

    if (e.target.classList.contains('edit-description-btn')) {
      const updatedDescription = prompt('Edit description:', tasks[index].description);
      if (updatedDescription !== null) {
        tasks[index].description = updatedDescription.trim();
        updateLocalStorageAndRender();
      }
    }

    if (e.target.classList.contains('edit-date-btn')) {
      const updatedDate = prompt('Edit date:', tasks[index].date);
      if (updatedDate !== null) {
        tasks[index].date = updatedDate.trim();
        updateLocalStorageAndRender();
      }
    }

    if (e.target.classList.contains('delete-btn')) {
      tasks.splice(index, 1);
      updateLocalStorageAndRender();
    }
  });

  renderTasks();
});
