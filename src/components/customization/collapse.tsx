import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import useWindowResize from '../../hooks/useWindowResize';
import './css/collapse.css';

interface Props {
  isOpen: boolean;
  children: ComponentChild;
  onWindowResize(): void;
}

const Collapse: FunctionalComponent<Props> = ({ isOpen, children, onWindowResize }) => {
  const collapsibleDiv = useRef<HTMLDivElement>(null);
  const [initialHeight, setInitialHeight] = useState<number | null>(null);

  const expand = useCallback(
    (isResize = false) => {
      const rootNode = document.querySelector('.visible') as HTMLDivElement;
      const { height, bottom } = window.getComputedStyle(rootNode);
      if (initialHeight === null) {
        setInitialHeight(+height.slice(0, -2));
      }
      const windowHeight = window.innerHeight;
      const collapseHeight = collapsibleDiv.current.scrollHeight;

      const rootHeight = +height.slice(0, -2);
      const rootPadding = +bottom.slice(0, -2) * 2;
      const containerHeight = isResize ? initialHeight! + rootPadding : rootHeight + rootPadding;

      if (isResize) {
        collapsibleDiv.current.style.transition = 'height 0ms ease-out';
      }

      const maxCollapseHeight = windowHeight - containerHeight;
      if (maxCollapseHeight < collapseHeight) {
        collapsibleDiv.current.style.height = `${maxCollapseHeight}px`;
        collapsibleDiv.current.style.overflow = 'scroll';
      } else {
        collapsibleDiv.current.style.height = `${collapseHeight}px`;
      }

      if (isResize) {
        setTimeout(() => (collapsibleDiv.current.style.transition = 'height 250ms ease-out'), 100);
      }
    },
    [initialHeight],
  );

  const collapse = () => {
    collapsibleDiv.current.scrollTop = 0;
    collapsibleDiv.current.style.height = '0px';
  };

  const handleWindowResize = () => {
    onWindowResize();
    if (isOpen) {
      return expand(true);
    }
  };
  useWindowResize(handleWindowResize);

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
