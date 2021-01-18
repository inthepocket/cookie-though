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
    collapsibleDiv.current.addEventListener(
      'transitioned',
      () => {
        collapsibleDiv.current.style.height = '';
      },
      { once: true },
    );

    collapsibleDiv.current.setAttribute('data-collapsed', 'false');
  };

  const collapse = () => {
    const sectionHeight = collapsibleDiv.current.scrollHeight;
    const elementTransition = collapsibleDiv.current.style.transition;
    collapsibleDiv.current.style.transition = '';
    requestAnimationFrame(function () {
      collapsibleDiv.current.style.height = `${sectionHeight}px`;
      collapsibleDiv.current.style.transition = elementTransition;

      requestAnimationFrame(function () {
        collapsibleDiv.current.style.height = '0px';
      });
    });

    collapsibleDiv.current.setAttribute('data-collapsed', 'true');
  };

  useEffect(() => {
    if (isOpen) {
      return expand();
    }
    return collapse();
  }, [isOpen]);

  return (
    <div className={styles.collapse} ref={collapsibleDiv}>
      {children}
    </div>
  );
};

export default Collapse;
