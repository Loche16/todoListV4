import "./styles.css";
import{createProjectForm, createProjectCardDom, createTodoForm, createProjectContentsDom, createTodoDom} from "./dom";

const createProjectBtn = document.getElementById("createProjectBtn");
const contentContainer = document.getElementById("contentContainer");
const sidebar = document.getElementById("sidebar");
const projectStorage = {};
const todoStorage = {};
const currentProject = {id:""};
let todoProgress = {};
const getTodoProgress = JSON.parse(localStorage.getItem("todoProgress"));
if(getTodoProgress){
  todoProgress = {...getTodoProgress}
  console.log("sus")
  localStorage.setItem("todoProgress", JSON.stringify(todoProgress));
}

const{projectFormDialog, projectNameInput, projectForm, leaveProjectFormBtn} = createProjectForm();

const{todoFormDialog, todoNameInput, leaveTodoFormBtn, todoForm, todoDescriptionInput, todoDeadlineInput, todoPrioritySelect}  = createTodoForm();

createProjectBtn.addEventListener("click",()=>{
  projectFormDialog.showModal();
});

leaveProjectFormBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  projectFormDialog.close();
  projectNameInput.value = "";
});

projectForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  projectFormDialog.close();
  
  const{projectId, projectCardDelBtn, projectCard, projectContentsDialog} = createProjectLogic();
  projectStorage[projectId] = {name: projectNameInput.value, id: projectId};
  projectDelBtn(projectCardDelBtn, projectCard, projectContentsDialog, projectId);
  localStorage.setItem("projectStorage", JSON.stringify(projectStorage));
  projectNameInput.value = "";
});

function createProjectLogic(){
  let projectId = String(Date.now());

  const{projectCardName, projectCard, projectCardDelBtn} = createProjectCardDom();
  projectCardName.id = projectId;
  
  const{projectContentsDialog, projectLeaveBtn, addTodoBtn, projectContentsContainer} = createProjectContentsDom();
  projectContentsDialog.id = projectId;
  projectContentsContainer.id = projectId;

  projectContentsLeaveBtn(projectLeaveBtn, projectContentsDialog);
  projectContentsAddTodoBtn(addTodoBtn);
  leaveTodoForm();

  return{projectCardDelBtn, projectCardName, projectContentsDialog, projectId, projectCard};
};

function createDefaultProject(){
  projectNameInput.value = "Default Project";
  const{projectCardDelBtn, projectId} = createProjectLogic();
  projectStorage[projectId] = {name: projectNameInput.value, id: projectId};
  projectCardDelBtn.remove();
};

function projectDelBtn(projectCardDelBtn, projectCard, projectContentsDialog, projectId){
  projectCardDelBtn.addEventListener("click", ()=>{
    const answer = confirm("Are you sure you want to delete this project");

    if(answer){
    projectCard.remove();
    projectContentsDialog.remove();
    delete projectStorage[projectId];
    localStorage.setItem("projectStorage", JSON.stringify(projectStorage));
    }
  });
};

sidebar.addEventListener("click", (e)=>{
  const projectContentsDialog = document.querySelectorAll(".projectContentsDialog");

  projectContentsDialog.forEach((project)=>{
    project.close();

    if(e.target.id === project.id){
      project.show();
      currentProject.id = project.id;
    };
  });  
});

const projectStorageParsed = JSON.parse(localStorage.getItem("projectStorage"));

if(!projectStorageParsed){
  createDefaultProject();
  localStorage.setItem("projectStorage", JSON.stringify(projectStorage));
  projectNameInput.value = "";
};

if(projectStorageParsed){
  Object.values(projectStorageParsed).forEach((project) =>{
    const {name, id} = project;
    projectStorage[id] = {name: name, id: id};
    projectNameInput.value = name;
    let {projectCardName, projectContentsDialog, projectCardDelBtn, projectId, projectCard} = createProjectLogic();
    projectId = id
    projectCardName.id = id;
    projectContentsDialog.id = id;
    projectDelBtn(projectCardDelBtn, projectCard, projectContentsDialog, projectId);
    projectNameInput.value = "";
    if(name === "Default Project"){
      projectCardDelBtn.remove();
    };
  });
};

function projectContentsLeaveBtn(projectLeaveBtn, projectContentsDialog){
  projectLeaveBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    projectContentsDialog.close();
  });
};

function projectContentsAddTodoBtn(addTodoBtn){
  addTodoBtn.addEventListener("click", ()=>{
    todoFormDialog.showModal();
  });
};

function leaveTodoForm(){
  leaveTodoFormBtn.addEventListener("click", ()=>{
    todoFormDialog.close();
  });
};

leaveTodoFormBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  todoFormDialog.close();
  todoNameInput.value = "";
  todoDescriptionInput.value = "";
  todoDeadlineInput.value = "";
  //I will let the priority stay at the default value 
});

todoForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  todoFormDialog.close();
  const projectContentsContainer = document.querySelector(".projectContentsContainer");
  const projectContentsDialog = document.querySelectorAll(".projectContentsDialog")


  projectContentsDialog.forEach((projectContentsContainer)=>{
    if(currentProject.id === projectContentsContainer.id){
      const uniqueTodoId = String(Date.now());
      const{projectContentsTodo, todoDelBtn, todoEditBtn, todoCompleteBtn, todoContentsContainer} = todoLogic(projectContentsContainer, uniqueTodoId);
      projectContentsTodo.id = currentProject.id;
      todoContentsContainer.id = currentProject;
      todoCompleteBtn.id = currentProject.id; 
      todoStorage[uniqueTodoId] = {todoName: todoNameInput.value, todoDescription: todoDescriptionInput.value, todoDeadline: todoDeadlineInput.value, todoPriority: todoPrioritySelect.value, todoId: projectContentsTodo.id, uniqueId: uniqueTodoId};
      deleteTodo(todoDelBtn, projectContentsTodo, uniqueTodoId);
      editTodo(todoEditBtn, projectContentsTodo, uniqueTodoId);
      completeTodo(todoCompleteBtn, todoContentsContainer, uniqueTodoId);
      localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
    };
  });

  

  todoNameInput.value = "";
  todoDescriptionInput.value = "";
  todoDeadlineInput.value = "";
  //I will let the priority stay at the default value  
});

function todoLogic(projectContentsContainer, uniqueId){
  const{projectContentsTodo, todoDelBtn, todoEditBtn, todoContentsContainer, todoCompleteBtn} = createTodoDom(projectContentsContainer, todoNameInput, todoDescriptionInput, todoDeadlineInput, todoPrioritySelect);
  return{projectContentsTodo, todoDelBtn, todoEditBtn, todoContentsContainer, todoCompleteBtn};
};

function deleteTodo(todoDelBtn, projectContentsTodo, uniqueId){
  todoDelBtn.addEventListener("click", ()=>{
    const answer = confirm("Are you sure you want to delete this todo?");

    if(answer){
    projectContentsTodo.remove();
    delete todoStorage[uniqueId];
    localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
    };
  });
};

function editTodo(todoEditBtn, projectContentsTodo, uniqueId){
  todoEditBtn.addEventListener("click", ()=>{
    todoFormDialog.showModal();
    todoForm.addEventListener("submit", (e)=>{
      e.preventDefault();
      projectContentsTodo.remove();
      todoFormDialog.close();
      delete todoStorage[uniqueId];
      localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
       
    });
    leaveTodoFormBtn.addEventListener("click", (e)=>{
      e.preventDefault()
      todoFormDialog.close();
    });
  });
};

function completeTodo(todoCompleteBtn, todoContentsContainer, uniqueId){

  todoCompleteBtn.addEventListener("click", ()=>{
    console.log("hello")
    
    if(todoProgress[uniqueId] === "unfinished" ){
      console.log("arigato")
      todoContentsContainer.classList.remove("complete");
      todoCompleteBtn.textContent = "Finished";
      todoProgress[uniqueId] = "finished";
      localStorage.setItem("todoProgress", JSON.stringify(todoProgress));
    }
    else {
      console.log("oi")
      todoContentsContainer.classList.add("complete");
      todoCompleteBtn.textContent = "Unfinished";
      todoProgress[uniqueId] = "unfinished";
      localStorage.setItem("todoProgress", JSON.stringify(todoProgress));
    };
    
  });
  
};

const todoStorageParsed = JSON.parse(localStorage.getItem("todoStorage"));



if(todoStorageParsed){
  Object.values(todoStorageParsed).forEach((todo)=>{
    const{todoName, todoDescription, todoDeadline, todoPriority, todoId, uniqueId} = todo;
    todoStorage[uniqueId] = {todoName: todoName, todoDescription: todoDescription, todoDeadline: todoDeadline, todoPriority: todoPriority, todoId: todoId, uniqueId: uniqueId};
    const projectContentsDialog = document.querySelectorAll(".projectContentsDialog")
    projectContentsDialog.forEach((projectContentsContainer)=>{
      if(todoId === projectContentsContainer.id){
        todoNameInput.value = todoName;
        todoDescriptionInput.value = todoDescription;
        todoDeadlineInput.value = todoDeadline;
        todoPrioritySelect.value  = todoPriority;
        let {projectContentsTodo, todoDelBtn, todoEditBtn, todoCompleteBtn, todoContentsContainer} = todoLogic(projectContentsContainer, uniqueId);
        deleteTodo(todoDelBtn, projectContentsTodo, uniqueId);
        editTodo(todoEditBtn, projectContentsTodo, uniqueId);
        completeTodo(todoCompleteBtn, todoContentsContainer, uniqueId);
        todoNameInput.value = "";
        todoDescriptionInput.value = "";
        todoDeadlineInput.value = "";
        todoContentsContainer.id = uniqueId;
        if(todoProgress[uniqueId] === "unfinished"){
          todoContentsContainer.classList.add("complete");
          todoCompleteBtn.textContent = "Unfinished";
          todoProgress[uniqueId] = "unfinished";
          localStorage.setItem("todoProgress", JSON.stringify(todoProgress));
        }
        //I will let the priority stay at the default value 
      };
    });
    
  });
 
};