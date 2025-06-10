import './style.css'
import { CustomDropDownMenu } from 'sharable';
import "sharable/dist/sharable.css"

const listContent = ["First Item", "Second Item", "Third Item", "Fourth Item", "Fifth Item", "Sixth Item", "Seventh Item"]
const customDropDownMenu = new CustomDropDownMenu(listContent, "Select an Item", 5, true, "Make your search here");

document.querySelector<HTMLDivElement>('#app')!.appendChild(customDropDownMenu.menu);
