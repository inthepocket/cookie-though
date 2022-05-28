import { useRef } from 'preact/hooks';

import type { Option as OptionType } from '../../../utils/mappers';
import { isEssential as isEssentialCategory } from '../../../utils/mappers';

interface Props {
  option: OptionType;
  onClick: () => void;
  essentialLabel?: string;
}

const Option = ({
  option: { isEnabled, id, label, description, category },
  onClick,
  essentialLabel,
}: Props) => {
  const optionRef = useRef<HTMLDivElement>(null);
  const isEssential = isEssentialCategory(category);

  return (
    <div ref={optionRef} class="option">
      <input
        type="checkbox"
        class="sr-only"
        id={id}
        name={id}
        disabled={isEssential}
        checked={isEnabled}
        onClick={onClick}
        onFocus={() => optionRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })}
      />
      <label htmlFor={id} class="info" aria-label={label}>
        <span>
          <strong>{label}</strong>
          {description}
        </span>
        <span class={isEssential ? 'essential-label' : 'pill-switch'}>
          {isEssential && essentialLabel}
        </span>
      </label>
    </div>
  );
};

export default Option;
