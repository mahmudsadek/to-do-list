let input = document.getElementById("input");
let submit = document.getElementById("add");
let tasks = document.getElementById("tasks");

let arrayOfTasks = [];
if (window.localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}
getFromLocalStorage();
submit.onclick = function(){
    if (input.value !== ""){
        addTaskToArray(input.value);
        input.value =  "" ;// empty the value filed
    }
};
tasks.addEventListener("click",(e)=>{
    console.log(e.target.parentElement.getAttribute("data-id"));
    if (e.target.id == "delete"){
        e.target.parentElement.parentElement.remove();
        deleteTaskFromLS(e.target.parentElement.parentElement.getAttribute("data-id"));
    }
    if (e.target.parentElement.className == "card border-warning mb-3"){
        toggleTaskStates(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.setAttribute("class","card border-secondary mb-3");
    }
    else if (e.target.parentElement.className == "card border-secondary mb-3"){
        toggleTaskStates(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.setAttribute("class","card border-warning mb-3");
    }
});
function addTaskToArray(taskText){
    const task = {
        id : Date.now(),
        title : taskText,
        completed : false,
    };
    arrayOfTasks.push(task);
    addElementToPageFrom(arrayOfTasks);
    addToLocalStorage(arrayOfTasks)
}

function addElementToPageFrom(arrayOfTasks){
    tasks.innerHTML = "";
    arrayOfTasks.forEach((task)=>{
        let divCard = document.createElement("div");
        divCard.className = "card border-warning mb-3";
        if (task.completed==true){
            divCard.className="card border-secondary mb-3";
        }
        divCard.setAttribute("data-id",task.id);
        let divBody = document.createElement("div");
        divBody.className = "card-body";
        divBody.appendChild(document.createTextNode(task.title))
        let span = document.createElement("span");
        span.className = "btn btn-danger";
        span.setAttribute ("id","delete");
        span.setAttribute("style","position: sticky; left: 80%;")
        span.appendChild(document.createTextNode("Delete"));
        divBody.appendChild(span);
        divCard.appendChild(divBody);
        tasks.appendChild(divCard);

    })
}
function addToLocalStorage (arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}
function getFromLocalStorage(){
    data = window.localStorage.getItem("tasks");
    if (data){
        let tasks = JSON.parse(data); 
        addElementToPageFrom(tasks);   
    }
}

function deleteTaskFromLS (taskID){

    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskID);
    addToLocalStorage(arrayOfTasks);

}
function toggleTaskStates(taskID){
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id==taskID) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addToLocalStorage(arrayOfTasks);
}
