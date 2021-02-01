export const setVisible = (value: boolean) => {
  if (value) {
    return document.querySelector('.cookie-though')?.classList.add('visible');
  }
  document.querySelector('.cookie-though')?.classList.remove('visible');
};
