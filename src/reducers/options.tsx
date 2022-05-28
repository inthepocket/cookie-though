import type { OnPreferencesChanged } from '../context/onPreferencesChanged';
import type { Option } from '../utils/mappers';
import { isEssential } from '../utils/mappers';
import { setPreferences } from '../utils/preferences';

type Action =
  | {
      type: 'decline';
      cookiePreferencesKey: string;
      domain?: string;
      onPreferencesChanged?: OnPreferencesChanged;
    }
  | {
      type: 'accept';
      cookiePreferencesKey: string;
      areAllOptionsEnabled: boolean;
      domain?: string;
      onPreferencesChanged?: OnPreferencesChanged;
    }
  | { type: 'toggle'; index: number };

const optionsReducer = (options: Option[], action: Action) => {
  switch (action.type) {
    case 'decline':
      return setPreferences({
        cookiePreferencesKey: action.cookiePreferencesKey,
        domain: action.domain,
        options: options.map((option) => ({ ...option, isEnabled: isEssential(option.category) })),
        onPreferencesChanged: action.onPreferencesChanged,
      });
    case 'accept':
      return setPreferences({
        cookiePreferencesKey: action.cookiePreferencesKey,
        domain: action.domain,
        options: action.areAllOptionsEnabled
          ? options.map((option) => ({ ...option, isEnabled: true }))
          : options,
        onPreferencesChanged: action.onPreferencesChanged,
      });
    case 'toggle':
      return options.map((option, index) => {
        return index === action.index ? { ...option, isEnabled: !option.isEnabled } : option;
      });
  }
};

export default optionsReducer;
