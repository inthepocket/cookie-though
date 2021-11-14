import { OnPreferencesChanged } from '../context/onPreferencesChanged';
import { isEssential, Option } from '../utils/mappers';
import { setPreferences } from '../utils/preferences';

type Action =
  | {
      type: 'decline';
      cookiePreferencesKey: string;
      onPreferencesChanged?: OnPreferencesChanged;
    }
  | {
      type: 'accept';
      cookiePreferencesKey: string;
      areAllOptionsEnabled: boolean;
      onPreferencesChanged?: OnPreferencesChanged;
    }
  | { type: 'toggle'; index: number };

const optionsReducer = (options: Option[], action: Action) => {
  switch (action.type) {
    case 'decline':
      return setPreferences({
        cookiePreferencesKey: action.cookiePreferencesKey,
        options: options.map((option) => ({ ...option, isEnabled: isEssential(option.category) })),
        onPreferencesChanged: action.onPreferencesChanged,
      });
    case 'accept':
      return setPreferences({
        cookiePreferencesKey: action.cookiePreferencesKey,
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
