import './style.css'
import {
  setList,
  createTaskAction,
  deleteTaskAction,
  toggleCompletionAction,
  setCheckboxButtonClass,
  setDeleteButtonClass
} from './taskActions.ts'

const checkboxButtonClass = "checkbox-task";
const deleteButtonClass = "remove-task";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h2>Task Tracker</h2>
  <label for="create-task"></label>
  <form id="create-task" action="">
    <label for="description">Description:</label>
    <input id="description" name="description" type="text" placeholder="Start writing and press enter to create task" >
    <input type="submit" id="input-enter" value="⮠"/>
  </form>
  <ul id="task-list"></ul>
`
const taskList = document.querySelector<HTMLUListElement>('#task-list')!;
const form = document.querySelector<HTMLFormElement>('#create-task')!;
const taskCores = document.querySelectorAll<HTMLDivElement>('.task-core')!;
const deleteButtons = document.querySelectorAll<HTMLButtonElement>('.remove-task')!;

setList(taskList);
setCheckboxButtonClass(checkboxButtonClass);
setDeleteButtonClass(deleteButtonClass);

createTaskAction(form);
deleteButtons.forEach(deleteButton => { deleteTaskAction(deleteButton) });
taskCores.forEach(taskCore => { toggleCompletionAction(taskCore) });

