import './CustomDropDownMenu.css';
import { createHTMLElement } from '../utils/reusableFunctions';


export class CustomDropDownMenu {
  private menu: HTMLElement;
  private button: HTMLButtonElement;
  private searchBar: HTMLFormElement | undefined;
  private list: HTMLUListElement;
  private status: HTMLParagraphElement;
  private items: HTMLLIElement[] = [];
  private isOpen = false;
  private defaultButtonText: string;
  private maxItemDisplayable: number;

  constructor(
    private contents: string[],
    defaultButtonText: string = 'Select an Item',
    maxItemDisplayable: number = 5,
    withSearchBar: boolean = false,
    searchPlaceHolder: string = "") {

    this.defaultButtonText = defaultButtonText;
    this.maxItemDisplayable = maxItemDisplayable;

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
      { id: 'cddm-status', class: 'sr-only', 'aria-live': 'polite' },
      'No item selected'
    );

    if (withSearchBar) {
      const label = createHTMLElement(
        'label',
        { for: 'search-input', class: 'sr-only' },
        "Search :"
      );

      const input =
        createHTMLElement(
          'input',
          {
            id: 'search-input',
            name: 'search-input',
            class: "focusable",
            placeholder: searchPlaceHolder,
          },
        );
      const searchIcon = createHTMLElement(
        'img',
        { id: 'search-icon', src: "CustomDropDownMenu/search_icon.png", alt: "search icon" }
      );

      this.searchBar = createHTMLElement(
        'form',
        {
          id: 'cddm-search',
          name: 'cddm-search',
          class: 'on-focus',
          'aria-role': 'searchbar',
        },
      );


      this.searchBar.append(label, input, searchIcon);
      this.menu.append(this.button, this.searchBar, this.list, this.status);

      this.attachSearchBarListener(input);

    } else this.menu.append(this.button, this.list, this.status);



    this.setMenuContents(contents);
    this.attachListeners();
    this.addListMaxHeight();
  }

  public getMenu(): HTMLElement { return this.menu; }
  public getSearchForm(): HTMLFormElement | undefined { return this.searchBar; }
  public getSearchInput(): HTMLInputElement | null | undefined { return this.searchBar?.querySelector("#search-input");}
  public getDefaultButtonText(): string { return this.defaultButtonText; }
  public getMaxItemDisplayable(): number { return this.maxItemDisplayable; }

  public setDefaultButtonText(defaultButtonText: string): void { this.defaultButtonText = defaultButtonText; }
  public setMaxItemDisplayable(maxItemDisplayable: number): void {
    this.maxItemDisplayable = maxItemDisplayable;
    this.addListMaxHeight();
  }


  private addListMaxHeight() {
    const style = window.getComputedStyle(this.list);

    const properties = [
      "height",
      "paddingTop",
      "paddingBottom",
      "marginTop",
      "marginBottom",
      "borderTopWidth",
      "borderBottomWidth"
    ];

    const units: Record<string, number[]> = {};

    for (const prop of properties) {
      const value = style.getPropertyValue(prop);
      const match = value.trim().match(/^([0-9.]+)([a-z%]+)$/i);
      if (match) {
        const num = parseFloat(match[1]);
        const unit = match[2];
        if (!units[unit]) units[unit] = [];
        units[unit].push(num);
      }
    }

    const calcParts = Object.entries(units).map(
      ([unit, values]) => `${values.reduce((a, b) => a + b, 0)}${unit}`
    );
    this.list.style.maxHeight = `calc(${calcParts.join(" + ")})`;

  }

  private createElementList(content: string): HTMLLIElement {
    const li = createHTMLElement('li', {
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
    this.attachItemListener(li, (this.items.length - 1))
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
      let firstHiddenElement = this.menu
        .firstElementChild!
        .nextElementSibling! as HTMLElement;
      if (this.searchBar) firstHiddenElement = firstHiddenElement.querySelector("#search-input") as HTMLElement;

      firstHiddenElement.focus();
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

  private attachSearchBarListener(input: HTMLInputElement) {
    input.addEventListener("focus", () => {
      this.searchBar!.classList.add("on-focus");
      input.style.border = "none";
    });

    input.addEventListener("blur", () => {
      this.searchBar!.classList.remove("on-focus");
      input.style.border = "none";
    });
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
      if (this.isOpen) {
        let isStillOpen = false;
        Array.from(this.menu.children).forEach(child => {
          isStillOpen = child.contains(e.target as Node) || isStillOpen;
        });
        this.toggleMenu(isStillOpen);
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
