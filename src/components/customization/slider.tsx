import { FunctionalComponent, h } from 'preact';
import styles from './css/slider.css';

interface Props {
  isEnabled: boolean;
  onToggle: () => void;
}

const Slider: FunctionalComponent<Props> = ({ isEnabled, onToggle }) => {
  return (
    <button className={`${styles.slider} ${isEnabled ? styles.enabled : ''}`} onClick={onToggle}>
      <svg
        className={styles.orb}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d)">
          <circle cx="12" cy="12" r="11" />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="0"
            y="0"
            width="24"
            height="24"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0160938 0 0 0 0 0.0160938 0 0 0 0 0.429167 0 0 0 0.12 0"
            />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
    </button>
  );
};

export default Slider;
