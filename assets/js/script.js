//set the variables by id
var formEl = document.querySelector("#task-form"); //this is the form, for the event listener
var tasksToDoEl = document.querySelector("#tasks-to-do");//this
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

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

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id",taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement ("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML= "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //creates variable based on ID counter and adds aedit, button, delete button, and selct to list item
    var taskActionsEl = createTaskActions (taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);//attachs the item to the bottom of the list, taskToDoEl is defined at the top of JS
    
    //increment counter by 1
    taskIdCounter++;
};

//create task actions for each added task
var createTaskActions = function(taskId){//the parameter taskID is how different ID's will pass through the function

    var actionContainerEl = document.createElement("div");//create a new div to act as a container for the other elements
    actionContainerEl.className = "task-actions";//give new div a class

    //(inside the div) create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent= "Edit";
    editButtonEl.className="btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    //place edit button onto list item
    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute ("data-task-id", taskId);

    //place delete button onto list item
    actionContainerEl.appendChild(deleteButtonEl);

    //dropdown to select the status
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");//(name of attribute, source)
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices =["To Do", "In Progress", "Completed"];

    for(var i=0; i < statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement("Option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

//this is the eventListener to run createTaskHandler
formEl.addEventListener("submit", taskFormHandler);

//add functionality to the buttons in each task
var taskButtonHandler = function(event){
    console.log(event.target);

    //delete button
    if (event.target.matches(".delete-btn")){
        //get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//delete task function
var deleteTask =function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

//eventListener for the buttons on individual tasks
pageContentEl.addEventListener("click", taskButtonHandler);

