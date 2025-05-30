import './style.css'
import { CustomDropDownMenu } from 'shared_components';

const listContent = ["First Item", "Second Item", "Third Item", "Fourth Item", "Fifth Item"]
const customDropDownMenu = new CustomDropDownMenu(listContent);

document.querySelector<HTMLDivElement>('#app')!.appendChild(customDropDownMenu.getMenu());
