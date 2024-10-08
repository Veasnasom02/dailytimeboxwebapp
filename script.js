// Disable right-click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Disable Ctrl+U
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
  }
});

// Simple login mechanism (replace with server-side authentication in production)
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace with actual authentication logic
  if (username === 'admin' && password === 'password') {
    document.getElementById('login-overlay').style.display = 'none';
    document.querySelector('.planner-container').style.display = 'block';
  } else {
    alert('Invalid credentials. Please try again.');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('task-list');
  const addTaskButton = document.getElementById('add-task');
  const summaryList = document.getElementById('summary-list');
  const progressBar = document.getElementById('task-progress');
  const progressText = document.getElementById('progress-text');
  const printButton = document.getElementById('print-planner');

  function createTaskRow(startTime = '', endTime = '') {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <input type="time" class="start-time" value="${startTime}"> - 
        <input type="time" class="end-time" value="${endTime}">
      </td>
      <td><input type="text" placeholder="Enter task"></td>
      <td><input type="checkbox" class="task-done"></td>
      <td class="task-actions">
        <button class="btn btn-danger remove-task">Remove</button>
      </td>
    `;
    return row;
  }

  function updateProgress() {
    const totalTasks = taskList.querySelectorAll('.task-done').length;
    const completedTasks = taskList.querySelectorAll('.task-done:checked').length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    progressBar.style.width
