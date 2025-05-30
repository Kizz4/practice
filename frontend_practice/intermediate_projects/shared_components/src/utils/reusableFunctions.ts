export function createHTMLElement<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, text?: string): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {element.setAttribute(key, value);});

  if (text !== undefined) element.textContent = text;
  
  return element;
}
