import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useRef } from 'preact/hooks';
import useWindowResize from '../../hooks/useWindowResize';
import getContainerHeights from '../../utils/getContainerHeights';
import './css/collapse.css';

interface Props {
  isOpen: boolean;
  children: ComponentChild;
  onWindowResize(): void;
}

const Collapse: FunctionalComponent<Props> = ({ isOpen, children, onWindowResize }) => {
  const collapsibleDiv = useRef<HTMLDivElement>(null);

  const expand = useCallback((isResize = false) => {
    const { collapsedHeight, containerOffset } = getContainerHeights();
    const windowHeight = window.innerHeight;
    const collapseHeight = collapsibleDiv.current.scrollHeight;

    if (isResize) {
      collapsibleDiv.current.style.transition = 'height 0ms ease-out';
    }

    const maxCollapseHeight = windowHeight - collapsedHeight - containerOffset;
    if (maxCollapseHeight < collapseHeight) {
      collapsibleDiv.current.style.height = `${maxCollapseHeight}px`;
      collapsibleDiv.current.style.overflow = 'scroll';
      collapsibleDiv.current.style.scrollBehavior = 'auto';
      collapsibleDiv.current.scrollTop = 0;
    } else {
      collapsibleDiv.current.style.height = `${collapseHeight}px`;
    }

    if (isResize) {
      setTimeout(() => (collapsibleDiv.current.style.transition = 'height 250ms ease-out'), 100);
    }

    setTimeout(() => collapsibleDiv.current.style.removeProperty('scroll-behavior'), 250);
  }, []);

  const collapse = () => {
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
    <div className="ct-collapse" ref={collapsibleDiv} aria-expanded={isOpen} tabIndex={-1}>
      {children}
    </div>
  );
};

export default Collapse;
