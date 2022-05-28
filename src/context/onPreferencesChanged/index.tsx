import type { ComponentChildren } from 'preact';
import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

import type { Preference } from '../../utils/mappers';

type CookiePreferences = { isCustomised: boolean; preferences: Preference[] | undefined };

export type OnPreferencesChanged = ((cookiePreferences: CookiePreferences) => void) | undefined;

interface Props {
  onPreferencesChanged?: OnPreferencesChanged;
  children: ComponentChildren;
}

const OnPreferencesChangedContext = createContext<OnPreferencesChanged>(undefined);

const OnPreferencesChangedProvider = ({ onPreferencesChanged, children }: Props) => {
  const [value] = useState(() => onPreferencesChanged);

  return (
    <OnPreferencesChangedContext.Provider value={value}>
      {children}
    </OnPreferencesChangedContext.Provider>
  );
};

const useOnPreferencesChanged = () => useContext(OnPreferencesChangedContext);

export { OnPreferencesChangedContext, OnPreferencesChangedProvider, useOnPreferencesChanged };
