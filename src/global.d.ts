export {};
declare global {
  interface Window {
    cookieThough: {
      setVisible(value: boolean): void;
    };
  }
}

export interface FunctionalComponent<Props> {
  (props: Props): JSX.Element;
}
