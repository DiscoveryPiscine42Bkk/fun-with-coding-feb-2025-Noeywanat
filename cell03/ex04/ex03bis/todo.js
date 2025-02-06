function getCookies(name) {
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return "";
}

function setCookies(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/;";
}

function loadTasks() {
    let tasks = getCookies("tasks");
    if (tasks) {
        let taskArray = tasks.split('|');
        taskArray.forEach(task => createTaskElement(task, false));
    }
}

function saveTasks() {
    let tasks = $(".task").map(function() {
        return $(this).text();
    }).get().join('|');
    setCookies("tasks", tasks);
}

function createTaskElement(taskText, isNew = true) {
    let task = $("<div></div>").addClass("task").text(taskText);
    
    task.click(function() {
        if (confirm("Do you want to remove this task?")) {
            $(this).remove();
            saveTasks();
        }
    });

    if (isNew) {
        $("#ft_list").prepend(task);
    } else {
        $("#ft_list").append(task);
    }
}

$("#newTaskBtn").click(function() {
    let taskText = prompt("Enter a new task:");
    if (taskText) {
        createTaskElement(taskText);
        saveTasks();
    }
});

$(window).on("load", loadTasks);