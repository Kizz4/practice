import './CustomDropDownMenu.css';
import { createHTMLElement } from '../../index';
import searchIconUrl from './search_icon.png';
import checkIconUrl from './check_icon.png';



export class CustomDropDownMenu extends EventTarget{
  private _menu: HTMLElement;
  private button: HTMLButtonElement;
  private searchBar: HTMLDivElement | undefined;
  private list: HTMLUListElement;
  private status: HTMLParagraphElement;
  private items: HTMLLIElement[] = [];
  private isOpen = false;
  private defaultButtonText: string;
  private maxItemDisplayable: number;

  constructor(
    contents: string[],
    defaultButtonText: string = 'Select an Item',
    maxItemDisplayable: number = 5,
    withSearchBar: boolean = false,
    searchPlaceHolder: string = "") 
  {
    super();
    this.defaultButtonText = defaultButtonText;
    this.maxItemDisplayable = maxItemDisplayable;

    this._menu = createHTMLElement('nav', { id: 'cddm-menu' });


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

    const listWrapper = createHTMLElement("div", {
      id: "cddm-list-wrapper",
    });
    this.list = createHTMLElement('ul', {
      id: 'cddm-list',
      class: 'cddm-list',
      role: 'listbox',
      tabindex: '-1',
      'aria-labelledby': 'cddm-button'
    });

    listWrapper.appendChild(this.list);


    this.status = createHTMLElement('p',
      { id: 'cddm-status', class: 'sr-only', 'aria-live': 'polite' },
      'No item selected'
    );


    if (withSearchBar) {
      this.initSearchBar(searchPlaceHolder);
      this._menu.append(this.button, this.searchBar!, listWrapper, this.status);

    } else this._menu.append(this.button, listWrapper, this.status);


    this.setMenuContents(contents);
    this.attachListeners();
  }



  public get menu(): HTMLElement {return this._menu; }
  public getSearchInput(): HTMLInputElement | null | undefined { return this.searchBar?.querySelector("#search-input"); }

  public setDefaultButtonText(defaultButtonText: string): void { this.defaultButtonText = defaultButtonText; }
  public setMaxItemDisplayable(maxItemDisplayable: number): void {
    this.maxItemDisplayable = maxItemDisplayable;
    this.addListMaxHeight();
  }

  private emitSelection(value: string) {
    this.dispatchEvent(new CustomEvent("menu:selected", { detail: { value } }));
  }


  private initSearchBar(searchPlaceHolder: string) {
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
          list: "items-suggestion",
          placeholder: searchPlaceHolder,
        },
      );

    const searchIcon = createHTMLElement(
      'img',
      { id: 'search-icon', src: searchIconUrl, alt: "search icon" }
    );

    const dataList = createHTMLElement('datalist', { id: 'items-suggestion' });

    const errorFeedback = createHTMLElement('p', {id:'cddm-error-feedback', class:"hidden"});

    const form = createHTMLElement(
      'form',
      {
        id: 'cddm-form-search',
      },
    );

    this.searchBar = createHTMLElement(
      'div',
      {
        id: 'cddm-search',
        'aria-role': 'searchbar',
      },
    );


    form.append(label, input, searchIcon, dataList);
    this.searchBar.append(form, errorFeedback);

  }



  private createItemList(content: string): HTMLLIElement {
    const li = createHTMLElement('li', {
      class: 'cddm-item',
      role: 'option',
      tabindex: '-1',
      'aria-selected': 'false'
    },
      content
    );

    const checkIcon = createHTMLElement('img',
      { id: 'check-icon', src: checkIconUrl, alt: "check icon" }
    );

    li.appendChild(checkIcon);
    return li;
  }





  public appendElementToMenu(content: string): void {
    const li = this.createItemList(content);
    this.list.appendChild(li);
    this.items.push(li);
    this.attachItemListener(li, (this.items.length - 1))
  }



  public appendInputSuggestion(item: string, datalist?: HTMLDataListElement) {
    if (!datalist) return;

    const option = createHTMLElement("option", { value: item });
    datalist.append(option);
  }



  public setMenuContents(contents: string[], isMenuOpen?: boolean): void {
    const datalist = this.searchBar?.querySelector("#items-suggestion") as HTMLDataListElement | undefined;
    if(datalist) datalist.innerHTML = '';

    this.isOpen = typeof isMenuOpen === "boolean" ? isMenuOpen : this.isOpen;

    this.list.innerHTML = '';
    this.items = [];

    contents.forEach(content => {
      this.appendElementToMenu(content);
      this.appendInputSuggestion(content, datalist)
    });

    this.toggleMenu(this.isOpen);
    if (this.isOpen) this.items[0].focus();
  }




  private addListMaxHeight() {
    const children = this.list.children as HTMLCollectionOf<HTMLElement>
    const elements = Array.from(children);

    const properties = ["height"];
    const units: Record<string, number[]> = {};


    for (const prop of properties) {
      for (const element of elements) {

        const style = window.getComputedStyle(element)
        const value = style.getPropertyValue(prop);
        const match = value.trim().match(/^([0-9.]+)([a-z%]+)$/i);
        if (match) {
          const num = parseFloat(match[1]);
          const unit = match[2];
          if (!units[unit]) units[unit] = [];
          units[unit].push(num);
        }
      }
    }
    const percentageFactor = this.maxItemDisplayable / elements.length
    const calcParts = Object.entries(units).map(
      ([unit, values]) => `${values.reduce((a, b) => a + b, 0)}${unit}`
    );

    this.list.style.maxHeight = `calc((${calcParts.join(" + ")}) * ${percentageFactor})`;
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
      this.addListMaxHeight();
      this.addScrollableHint(this.list);

      let firstHiddenElement = this.list.firstChild! as HTMLElement;
      if (this.searchBar) firstHiddenElement = this.searchBar.querySelector("#search-input") as HTMLElement;

      firstHiddenElement.focus();
    } else {
      this.button.focus();
    }
  }





  private toggleSelected(item: HTMLLIElement, canRemoveSelected:boolean=true): void {
    const prev = this.items.find(li => li.classList.contains('cddm-selected'));
    if (prev) {
      prev.classList.remove('cddm-selected');
      prev.setAttribute('aria-selected', 'false');
    }

    const isSame = prev === item && canRemoveSelected;

    if (!isSame) {
      item.classList.add('cddm-selected');
      item.setAttribute('aria-selected', 'true');
      this.button.textContent = item.textContent || this.defaultButtonText;
      this.status.textContent = `Selected Item: ${item.textContent}`;

      this.emitSelection(item.textContent!);

    } else {
      this.button.textContent = this.defaultButtonText;
      this.status.textContent = 'No item selected';
    }

    this.toggleMenu();
  }






  private attachItemListener(item: HTMLLIElement, idx: number): void {
    item.addEventListener('click', () => {
      this.toggleSelected(item);
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
    this.attachSearchBarListener();
    this.attachScrollableListListener();
    this.attachMenuToggleListener();
  }


  private attachSearchBarListener(): void {
    if (!this.searchBar) return;
    const formSearch = this.searchBar.querySelector("#cddm-form-search")! as HTMLFormElement;
    const children = formSearch.children as HTMLCollectionOf<HTMLElement>;

    Array.from(children).forEach((child) => {
      child.addEventListener("focus", () => {
        formSearch.classList.add("on-focus");
        child.style.border = "none";
      });

      child.addEventListener("blur", () => {
        formSearch.classList.remove("on-focus");
        child.style.border = "none";
      });
    });


    formSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(formSearch);
      const request = formData.get('search-input') as string;

      const selectedItem = this.items.filter(item => item.textContent === request);
      const errorFeedback = this.searchBar!.querySelector("#cddm-error-feedback")!;

      const input = formSearch.querySelector('#search-input')! as HTMLInputElement;
      input.value = '';

      if(!selectedItem.length){
        errorFeedback.textContent = `${request} is not a selectable item`;
        errorFeedback.classList.remove("hidden");

      }else{
        errorFeedback.classList.add("hidden");
        this.toggleSelected(selectedItem[0], false);
      }
    });
  }




  private checkOverflow(el: HTMLElement) {
    const { scrollTop, scrollHeight, clientHeight } = el;

    const hiddenAbove = scrollTop > 0;
    const hiddenBelow = scrollTop + clientHeight < scrollHeight;

    return { hiddenAbove, hiddenBelow };
  }




  private addScrollableHint(element: HTMLElement) {
    const { hiddenAbove, hiddenBelow } = this.checkOverflow(this.list);
    if (hiddenAbove) {
      element.classList.add("scrollable-to-top");

    } else element.classList.remove("scrollable-to-top");

    if (hiddenBelow) {
      element.classList.add("scrollable-to-bottom");

    } else element.classList.remove("scrollable-to-bottom");
  }




  private attachScrollableListListener(): void {
    this.list.addEventListener("scroll", () => {
      this.addScrollableHint(this.list);
    });
  }




  private attachMenuToggleListener(): void {
    this.button.addEventListener('click', () => this.toggleMenu());

    document.addEventListener('click', e => {
      if (this.isOpen) {
        let isStillOpen = false;
        Array.from(this._menu.children).forEach(child => {
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
