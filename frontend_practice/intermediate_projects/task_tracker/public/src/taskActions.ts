import { TaskListFactory } from '@/factories/TaskListFactory';
import { TaskFactory } from '@/factories/TaskFactory';
import { Task } from '@/models/Task';




const taskList = TaskListFactory.from();

let taskListHTML: HTMLUListElement | null = null;
let checkboxButtonClass: string = "";
let deleteButtonClass: string = "";


export function setList(list: HTMLUListElement):void { taskListHTML = list; }
export function setCheckboxButtonClass(newClass: string):void { checkboxButtonClass = newClass; }
export function setDeleteButtonClass(newClass: string):void {deleteButtonClass = newClass; }

// ====================== RENDERING ====================
function createLiHTMLTask(task: Task) {
  const li = document.createElement('li');
  li.className = 'task';
  li.id = String(task.getID());

  const taskCore = document.createElement('div');
  taskCore.className = `task-core ${task.getIsComplete() ? 'complete' : ''}`;

  const checkbox = document.createElement('button');
  checkbox.className = checkboxButtonClass;
  checkbox.role = "checkbox";
  checkbox.ariaChecked = `${task.getIsComplete()}`;

  const description = document.createElement('p');
  description.textContent = task.getDescription();

  taskCore.appendChild(checkbox);
  taskCore.appendChild(description);

  const deleteButton = document.createElement('button');
  deleteButton.className = deleteButtonClass;


  li.appendChild(taskCore);
  li.appendChild(deleteButton);

  taskListHTML!.appendChild(li);

  setKeyboardInteraction([checkbox, deleteButton]);
  deleteTaskAction(deleteButton);
  toggleCompletionAction(taskCore);
}

function renderTasks() {
  if (taskListHTML) {
    taskListHTML.innerHTML = "";
    taskList.orderTasksByCompletedLast().forEach((task: Task) => {
      createLiHTMLTask(task);
    });
  }
}

// ====================== ACTION ====================


export function createTaskAction(form: HTMLFormElement) {
  setKeyboardInteraction([form]);

  const newTask = (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(form);
    const description = formData.get('description') as string;

    const input = form.querySelector('input[id="description"]') as HTMLInputElement;
    if (input) input.value = '';

    const task = TaskFactory.from(description);

    taskList.push(task);
    renderTasks();
  }

  form.addEventListener('submit', newTask);
}

export function deleteTaskAction(deleteButton: HTMLButtonElement) {
  const removeTask = () => {
    const li = deleteButton.parentElement!;
    const id = parseInt(li.id);

    taskList.removeById(id);
    renderTasks();

  }
  deleteButton.addEventListener('click', () => removeTask());
}

export function toggleCompletionAction(taskCore: HTMLDivElement) {
  const toggle = () => {
    const li = taskCore.parentElement!;
    const id = parseInt(li.id);
    const task = taskList.getTaskById(id);
    taskList.toggleCompleteById(id);
    taskCore.querySelector<HTMLButtonElement>(".checkbox-task")!.ariaChecked = `${task.getIsComplete()}`;

    renderTasks();
  }

  taskCore.addEventListener('click', () => toggle());
}


// ====================== KEYBOARD NAVIGATION ====================
function enableKeyboardInteractionForm(form: HTMLFormElement) {
  const submitInput = form.querySelector<HTMLInputElement>("#input-enter")!;

  const setKeyboardInteraction = (e: KeyboardEvent) =>{
    const descriptionInput = form.querySelector<HTMLInputElement>("#description")!;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key.toLowerCase() === 'q' || e.key.toLowerCase() === 's'
      || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key.toLowerCase() === 'd' || e.key.toLowerCase() === 'z') {
      descriptionInput.focus();
    } 
  }
  
  submitInput.addEventListener("keydown", setKeyboardInteraction)
}

function getSiblingsTaskID(task: HTMLLIElement) {
  
  let previousTask = task.previousElementSibling;
  if (previousTask === null) previousTask = task.parentElement!.lastElementChild!;

  let nextTask = task.nextElementSibling;
  if (nextTask === null) nextTask = task.parentElement!.firstElementChild!;

  return { previousTaskID: previousTask.id,
           nextTaskID: nextTask.id, };
}


function enableKeyboardInteractionTaskButtons(button: HTMLButtonElement, className: string) {
  const setKeyboardInteraction = (e: KeyboardEvent) =>{
    const otherButtonClassName = className === deleteButtonClass ? checkboxButtonClass : deleteButtonClass;
    let targetTask = button.parentElement!;

    while (!(targetTask instanceof HTMLLIElement)) {
      targetTask = targetTask.parentElement!;
    }

    const { previousTaskID, nextTaskID } = getSiblingsTaskID(targetTask);
    
    if (e.key === 'Enter' || e.key === 'ArrowUp' || e.key.toLowerCase() === 'z') {
      if (e.key === "Enter") {
        e.preventDefault();
        button.click();
      }      

      const previousTask = document.querySelector<HTMLLIElement>(`[id="${previousTaskID}"]`)!;
      const previousButton = previousTask.querySelector<HTMLButtonElement>(`.${className}`)!;
      previousButton.focus();
    }

    if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
      const nextTask = document.querySelector<HTMLLIElement>(`[id="${nextTaskID}"]`)!;
      const nextButton = nextTask.querySelector<HTMLButtonElement>(`.${className}`)!;
      nextButton.focus();
    }

    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'q' || e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
      const siblingButton = targetTask.querySelector<HTMLButtonElement>(`.${otherButtonClassName}`)!;
      siblingButton.focus();
    }
  }

  button.addEventListener("keydown", setKeyboardInteraction)
}


function setKeyboardInteraction(elements: HTMLElement[]) {
  elements.forEach(element => {
    if (element instanceof HTMLFormElement) enableKeyboardInteractionForm(element);
    if (element instanceof HTMLButtonElement) enableKeyboardInteractionTaskButtons(element, element.classList[0]);
  });

}


