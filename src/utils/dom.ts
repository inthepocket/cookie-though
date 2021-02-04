export const setVisible = (value: boolean) => {
  const container = document.querySelector('.cookie-though');
  if (value) {
    container?.removeAttribute('tabindex');
    return container?.classList.add('visible');
  }
  container?.setAttribute('tabindex', '-1');
  container?.classList.remove('visible');
};
