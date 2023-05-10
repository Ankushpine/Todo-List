//Todo List

let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');



function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML=`
    
          <input type="checkbox" id="${task.id}" ${task.done ? 'checked': ' '} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <img src="cross.png" class="delete" data-id="${task.id}" />
        
    `;

    tasksList.append(li);
}

// Render List

function renderList () {
    tasksList.innerHTML=" ";

    for (let index = 0; index < tasks.length; index++) {
        addTaskToDOM(tasks[index]);       
    }

    tasksCounter.innerHTML=tasks.length;
}

//Toggle Task

function toggleTask (taskId) {
    const task = tasks.filter(function (task) {
        return task.id == taskId;   
      })

      if(task.length>0){
        const currentTask= task[0];
        currentTask.done = ! currentTask.done ;
        renderList();
        showNotification("Task toggled");
        return;
      }

      showNotification("Task not toggled");

}

//Delete Task

function deleteTask (taskId) {
  const newTask = tasks.filter(function (task) {
    return task.id != taskId;   
  })

  tasks=newTask;
  renderList ();
  showNotification("Task deleted");
}

//Add Task

function addTask (task) {
   
    if(task){
    tasks.push(task);
    renderList();
    showNotification("Task added");
    return;
    }
    
    showNotification('Task not added');

}

function showNotification(text) {
    alert(text);
}

//To store the input

function handleInputKeypress(e) {
    
    if(e.key == 'Enter') {const text = e.target.value;
       
        //If user enter nothing then show notification
        if(!text){ showNotification('Text cannot be empty');
        return;}
        
    

    //Store the task
    const task ={
        text,
        id: Date.now().toString(),
        done: false,
    };
    
    //Empty the target value
    e.target.value = " ";
    addTask(task);

}
}

//To handle the click events of checkbox and delete

function handleClickListener(e) {
    const target = e.target;

    if( target.className=='delete'){
     const taskId = target.dataset.id;
     deleteTask(taskId);
     return;
    }
    else if( target.className=='custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }

}



function initializeApp() {
addTaskInput.addEventListener('keyup', handleInputKeypress);
document.addEventListener('click', handleClickListener);
}

//Initialize function

initializeApp()

