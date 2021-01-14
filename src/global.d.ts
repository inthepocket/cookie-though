export {};
declare global {
  interface Window {
    cookieThough: {
      setVisible(value: boolean): void;
    };
  }
}
