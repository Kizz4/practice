import './style.css'
import { toggleInteraction } from './custom_dropdown.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <nav>
      <button id="dropdown-controller" 
        aria-haspopup="listbox" aria-expanded="false" aria-label="Select an Item">
        Select an Item
      </button>
      <ul id="select-items" 
        role="listbox" aria-labelledby="dropdown-controller" tabindex="-1">
          <li class="item" role="option" aria-selected="false" tabindex="-1">First Item</li>
          <li class="item" role="option" aria-selected="false" tabindex="-1">Second Item</li>
          <li class="item" role="option" aria-selected="false" tabindex="-1">Third Item</li>
          <li class="item" role="option" aria-selected="false" tabindex="-1">Fourth Item</li>
          <li class="item" role="option" aria-selected="false" tabindex="-1">Fifth Item</li>
      </ul>
      <p id="dropdown-status" class="sr-only" aria-live="polite">No item selected</p>
    </nav>
`

const menuButton = document.querySelector<HTMLButtonElement>('#dropdown-controller')!;
const list = document.querySelector<HTMLUListElement>('#select-items')!;
const status = document.querySelector<HTMLParagraphElement>('#dropdown-status')!;
toggleInteraction(list, menuButton, status);
