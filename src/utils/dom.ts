export const setVisible = (value: boolean) => {
  const container = document.querySelector<HTMLElement>('.cookie-though')!;
  if (value) {
    container.style.display = 'block';
    container.setAttribute('aria-hidden', 'false');
    return container.classList.add('visible');
  }
  container.setAttribute('aria-hidden', 'true');
  container.classList.remove('visible');
  setTimeout(() => (container.style.display = 'none'), 250);
};
