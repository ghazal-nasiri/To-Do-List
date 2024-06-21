// Loading
const loading = document.querySelector(".loading");
addEventListener("load", () => {
    showItems();
    loading.style.display = "none";
})
// Show Date
let date = new Date();
let d = date.toString().split(" ");
document.querySelector(".date").innerHTML = `${d[1]} ${d[2]} ${d[3]}`;
// modal box
const modal_box = document.querySelector(".modal-box");
const bg_modal_box = document.querySelector(".bg-modal-box");
bg_modal_box.addEventListener("click", () => {
    modal_box.classList.remove("open");
    bg_modal_box.classList.remove("open");
})
// input
const input = document.querySelector('input');
// add button
const addBtn = document.querySelector(".top button")
// todo list
const todoList = document.querySelector("ul");

let tasks;
if (!localStorage.getItem("todo")) {
    tasks = [];
}
else {
    tasks = localStorage.getItem("todo").toString().split(",");
}
// when click on the add button
addBtn.addEventListener("click", () => {
    const title = input.value;
    if (title == "") return;
    if (tasks.includes(title)) {
        modal_box.classList.add("open");
        bg_modal_box.classList.add("open");
        input.value = "";
        return;
    }
    todoList.innerHTML += newItem(title);
    // add new item to the localStorage
    tasks.push(title, "false");
    localStorage.setItem("todo", tasks);
    input.value = "";
})
todoList.addEventListener("click", (e) => {
    let indexItemInTasks;
    // delete item and update localStorage
    if (e.target.className == "fa fa-close") {
        indexItemInTasks = tasks.indexOf(e.target.parentElement.innerText);
        tasks.splice(indexItemInTasks, 2);
        localStorage.setItem("todo", tasks);
        todoList.removeChild(e.target.parentElement);
    }
    if (e.target.nodeName == "LI") {
        e.target.classList.toggle("done");
        indexItemInTasks = tasks.indexOf(e.target.innerText) + 1;
        if (e.target.classList.contains("done")) {
            tasks.splice(indexItemInTasks, 1, "done");
        }
        else {
            tasks.splice(indexItemInTasks, 1, "false");
        }
        localStorage.setItem("todo", tasks);
    }
})
// function add new item to the todo list
function newItem(title) {
    const li = `<li><div class="tick"></div><p>${title}</p><i class="fa fa-close"></i></li>`;
    return li;
}
// function show items after load page
function showItems() {
    for (let i = 0; i < tasks.length; i++) {
        if (i % 2 == 0 || i == 0) {
            let li = newItem(tasks[i])
            if (tasks[i + 1] == "done") {
                li = `<li class="done"><div class="tick"></div><p>${tasks[i]}</p><i class="fa fa-close"></i></li>`
            }
            todoList.innerHTML += li;
        }
    }
}
function istouch() {
    try {
        document.createEvent("touchevent");
        todoList.classList.add("show-delete-icon");
    }
    catch (e) {
        todoList.classList.remove("show-delete-icon");
    }
}
istouch();
