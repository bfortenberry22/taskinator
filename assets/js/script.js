//set the variables by id
var formEl = document.querySelector("#task-form"); //this is the form, for the event listener
var tasksToDoEl = document.querySelector("#tasks-to-do");//this
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

//array created to store task on local storage
var tasks= [];

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

    var isEdit = formEl.hasAttribute("data-task-id");

    //has data attribute, so get task id and call function to complete edit process
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId)
    }
    //no data attribute, so create object as normal and pass to createTaskEl function
    else{
        //package up as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        }
        //send it as an argument to createTaskEl
         createTaskEl(taskDataObj);
    };
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
    
    //adds the id to end of the objecttaskDataObj
    taskDataObj.id= taskIdCounter;
    //pushed the task to the end of the array
    tasks.push(taskDataObj);
    

    saveTasks();

    //increment counter by 1
    taskIdCounter++;

    console.log(taskDataObj);
    console.log(taskDataObj.status);
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



//add functionality to the buttons in each task
var taskButtonHandler = function(event){
    //get target element from event
    var targetEl = event.target

    //edit button was clicked
    if(targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button was clicked
    else if (event.target.matches(".delete-btn")){
        //get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//edit task function
var editTask = function(taskId){
    
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    //place content from the task in the form 
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    
    //changes the "Add Task" button to a 'Save Task" button
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

//complete the edit
var completeEditTask = function (taskName, taskType, taskId){
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //update array- loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++){
        if(tasks[i].id===parseInt(taskId)){
            tasks[i].name=taskName;
            tasks[i].type=taskType;
        }
    };

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    saveTasks();
};

//status change handler
var taskStatusChangeHandler = function(event){
    console.log(event.target.value);

    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    //get the currently selected option's value and convert to lower case
    var statusValue = event.target.value.toLowerCase();

    //move the task to the appropriate box
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //updates array after a status change
    for( var i = 0; i <tasks.length; i++){
        if(tasks[i].id===parseInt(taskId)){
            tasks[i].status=statusValue;
        }
    }

};

//delete task function
var deleteTask =function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new array to hold updated list of task
    var updatedTaskArr = [];

    //loop through current tasks
    for( var i = 0; i <tasks.length; i++){
        //if tasks[i].id doesn't match the value of the taskId, let's keep that task
        if(tasks[i].id !=parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks();
};

//function to save the task to local storage anytime something changes
var saveTasks= function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//this is the eventListener to create task
formEl.addEventListener("submit", taskFormHandler);

//eventListener for the buttons on individual tasks
pageContentEl.addEventListener("click", taskButtonHandler);

//status change eventListerer
pageContentEl.addEventListener("change", taskStatusChangeHandler);

