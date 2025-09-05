function createProjectForm(){

  const projectFormDialog = document.createElement("dialog");
  projectFormDialog.classList.add("projectFormDialog");
  contentContainer.appendChild(projectFormDialog);

    const projectForm = document.createElement("form");
    projectForm.classList.add("projectForm");
    projectFormDialog.appendChild(projectForm);

      const projectFormNameContainer = document.createElement("div");
      projectForm.appendChild(projectFormNameContainer);

        const projectNameLabel = document.createElement("label");
        projectNameLabel.textContent = "Name: ";
        projectNameLabel.htmlFor = "projectNameInput";
        projectFormNameContainer.appendChild(projectNameLabel);

        const projectNameInput = document.createElement("input");
        projectNameInput.id = "projectNameInput";
        projectNameInput.required = true;
        projectNameInput.setAttribute("maxlength", "20");
        projectFormNameContainer.appendChild(projectNameInput);

      const projectFormBtnsContainer = document.createElement("div");
      projectFormBtnsContainer.classList.add("projectFormBtnsContainer");
      projectForm.appendChild(projectFormBtnsContainer);

        const submitProjectFormBtn = document.createElement("button");
        submitProjectFormBtn.textContent = "Submit";
        submitProjectFormBtn.type = "submit";
        submitProjectFormBtn.classList.add("submitProjectFormBtn")
        projectFormBtnsContainer.appendChild(submitProjectFormBtn);

        const leaveProjectFormBtn = document.createElement("button");
        leaveProjectFormBtn.textContent = "Leave";
        projectFormBtnsContainer.appendChild(leaveProjectFormBtn);

  return {projectFormDialog, projectNameInput, projectForm, leaveProjectFormBtn};
};

function createProjectCardDom(){

  const projectCard = document.createElement("div");
  projectCard.classList.add("projectCard");
  sidebar.appendChild(projectCard);
  
    const projectCardName = document.createElement("div");
    projectCardName.textContent = `${projectNameInput.value}`;
    projectCardName.classList.add("projectCardName");
    projectCard.appendChild(projectCardName);

    const projectCardDelBtn = document.createElement("button");
    projectCardDelBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    projectCardDelBtn.classList.add("projectCardDelBtn");
    projectCard.appendChild(projectCardDelBtn);

  return {projectCardName, projectCardDelBtn, projectCard};
};

function createProjectContentsDom(){

  const projectContentsDialog = document.createElement("dialog");
  projectContentsDialog.classList.add("projectContentsDialog");
  contentContainer.appendChild(projectContentsDialog);

    const projectContentsContainer = document.createElement("div");
    projectContentsContainer.classList.add("projectContentsContainer");
    projectContentsDialog.appendChild(projectContentsContainer);

      const projectContentsHeader = document.createElement("div");
      projectContentsHeader.classList.add("projectContentsHeader");
      projectContentsContainer.appendChild(projectContentsHeader);

        const projectContentsName = document.createElement("div");
        projectContentsName.textContent = `${projectNameInput.value}`;
        projectContentsHeader.appendChild(projectContentsName);

        const addTodoBtn = document.createElement("button");
        addTodoBtn.textContent = "Add Todo";
        projectContentsHeader.appendChild(addTodoBtn);

        const projectLeaveBtn = document.createElement("button");
        projectLeaveBtn.textContent = "Leave";
        projectContentsHeader.appendChild(projectLeaveBtn);


  return {projectContentsDialog, addTodoBtn, projectContentsContainer, projectLeaveBtn, projectContentsName};

}

function createTodoForm(){

  const todoFormDialog = document.createElement("dialog");
  todoFormDialog.classList.add("todoFormDialog");
  contentContainer.appendChild(todoFormDialog);

    const todoForm = document.createElement("form");
    todoFormDialog.appendChild(todoForm);

      const todoFormLabelsAndInputs = document.createElement("div");
      todoFormLabelsAndInputs.classList.add("todoFormLabelsAndInputs");
      todoForm.appendChild(todoFormLabelsAndInputs);

        const todoFormNameContainer = document.createElement("div");
        todoFormNameContainer.classList.add("TodoNameContainer");
        todoFormLabelsAndInputs.appendChild(todoFormNameContainer);

          const todoNameLabel = document.createElement("label");
          todoNameLabel.textContent = "Name: ";
          todoNameLabel.htmlFor = "todoNameInput";
          todoFormNameContainer.appendChild(todoNameLabel);

          const todoNameInput = document.createElement("input");
          todoNameInput.id = "todoNameInput";
          todoNameInput.required = true;
          todoNameInput.setAttribute("maxlength", "20");
          todoFormNameContainer.appendChild(todoNameInput);

        const todoFormDescriptionContainer = document.createElement("div");
        todoFormLabelsAndInputs.appendChild(todoFormDescriptionContainer);

          const todoDescriptionLabel = document.createElement("label");
          todoDescriptionLabel.textContent = "Description";
          todoDescriptionLabel.htmlFor = "todoDescriptionInput";
          todoFormDescriptionContainer.appendChild(todoDescriptionLabel);

          const todoDescriptionInput = document.createElement("textarea");
          todoDescriptionInput.id = "todoDescriptionInput";
          todoDescriptionInput.setAttribute("maxlength", "100");
          todoFormDescriptionContainer.appendChild(todoDescriptionInput);

        const todoFormDeadlineContainer = document.createElement("div");
        todoFormLabelsAndInputs.appendChild(todoFormDeadlineContainer);

          const todoDeadlineLabel = document.createElement("label");
          todoDeadlineLabel.textContent = "Deadline";
          todoDeadlineLabel.htmlFor = "todoDeadlineInput";
          todoFormDeadlineContainer.appendChild(todoDeadlineLabel);
          
          const todoDeadlineInput = document.createElement("input");
          todoDeadlineInput.type = "date";
          todoDeadlineInput.id = "todoDeadlineInput";
          todoFormDeadlineContainer.appendChild(todoDeadlineInput);

        const todoFormPriorityContainer = document.createElement("div");
        todoFormLabelsAndInputs.appendChild(todoFormPriorityContainer);

          const todoPriorityLabel = document.createElement("label");
          todoPriorityLabel.textContent  = "Priority";
          todoPriorityLabel.htmlFor = "todoPrioritySelect";
          todoFormPriorityContainer.appendChild(todoPriorityLabel);

          const todoPrioritySelect = document.createElement("select");
          todoPrioritySelect.id = "todoPrioritySelect";
          todoFormPriorityContainer.appendChild(todoPrioritySelect);

            const noneOption = document.createElement("option");
            noneOption.value = "none";
            noneOption.textContent = "None";
            todoPrioritySelect.appendChild(noneOption);

            const highOption = document.createElement("option");
            highOption.value = "high";
            highOption.textContent = "High";
            todoPrioritySelect.appendChild(highOption);

            const lowOption = document.createElement("option");
            lowOption.value = "low";
            lowOption.textContent = "Low";
            todoPrioritySelect.appendChild(lowOption);


      const todoFormBtns = document.createElement("div");
      todoFormBtns.classList.add("todoFormBtns");
      todoForm.appendChild(todoFormBtns);

        const submitTodoFormBtn = document.createElement("button");
        submitTodoFormBtn.textContent = "Submit";
        submitTodoFormBtn.type = "submit";
        submitTodoFormBtn.classList.add("submitTodoFormBtn");
        todoFormBtns.appendChild(submitTodoFormBtn);

        const leaveTodoFormBtn = document.createElement("button");
        leaveTodoFormBtn.textContent = "Leave";
        todoFormBtns.appendChild(leaveTodoFormBtn);


  return {todoFormDialog, todoNameInput, leaveTodoFormBtn, todoForm, todoDescriptionInput, todoDeadlineInput, todoPrioritySelect};    
  
  
};

function createTodoDom(projectContentsContainer, todoNameInput, todoDescriptionInput, todoDeadlineInput, todoPrioritySelect){

  const projectContentsTodo = document.createElement("div");
  projectContentsTodo.classList.add("projectContentsTodo");
  projectContentsContainer.appendChild(projectContentsTodo);

    const todoContentsContainer = document.createElement("div");
    todoContentsContainer.classList.add("todoContentsContainer");
    projectContentsTodo.appendChild(todoContentsContainer);

      const todoName = document.createElement("div");
      todoName.textContent = `Name: ${todoNameInput.value}`;
      todoContentsContainer.appendChild(todoName);

      const todoDescription = document.createElement("div");
      todoDescription.textContent = `Description: ${todoDescriptionInput.value}`;
      todoContentsContainer.appendChild(todoDescription);

      const todoDeadline = document.createElement("div");
      todoDeadline.textContent = `Date: ${todoDeadlineInput.value}`;
      todoContentsContainer.appendChild(todoDeadline);
      
      const todoPriority = document.createElement("div");
      todoPriority.textContent = `Priority: ${todoPrioritySelect.value}`;
      todoContentsContainer.appendChild(todoPriority);

    const todoBtnsContainer = document.createElement("div");
    todoBtnsContainer.classList.add("todoBtnsContainer");
    projectContentsTodo.appendChild(todoBtnsContainer);

      const todoEditBtn = document.createElement("button");
      todoEditBtn.classList.add("todoEditBtn");
      todoEditBtn.textContent = "Edit";
      todoBtnsContainer.appendChild(todoEditBtn);
      
      const todoCompleteBtn = document.createElement("button");
      todoCompleteBtn.textContent = "Finished";
      todoBtnsContainer.appendChild(todoCompleteBtn);

      const todoDelBtn = document.createElement("button");
      todoDelBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      todoBtnsContainer.appendChild(todoDelBtn);

  return {projectContentsTodo, todoDelBtn, todoEditBtn, todoCompleteBtn, todoContentsContainer, todoName, todoDescription, todoDeadline, todoPriority};

};

export {createProjectForm, createProjectCardDom, createTodoForm, createProjectContentsDom, createTodoDom};