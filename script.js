
document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('task-list');
  const addTaskButton = document.getElementById('add-task');
  const summaryList = document.getElementById('summary-list');
  const progressBar = document.getElementById('task-progress');
  const progressText = document.getElementById('progress-text');

  function createTaskRow(time = '') {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="time" value="${time}"></td>
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
    
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${Math.round(progressPercentage)}% of tasks completed`;
  }

  function updateSummary(taskText, isCompleted) {
    if (isCompleted) {
      const listItem = document.createElement('li');
      listItem.textContent = taskText;
      listItem.classList.add('completed-task');
      summaryList.appendChild(listItem);
    } else {
      const items = summaryList.getElementsByTagName('li');
      for (let i = 0; i < items.length; i++) {
        if (items[i].textContent === taskText) {
          summaryList.removeChild(items[i]);
          break;
        }
      }
    }
  }

  addTaskButton.addEventListener('click', function() {
    const newRow = createTaskRow();
    taskList.appendChild(newRow);
    updateProgress();
  });

  taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-task')) {
      e.target.closest('tr').remove();
      updateProgress();
    }
  });

  taskList.addEventListener('change', function(e) {
    if (e.target.classList.contains('task-done')) {
      const taskText = e.target.closest('tr').querySelector('input[type="text"]').value;
      updateSummary(taskText, e.target.checked);
      updateProgress();
    }
  });

  // Initialize with a few empty rows
  for (let i = 0; i < 3; i++) {
    taskList.appendChild(createTaskRow());
  }
});
