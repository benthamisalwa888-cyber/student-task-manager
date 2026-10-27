
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("strong");
        title.textContent = task.title;

        const date = document.createElement("small");
        date.textContent = "Échéance : " + task.date;

        info.append(title, date);

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Annuler" : "Terminer";

        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            displayTasks();
        });

        li.append(info, completeBtn, deleteBtn);
        taskList.appendChild(li);
    });

    updateStats();
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskInput.value.trim();
    const date = taskDate.value;

    if (title === "" || date === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    tasks.push({
        id: Date.now(),
        title: title,
        date: date,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskForm.reset();
});

displayTasks();