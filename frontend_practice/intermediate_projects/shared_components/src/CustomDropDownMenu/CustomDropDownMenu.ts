import './CustomDropDownMenu.css';
import { createHTMLElement } from '../utils/reusableFunctions';


export class CustomDropDownMenu {
  private menu: HTMLElement;
  private button: HTMLButtonElement;
  private list: HTMLUListElement;
  private status: HTMLParagraphElement;
  private items: HTMLLIElement[] = [];
  private isOpen = false;
  private defaultButtonText: string;

  constructor(private contents: string[], defaultButtonText = 'Select an Item') {
    this.defaultButtonText = defaultButtonText;
    this.menu = createHTMLElement('nav', { id: 'cddm-menu' });

    this.button = createHTMLElement(
      'button',
      {
        id: 'cddm-controller',
        'aria-haspopup': 'listbox',
        'aria-expanded': 'false',
        'aria-label': this.defaultButtonText
      },
      this.defaultButtonText
    );

    this.list = createHTMLElement('ul', {
      id: 'cddm-list',
      class: 'cddm-list',
      role: 'listbox',
      tabindex: '-1',
      'aria-labelledby': 'cddm-button'
    });

    this.status = createHTMLElement('p',
      { id: 'cddm-status', 'aria-live': 'polite' },
      'No item selected'
    );

    this.menu.append(this.button, this.list, this.status);

    this.setMenuContents(contents);
    this.attachListeners();
  }

  public getMenu(): HTMLElement {
    return this.menu;
  }

  private createElementList(content: string): HTMLLIElement {
    const li = createHTMLElement('li',{
          class: 'cddm-item',
          role: 'option',
          tabindex: '-1',
          'aria-selected': 'false'
        },
        content
      );
    return li;
  }

  public appendElementToMenu(content: string): void {
    const li = this.createElementList(content);
    this.list.appendChild(li);
    this.items.push(li);
    this.attachItemListener(li, (this.items.length-1))
  }

  public setMenuContents(contents: string[], isMenuOpen?: boolean): void {
    this.isOpen = typeof isMenuOpen === "boolean" ? isMenuOpen : this.isOpen;

    this.list.innerHTML = '';
    this.items = [];

    contents.forEach(content => { this.appendElementToMenu(content) });

    this.toggleMenu(this.isOpen);
    if (this.isOpen) this.items[0].focus(); 
  }

  private toggleMenu(open?: boolean): void {
    this.isOpen = typeof open === 'boolean' ? open : !this.isOpen;
    this.button.setAttribute('aria-expanded', String(this.isOpen));
    this.button.classList.toggle('cddm-show', this.isOpen);
    this.button.classList.toggle('cddm-hide', !this.isOpen);
    this.status.textContent = this.isOpen ? 'Menu opened' : 'Menu closed';

    this.items.forEach(item => {
      item.tabIndex = this.isOpen ? 0 : -1;
    });

    if (this.isOpen) {
      this.items[0]?.focus();
    } else {
      this.button.focus();
    }
  }

  private toggleSelected(item: HTMLLIElement): void {
    const prev = this.items.find(li => li.classList.contains('cddm-selected'));
    if (prev) {
      prev.classList.remove('cddm-selected');
      prev.setAttribute('aria-selected', 'false');
    }

    const isSame = prev === item;

    if (!isSame) {
      item.classList.add('cddm-selected');
      item.setAttribute('aria-selected', 'true');
      this.button.textContent = item.textContent || this.defaultButtonText;
      this.status.textContent = `Selected Item: ${item.textContent}`;

    } else {
      this.button.textContent = this.defaultButtonText;
      this.status.textContent = 'No item selected';
    }
  }

  private attachItemListener(item: HTMLLIElement, idx: number): void {
    item.addEventListener('click', () => {
      this.toggleSelected(item);
      this.toggleMenu(false);
    });

    item.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.items[(idx + 1) % this.items.length].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.items[(idx - 1 + this.items.length) % this.items.length].focus();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          item.click();
          break;
        case 'Escape':
          e.preventDefault();
          this.toggleMenu(false);
          break;
      }
    });
  }

  private attachListeners(): void {
    this.button.addEventListener('click', () => this.toggleMenu());

    document.addEventListener('click', e => {
      if (
        this.isOpen &&
        !this.button.contains(e.target as Node) &&
        !this.list.contains(e.target as Node)
      ) {
        this.toggleMenu(false);
      }
    });

    this.button.addEventListener('keydown', e => {
      if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        this.toggleMenu(true);
      }
    });
  }
}
