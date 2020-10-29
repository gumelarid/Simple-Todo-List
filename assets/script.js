const date = document.querySelector(".header-date")
const list = document.querySelector(".items")
const input = document.querySelector(".input")

const check = "icon-check"
const uncheck = "icon-uncheck"

let lists
let id

let data = localStorage.getItem("TodoList")
if (data) {
    lists = JSON.parse(data)
    id = lists.length
    loadTodoList(lists)
} else {
    lists = []
    id = 0
}

function loadTodoList(array) {
   array.forEach(function(el){
    addTodoList(el.name, el.id, el.done, el.trash)
   });
}


const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
const today  = new Date();

date.innerHTML = today.toLocaleDateString("en-US", options)


input.addEventListener("keyup", function(event){
    if(event.keyCode == 13) {
       let data = input.value
        if (data) {
            addTodoList(data, id, false, false)

            lists.push({
                name: data,
                id: id,
                done: false,
                trash: false
            })
            localStorage.setItem("TodoList",JSON.stringify(lists))
            id++
        }
        input.value = ""
    }
})

// add list
function  addTodoList(param , id, done, trash) {
    if (trash) { return }

    const Done = done ? check : uncheck

    const text =`
                    <li class="item-list">
                        <div class="icon ${Done}" id=${id} job="check"></div> 
                        <span class="text-list">${param}</span> 
                        <div class="icon-trash" id=${id} job="delete"></div>
                    </li>
                `
    list.insertAdjacentHTML("beforeend", text)
    
}

// done todo list
function doneTodoList(el) {
    el.classList.toggle(check);
    el.classList.toggle(uncheck);

    lists[el.id].done = lists[el.id].done ? false : true
}


// delete todo List
function deleteTodoList(el) {
    el.parentNode.parentNode.removeChild(el.parentNode)

    lists[el.id].trash = true
}

list.addEventListener("click", function(event){
    const element = event.target
    const job = element.attributes.job.value
    console.log(job)

    if (job == "check") {
        doneTodoList(element)
    }else if (job == "delete") {
        deleteTodoList(element)
    }
    localStorage.setItem("TodoList",JSON.stringify(lists))
})




