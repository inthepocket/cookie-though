const clearCookies = () => {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const position = cookie.indexOf('=');
    const name = position > -1 ? cookie.substr(0, position) : cookie;
    document.cookie = name + `=;expires=${new Date(0).toUTCString()}`;
  });
};

export default clearCookies;
