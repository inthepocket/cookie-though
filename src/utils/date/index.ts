export const getNextYear = () => {
  const now = new Date();

  return new Date(now.setFullYear(now.getFullYear() + 1)).toUTCString();
};
