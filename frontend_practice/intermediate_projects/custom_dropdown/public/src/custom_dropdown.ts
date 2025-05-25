


export function toggleInteraction(list: HTMLUListElement, menuButton: HTMLButtonElement, status: HTMLParagraphElement) {
  let isOpen = false;
  let currentItemSelected: HTMLLIElement | null = null;
  const items = list.querySelectorAll('li');

  function toggleMenu(open?: boolean) {
    isOpen = typeof open === 'boolean' ? open : !isOpen;
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.classList.toggle('show', isOpen);
    menuButton.classList.toggle('hide', !isOpen);
    status.textContent = isOpen ? 'Menu opened' : 'Menu closed';
    items.forEach(item => item.tabIndex = isOpen ? 0 : -1);

    if (isOpen) {
      items[0].focus();
    } else {
      menuButton.focus();
    }
  }

  function toggleSelected(item: HTMLLIElement) {
    let menuButtonTextContent = "Select an Item";
    let statusTextContent = `No item selected`;

    currentItemSelected?.classList.remove("selected");
    currentItemSelected?.setAttribute('aria-selected', 'false');

    currentItemSelected = currentItemSelected !== item ? item : null;

    if (currentItemSelected !== null) {
      currentItemSelected.classList.add("selected");
      currentItemSelected.setAttribute('aria-selected', 'true');
      
      menuButtonTextContent = currentItemSelected.textContent!; 
      statusTextContent = `Selected Item : ${item.textContent}`;     
    }

    menuButton.textContent = menuButtonTextContent;
    status.textContent = statusTextContent;
  }

  toggleMenu(false);
  menuButton.addEventListener('click', () => toggleMenu());

  document.addEventListener('click', (e) => {
    if (isOpen && !menuButton.contains(e.target as Node) && !list.contains(e.target as Node)) {
      toggleMenu(false);
    }
  });

  // navigation clavier
  menuButton.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu(true);
    }
  });

  items.forEach((item: HTMLLIElement, idx: number) => {
    item.addEventListener('click', () => {
      toggleSelected(item)
      toggleMenu(false);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(idx + 1) % items.length].focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length].focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        toggleMenu(false);
      }
    });
  });

}