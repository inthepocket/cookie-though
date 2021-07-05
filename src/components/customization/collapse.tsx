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
  const collapsibleDivRef = useRef<HTMLDivElement>(null);

  const expand = useCallback((isResize = false) => {
    const { collapsedHeight, containerOffset } = getContainerHeights();
    const windowHeight = window.innerHeight;
    const collapsibleDiv = collapsibleDivRef.current as HTMLElement;
    const collapseHeight = collapsibleDiv.querySelector('.ct-policies')!.scrollHeight;

    if (isResize) {
      collapsibleDiv.style.transition = 'height 0ms ease-out';
    }

    const maxCollapseHeight = windowHeight - collapsedHeight - containerOffset;
    if (maxCollapseHeight < collapseHeight) {
      collapsibleDiv.style.height = `${maxCollapseHeight}px`;
      collapsibleDiv.style.overflow = 'scroll';
      collapsibleDiv.style.scrollBehavior = 'auto';
      collapsibleDiv.scrollTop = 0;
    } else {
      collapsibleDiv.style.height = `${collapseHeight}px`;
    }

    if (isResize) {
      setTimeout(() => (collapsibleDiv.style.transition = 'height 250ms ease-out'), 100);
    }

    setTimeout(() => collapsibleDiv.style.removeProperty('scroll-behavior'), 250);
  }, []);

  const collapse = () => {
    const collapsibleDiv = collapsibleDivRef.current as HTMLElement;
    collapsibleDiv.style.height = '0px';
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
    <div className="ct-collapse" ref={collapsibleDivRef} aria-expanded={isOpen} tabIndex={-1}>
      {children}
    </div>
  );
};

export default Collapse;
