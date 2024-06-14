// Archivo: script.js

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const searchTask = document.getElementById('searchTask');

    // Botones de filtrado
    const filterAll = document.getElementById('filterAll');
    const filterPending = document.getElementById('filterPending');
    const filterCompleted = document.getElementById('filterCompleted');
    const filterExpired = document.getElementById('filterExpired');

    // Manejar el envío del formulario de tareas
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const responsable = document.getElementById('responsable').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        addTask(taskName, responsable, startDate, endDate);
        taskForm.reset();
    });

    // Manejar la búsqueda de tareas
    searchTask.addEventListener('input', function() {
        const query = searchTask.value.toLowerCase();
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach(function(task) {
            const taskName = task.querySelector('.task-name').innerText.toLowerCase();
            if (taskName.includes(query)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });

    // Función para agregar una tarea
    function addTask(taskName, responsable, startDate, endDate) {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item task-item';
        
        // Verificar si la tarea está vencida
        const today = new Date().toISOString().split('T')[0];
        if (endDate < today) {
            taskItem.classList.add('expired');
        }
        
        taskItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="task-name font-weight-bold">${taskName}</span>
                    <small class="d-block">Responsable: ${responsable}</small>
                    <small class="d-block">Inicio: ${startDate}</small>
                    <small class="d-block">Fin: ${endDate}</small>
                </div>
                <div>
                    <button class="btn btn-success btn-sm mark-complete">Resuelta</button>
                    <button class="btn btn-danger btn-sm delete-task">Eliminar</button>
                </div>
            </div>
        `;
        
        taskList.appendChild(taskItem);

        // Manejar la acción de marcar como resuelta
        taskItem.querySelector('.mark-complete').addEventListener('click', function() {
            if (!taskItem.classList.contains('expired')) {
                taskItem.classList.add('completed');
                this.disabled = true;
            } else {
                alert('No se puede marcar una tarea vencida como resuelta.');
            }
        });

        // Manejar la acción de eliminar la tarea
        taskItem.querySelector('.delete-task').addEventListener('click', function() {
            taskItem.remove();
        });
    }

    // Funciones para filtrar tareas
    function filterTasks(status) {
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach(function(task) {
            switch (status) {
                case 'all':
                    task.style.display = '';
                    break;
                case 'pending':
                    if (!task.classList.contains('completed') && !task.classList.contains('expired')) {
                        task.style.display = '';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
                case 'completed':
                    if (task.classList.contains('completed')) {
                        task.style.display = '';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
                case 'expired':
                    if (task.classList.contains('expired')) {
                        task.style.display = '';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
            }
        });
    }

    // Asignar eventos a los botones de filtrado
    filterAll.addEventListener('click', function() {
        filterTasks('all');
    });
    filterPending.addEventListener('click', function() {
        filterTasks('pending');
    });
    filterCompleted.addEventListener('click', function() {
        filterTasks('completed');
    });
    filterExpired.addEventListener('click', function() {
        filterTasks('expired');
    });
});
