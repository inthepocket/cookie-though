import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { RootStyles } from '../app';
import './css/collapse.css';

interface Props {
  rootStyles: RootStyles;
  isOpen: boolean;
  children: ComponentChild;
}

const Collapse: FunctionalComponent<Props> = ({ rootStyles, isOpen, children }) => {
  const collapsibleDiv = useRef<HTMLDivElement>(null);

  const collapse = () => {
    collapsibleDiv.current.scrollTop = 0;
    collapsibleDiv.current.style.height = '0px';
  };

  useEffect(() => {
    const expand = () => {
      const windowHeight = window.innerHeight;
      const collapseHeight = collapsibleDiv.current.scrollHeight;
      const rootHeight = rootStyles.height;
      const rootPadding = rootStyles.bottom * 4;

      const maxCollapseHeight = windowHeight - rootHeight - rootPadding;
      if (maxCollapseHeight < collapseHeight) {
        collapsibleDiv.current.style.height = `${maxCollapseHeight}px`;
        collapsibleDiv.current.style.overflow = 'scroll';
      } else {
        collapsibleDiv.current.style.height = `${collapseHeight}px`;
      }
    };

    if (isOpen) {
      return expand();
    }
    return collapse();
  }, [isOpen, rootStyles]);

  return (
    <div className="ct-collapse" ref={collapsibleDiv} aria-expanded={isOpen}>
      {children}
    </div>
  );
};

export default Collapse;
