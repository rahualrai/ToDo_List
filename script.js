document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskInput = document.getElementById('taskInput');
        const taskDescription = taskInput.value.trim();

        if (taskDescription) {
            addTask(taskDescription);
        }
    });

    fetchTasks();

    function fetchTasks() {
        fetch('http://localhost:3000/tasks')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(tasks => {
                tasks.sort((a, b) => {
                    return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
                });
                tasks.forEach(task => {
                    displayTask(task);
                });
            })
            .catch(error => console.error('Error:', error));
    }    

    function addTask(description) {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, completed: false })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(task => {
            displayTask(task);
            taskInput.value = '';
        })
        .catch(error => console.error('Error:', error));
    }

    function displayTask(task) {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
    
        const taskDescription = document.createElement('span');
        taskDescription.textContent = task.description;
        taskDescription.classList.add('task-description');
        if (task.completed) {
            taskDescription.classList.add('completed');
        }
    
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
    
        const doneBtn = document.createElement('button');
        doneBtn.textContent = 'Done';
        doneBtn.classList.add('done-btn');
        doneBtn.onclick = () => toggleTaskCompletion(taskDescription, task._id, task.completed);
    
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '×';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTask(task._id, listItem);
    
        buttonContainer.appendChild(doneBtn);
        buttonContainer.appendChild(deleteBtn);
    
        listItem.appendChild(taskDescription);
        listItem.appendChild(buttonContainer);
    
        taskList.appendChild(listItem);
    }
        
    function deleteTask(taskId, taskElement) {
        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            taskElement.remove();
        })
        .catch(error => console.error('Error:', error));
    }

    function toggleTaskCompletion(taskItem, taskId) {
        const isCompleted = taskItem.classList.contains('completed');
        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !isCompleted })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(task => {
            taskItem.classList.toggle('completed', task.completed);
        })
        .catch(error => console.error('Error:', error));
    }
});
