addEventListener("load", () => {
    showItems();
    loading.style.display = "none";
})
// Loading
let loading = document.querySelector(".loading");


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
let tasks, done;
// input
const input = document.querySelector('input');
// add button
const addBtn = document.querySelector(".top button")
// todo list
const todoList = document.querySelector("ul");
if (!localStorage.getItem("todo")) {
    tasks = [];
    done = [];
}
else {
    tasks = localStorage.getItem("todo").split(",");
    done = localStorage.getItem("done").split(",")
}
// when add on add button
addBtn.addEventListener("click", () => {
    let title = input.value;
    if (tasks.includes(title)) {
        modal_box.classList.add("open");
        bg_modal_box.classList.add("open");
        input.value = "";
        return;
    }
    todoList.innerHTML += newItem(title);
    // add new item to the localStorage
    tasks.push(title);
    done.push("false");
    localStorage.setItem("todo", tasks);
    localStorage.setItem("done", done);
    input.value = "";
})
todoList.addEventListener("click", (e) => {
    // delete item and update localStorage
    if (e.target.className == "fa fa-close") {
        done.splice(tasks.indexOf(e.target.parentElement.innerText), 1);
        localStorage.setItem("done", done);
        tasks.splice(tasks.indexOf(e.target.parentElement.innerText), 1);
        localStorage.setItem("todo", tasks);
        todoList.removeChild(e.target.parentElement);
    }
    if (e.target.nodeName == "LI") {
        e.target.classList.toggle("done");
        if (e.target.classList.contains("done")) {
            done.splice(tasks.indexOf(e.target.innerText), 1, "done");
        }
        else {
            done.splice(tasks.indexOf(e.target.innerText), 1, "false");
        }
    }
    localStorage.setItem("done", done);
}
)
// function add new item to the todo list
function newItem(title) {
    let li = `<li><div class="tick"></div><p>${title}</p><i class="fa fa-close"></i></li>`;
    return li;
}
// function show items after load page
function showItems() {
    for (let i = 0; i < tasks.length; i++) {
        if (done[i] == "done") {
            let li = `<li class="done"><div class="tick"></div><p>${tasks[i]}</p><i class="fa fa-close"></i></li>`;
            todoList.innerHTML += li;
        }
        else {
            todoList.innerHTML += newItem(tasks[i]);
        }
    }
}