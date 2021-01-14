// Mock Browser API's which are not supported by JSDOM, e.g. ServiceWorker, LocalStorage

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItem: (key: string, value: any) => {
      store[key] = value.toString();
    },
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
