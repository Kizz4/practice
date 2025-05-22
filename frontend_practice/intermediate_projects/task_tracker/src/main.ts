import './style.css'
import { toggleInteraction } from './taskTracker.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h2>Task Tracker</h2>
  <label for="create-task"></label>
  <input id="create-task" type="text" placeholder="Start writing and press enter to create task">
  <ul id="tasks-list">
    <li class="task" id="0"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>

    <li class="task" id="1"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>

    <li class="task" id="2"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>

    <li class="task" id="3"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>

    <li class="task" id="4"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>
  </ul>
`

toggleInteraction(document.querySelector<HTMLButtonElement>('#counter')!)
