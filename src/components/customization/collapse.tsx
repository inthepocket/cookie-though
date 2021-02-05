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
    const container = document.querySelector('.cookie-though') as HTMLElement;
    const maxHeight = window.innerHeight;
    const collapsibleDivHeight = collapsibleDiv.current.scrollHeight;

    const containerHeight = +window.getComputedStyle(container).height.slice(0, -2);
    const containerBottom = +window.getComputedStyle(container, ':host').bottom.slice(0, -2);
    const newHeigth = maxHeight - containerHeight - containerBottom * 4;

    if (newHeigth < collapsibleDivHeight) {
      collapsibleDiv.current.style.height = `${newHeigth}px`;
      collapsibleDiv.current.style.overflow = 'scroll';
    } else {
      collapsibleDiv.current.style.height = `${collapsibleDivHeight}px`;
    }
  };

  const collapse = () => {
    collapsibleDiv.current.scrollTo(0, 0);
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
