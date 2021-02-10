import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import './css/collapse.css';

interface Props {
  isOpen: boolean;
  children: ComponentChild;
}

const Collapse: FunctionalComponent<Props> = ({ isOpen, children }) => {
  const collapsibleDiv = useRef<HTMLDivElement>(null);

  const collapse = () => {
    collapsibleDiv.current.scrollTop = 0;
    collapsibleDiv.current.style.height = '0px';
  };

  useEffect(() => {
    const expand = () => {
      const rootNode = document.querySelector('.visible') as HTMLDivElement;
      const { height, bottom } = window.getComputedStyle(rootNode);
      const windowHeight = window.innerHeight;
      const collapseHeight = collapsibleDiv.current.scrollHeight;

      const rootHeight = +height.slice(0, -2);
      const rootPadding = +bottom.slice(0, -2) * 2;
      const containerOffset = +bottom.slice(0, -2) * 2;
      const containerHeight = rootHeight + rootPadding;

      const maxCollapseHeight = windowHeight - containerHeight - containerOffset;
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
  }, [isOpen]);

  return (
    <div className="ct-collapse" ref={collapsibleDiv} aria-expanded={isOpen}>
      {children}
    </div>
  );
};

export default Collapse;
