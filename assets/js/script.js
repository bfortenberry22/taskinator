//set the variables by id
var formEl = document.querySelector("#task-form"); //this is the form, for the event listener
var tasksToDoEl = document.querySelector("#tasks-to-do");//this

//create a functin to capture and display the task
var taskFormHandler = function (event){
    event.preventDefault();//without this, the page would refresh when enter was pressed to add a task

    var taskNameInput = document.querySelector("input[name='task-name']").value; //gets the input value from the form ln16 in html
    var taskTypeInput = document.querySelector("select[name='task-type']").value//gets the input value selected from the dropdown

    //check if input values are empty strings
    if( !taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }
    //reset the input form for the user
    formEl.reset();

    //package the data up as an object
    var taskDataObj = {
        name: taskNameInput, 
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}
    

var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement("li");//creates a list item
    listItemEl.className="task-item";//give it a class name

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement ("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML= "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);//attachs the item to the bottom of the list, taskToDoEl is defined at the top of JS
};

formEl.addEventListener("submit", taskFormHandler);//this is the eventListener to run createTaskHandler


