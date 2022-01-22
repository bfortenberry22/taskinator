//set the variables by id
var formEl = document.querySelector("#task-form"); //this is the form, for the event listener
var tasksToDoEl = document.querySelector("#tasks-to-do");//this

//create a functin to capture and display the task
var createTaskHandler = function (event){
    event.preventDefault();//without this, the page would refresh when enter was pressed to add a task

    var taskNameInput = document.querySelector("input[name='task-name']").value; //gets the input value from the form ln16 in html
    var taskTypeInput = document.querySelector("select[name='task-type']").value//gets the input value selected from the dropdown
    
    //create list item
    var listItemEl = document.createElement("li");//creates a list item
    listItemEl.className="task-item";//give it a class name

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement ("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML= "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);//attachs the item to the bottom of the list, taskToDoEl is defined at the top of JS
}

formEl.addEventListener("submit", createTaskHandler);//this is the eventListener to run createTaskHandler


