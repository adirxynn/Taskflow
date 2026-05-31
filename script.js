let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function addTask(){

    const taskInput = document.getElementById("taskInput");
    const dueDate = document.getElementById("dueDate");

    if(taskInput.value.trim() === ""){
        return;
    }

    tasks.push({
        text: taskInput.value,
        due: dueDate.value,
        completed:false
    });

    saveTasks();

    taskInput.value = "";
    dueDate.value = "";
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();
}

function renderTasks(){

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    let completedCount = 0;

    tasks.forEach((task,index)=>{

        if(task.completed){
            completedCount++;
        }

        const li =
            document.createElement("li");

        li.classList.add("task");

        if(task.completed){
            li.classList.add("completed");
        }

        const today =
            new Date().toISOString().split("T")[0];

        if(
            task.due &&
            task.due < today &&
            !task.completed
        ){
            li.classList.add("overdue");
        }

        li.innerHTML = `
            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})"
                >

                <div class="task-info">

                    <span class="task-text">
                        ${task.text}
                    </span>

                    ${
                        task.due
                        ?
                        `<span class="due-date">
                            Due: ${task.due}
                        </span>`
                        :
                        ""
                    }

                </div>

            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})"
            >
                ✕
            </button>
        `;

        taskList.appendChild(li);
    });

    document.getElementById("counter").textContent =
        `${completedCount} / ${tasks.length} Completed`;
}

function toggleTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
}