// show date
let date = document.querySelector(".date");
let nowDate = new Date();
d = nowDate.toString().split(" ");
date.innerHTML = d[1] + " " + d[2] + " " + d[3];
// loading
let loading = document.querySelector(".loading")
window.addEventListener("load", () => {
    loading.style.visibility = "hidden"
    showTasks()
})
let ul = document.querySelector("ul");
let AddBtn = document.querySelector("button");
let input = document.querySelector("input");
let tasks;
AddBtn.addEventListener("touchmove", () => {
    AddBtn.style.backgroundColor = "rgb(255, 119, 142)";
})
AddBtn.addEventListener("touchend", () => {
    AddBtn.style.backgroundColor = "pink";
})
if (!localStorage.getItem("todo")) {
    tasks = [];
}
else {
    tasks = getTasks();
}
ul.addEventListener("click", (e) => {
    if (e.target.nodeName == "LI") {
        e.target.classList.toggle("done");
    }
    ul.addEventListener("touchmove", (e) => {
        if (e.target.nodeName == "LI") {
            e.target.lastElementChild.style.display = "block";
            e.target.style.backgroundColor = "rgb(255, 119, 142)";
        }
    })
    ul.addEventListener("touchend", (e) => {
        if (e.target.nodeName == "LI") {
            e.target.lastElementChild.style.display = "none";
            e.target.style.backgroundColor = "pink";
        }
    })

    // remove work
    if (e.target.nodeName == "I") {
        let li = e.target.parentElement;
        ul.removeChild(li)
        tasks.splice(tasks.indexOf(li.textContent), 1);
        localStorage.setItem("todo", tasks);
    }
})


AddBtn.addEventListener("click", () => {
    // add new work
    if (!input.value == "") {
        let work = input.value;
        let li = addNewWork(work);
        ul.innerHTML += li;
        saveTasks(work)

        input.value = "";
    }

})
function addNewWork(text) {
    let li = `<li><div class="tick"></div><p>${text}</p><i class="fa-solid fa-close"></i></li>`;
    return li;
}

function saveTasks(text) {
    tasks.push(text);
    localStorage.setItem("todo", tasks)
}

function getTasks() {
    return localStorage.getItem("todo").split(",")
}

function showTasks() {
    for (let task of getTasks()) {
        if (!task == "") {
            let li = addNewWork(task);
            ul.innerHTML += li;
        }

    }
}





