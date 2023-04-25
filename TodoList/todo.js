

function countPending() {
    var todoList = document.querySelectorAll(".task");
    var countTodo = document.getElementById("countTodo");

    countTodo.innerHTML = "You have " + todoList.length + " pending task(s)";
}
countPending();

function tick(btn) {
    btn.className = btn.className === "checked" ? "unchecked" : "checked";
    var img = btn.querySelector("img");
    img.style.display = btn.className === "checked" ? "" : "none";
}
//handle add a new task
function addNewTodo(task) {
    //get elements
    var todoList = document.querySelector("#listTodo");
    //handle adding
    todoList.innerHTML += taskContent(task);
    inputTodo.value = "";
    countPending();
    updateLocalStorage();
}

document.querySelector("#add").addEventListener('click', function () {
    var inputTodo = document.querySelector("#inputTodo");
    var inputValue = inputTodo.value.trim(); // Get input value and trim it
    if (inputValue !== "") {
        addNewTodo(inputValue);
    } else {
        inputTodo.style.animation = "vibrate 0.1s ease-in-out infinite";
        setTimeout(() => {
            inputTodo.style.animation = "none";
        }, 300);
    }
});

function loadFromLocalStorage() {
    if (localStorage.length > 0) {
        var Tasks = JSON.parse(localStorage.getItem('userTasks'));
        for (let i = 0; i < Tasks.length; i++) {
            addNewTodo(Tasks[i])
        }
    } else {
        addNewTodo('Do homeworks');
        addNewTodo('Do household chores');
        addNewTodo('Go shopping');
    }

}

document.addEventListener('keydown', function (event) {
    var inputTodo = document.querySelector("#inputTodo");
    if (event.key === 'Enter') {
        if (inputTodo.value != "") {
            addNewTodo(inputTodo.value);
        } else {
            inputTodo.style.animation = "vibrate 0.1s ease-in-out infinite";
            setTimeout(() => {
                inputTodo.style.animation = "none";
            }, 300);
        }
    }
})


function taskContent(content) {
    if (content != "") {
        return '<div class="task" ondblclick="dblTick(this)">' +
            '<li onclick="showFully(this)">' + content + '</li>' +
            '<button class="unchecked" onclick="tick(this)">' +
            '<img src="check.png" width="90%"style="display: none;"></button></div>';
    }
    return "";
}


function done() {
    var listTodo = document.querySelectorAll(".task");
    //clear inner HTML
    document.querySelector("main > div > ul").innerHTML = "";
    // find unchecked task and write to empty ul
    listTodo.forEach(todo => {
        if (todo.querySelector("button").className != "checked") {
            document.querySelector("main > div > ul").innerHTML += taskContent(todo.querySelector("li").innerHTML);
        }
    });
    countPending();
    updateLocalStorage();
}

document.querySelector("div.foot > button").addEventListener('click', function() {
    done();
    var listTodo = document.querySelectorAll(".task");
    if (listTodo.length == 0) {
        localStorage.clear();
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Delete') {
        done();
    }
})
//show full task text
function showFully(li) {
    li.classList.toggle("showFully");
}

function dblTick(div) {
    //get elements
    var btn = div.querySelector("button");
    var img = btn.querySelector("img");
    //toggle check box
    btn.className = btn.className === "checked" ? "unchecked" : "checked";
    img.style.display = btn.className === "checked" ? "" : "none";
}


loadFromLocalStorage();


function updateLocalStorage() {
    var Tasks = document.querySelectorAll(".task");
    var TaskArray = Array.from(Tasks);
    TaskArray = TaskArray.map(task => task.querySelector('li').innerHTML);


    localStorage.setItem('userTasks', JSON.stringify(TaskArray));


}

