import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import styles from './css/collapse.css';

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
    const sectionHeight = collapsibleDiv.current.scrollHeight;
    const elementTransition = collapsibleDiv.current.style.transition;
    collapsibleDiv.current.style.transition = '';
    requestAnimationFrame(() => {
      collapsibleDiv.current.style.height = `${sectionHeight}px`;
      collapsibleDiv.current.style.transition = elementTransition;

      requestAnimationFrame(() => {
        collapsibleDiv.current.style.height = '0px';
      });
    });
  };

  useEffect(() => {
    if (isOpen) {
      return expand();
    }
    return collapse();
  }, [isOpen]);

  return (
    <div className={styles.collapse} ref={collapsibleDiv} aria-expanded={isOpen}>
      {children}
    </div>
  );
};

export default Collapse;
