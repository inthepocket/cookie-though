import { ComponentChildren, createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

const ContainerContext = createContext<HTMLElement | undefined>(undefined);

interface Props {
  container: HTMLElement;
  children: ComponentChildren;
}

const ContainerProvider = ({ container, children }: Props) => {
  const [value] = useState(() => container);

  return <ContainerContext.Provider value={value}>{children}</ContainerContext.Provider>;
};

const useContainer = () => {
  const container = useContext(ContainerContext);

  if (container === undefined) {
    throw new Error('useContainer must be used within a ContainerProvider');
  }

  return container;
};

export { ContainerContext, ContainerProvider, useContainer };
