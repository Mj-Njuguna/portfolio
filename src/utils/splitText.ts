export function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent || '';
  const result: HTMLSpanElement[] = [];
  
  const parts = text.split(/(\s+)/);
  el.innerHTML = '';

  parts.forEach(part => {
    if (part.length === 0) return;
    
    if (/^\s+$/.test(part)) {
      // Preserve whitespace as text nodes
      el.appendChild(document.createTextNode(part));
    } else {
      // Wrap each word in a span
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.textContent = part;
      el.appendChild(span);
      result.push(span);
    }
  });

  return result;
}
