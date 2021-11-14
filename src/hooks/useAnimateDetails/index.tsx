import { RefObject } from 'preact';
import { useCallback, useEffect, useLayoutEffect, useState } from 'preact/hooks';

import { getContainer } from '../../utils/container';
import usePrefersReducedMotion from '../usePrefersReducedMotion';
import useTransitionDuration from '../useTransitionDuration';

const CLOSED_SIZE = '0px';
const easing = 'ease-in-out';
let wantedHeight = 0;
let contentMarginBottom = 0;

export const getFloat = (element: HTMLElement, key: 'height' | 'marginBottom') => {
  const value = window.getComputedStyle(element)[key];

  if (value === 'auto' || value === '') return 0;
  return parseFloat(value);
};

const getOffset = (element: HTMLElement) => {
  return getFloat(element, 'height') + getFloat(element, 'marginBottom');
};

const getOpenHeight = (details: HTMLDetailsElement) => {
  const wantedOffset = wantedHeight + contentMarginBottom;
  const header = details.previousElementSibling as HTMLElement;
  const summary = details.querySelector('summary')!;
  const acceptance = details.nextElementSibling as HTMLDivElement;

  const headerOffset = getOffset(header);
  const summaryOffset = getOffset(summary);
  const acceptanceOffset = getOffset(acceptance);
  const bannerOffset = parseInt(getComputedStyle(getContainer()!).paddingBottom, 10) * 4;

  const maxOffset =
    window.innerHeight - headerOffset - summaryOffset - acceptanceOffset - bannerOffset;
  const maxHeight = maxOffset - bannerOffset / 4;
  const hasOverflow = wantedOffset > maxOffset;
  const openHeight = `${hasOverflow ? maxHeight : wantedHeight}px`;

  return { hasOverflow, openHeight, maxHeight: `${maxHeight}px` };
};

type AnimateParams = {
  details: HTMLDetailsElement;
  isOpen: boolean;
};

const useAnimateDetails = (detailsRef: RefObject<HTMLDetailsElement>) => {
  const [details, setDetails] = useState<HTMLDetailsElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const duration = useTransitionDuration();

  useEffect(() => {
    if (!detailsRef.current) return;

    setDetails(detailsRef.current);
  }, [details, detailsRef]);

  const toggleDetails = useCallback(() => {
    const content = details!.querySelector<HTMLDivElement>('.content')!;
    const { maxHeight } = getOpenHeight(details!);
    content.style.maxHeight = maxHeight;
    content.style.overflowY = 'scroll';
    setIsOpen((prevState) => !prevState);
  }, [details]);

  const animateDetails = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const content = details!.querySelector<HTMLDivElement>('.content')!;

      const animate = ({ details, isOpen }: AnimateParams) => {
        const content = details.querySelector<HTMLDivElement>('.content')!;
        const { openHeight, hasOverflow } = getOpenHeight(details);
        const height = isOpen ? [CLOSED_SIZE, openHeight] : [openHeight, CLOSED_SIZE];

        const animation = content.animate({ height }, { duration, easing });
        animation.onfinish = () => {
          if (!isOpen) {
            details.open = isOpen;
            setIsOpen(isOpen);
            return content.removeAttribute('style');
          }

          content.style.height = openHeight;
          content.style.marginBottom = `${contentMarginBottom}px`;

          return hasOverflow
            ? (content.style.overflowY = 'scroll')
            : content.style.removeProperty('overflowY');
        };
      };

      const closeDetails = () => {
        return window.requestAnimationFrame(() => animate({ details: details!, isOpen: false }));
      };

      const openDetails = () => {
        const content = details!.querySelector<HTMLDivElement>('.content')!;

        details!.open = true;
        setIsOpen(true);
        wantedHeight = getFloat(content, 'height');
        contentMarginBottom = getFloat(content, 'marginBottom');
        content.style.height = CLOSED_SIZE;
        content.style.marginBottom = CLOSED_SIZE;
        window.requestAnimationFrame(() => animate({ details: details!, isOpen: true }));
      };

      content.style.overflow = 'hidden';
      details!.open ? closeDetails() : openDetails();
    },
    [details, duration],
  );

  useLayoutEffect(() => {
    if (!details) return;
    const summary = details.querySelector('summary')!;

    if (prefersReducedMotion) {
      summary.removeEventListener('click', animateDetails);
      return summary.addEventListener('click', toggleDetails);
    }

    summary.removeEventListener('click', toggleDetails);
    summary.addEventListener('click', animateDetails);
  }, [animateDetails, details, duration, prefersReducedMotion, toggleDetails]);

  return { isOpen };
};

export default useAnimateDetails;
