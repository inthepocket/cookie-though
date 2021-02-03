import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import './css/collapse.css';

interface Props {
  isOpen: boolean;
  children: ComponentChild;
}

const Collapse: FunctionalComponent<Props> = ({ isOpen, children }) => {
  const collapsibleDiv = useRef<HTMLDivElement>(null);

  const expand = () => {
    const height = collapsibleDiv.current.scrollHeight;
    collapsibleDiv.current.style.height = `${height}px`;
  };

  const collapse = () => {
    collapsibleDiv.current.style.height = '0px';
  };

  useEffect(() => {
    if (isOpen) {
      return expand();
    }
    return collapse();
  }, [isOpen]);

  return (
    <div className="ct-collapse" ref={collapsibleDiv} aria-expanded={isOpen}>
      {children}
    </div>
  );
};

export default Collapse;
