import { useEffect, useState } from 'preact/hooks';
import { CookiePreferences, Policy } from '../types';

function isEnabled(preferences: CookiePreferences, microPolicy: Policy['id']): boolean {
  const option = preferences.cookieOptions.find(x => x.id === microPolicy);
  if (!option) {
    return false;
  }
  return option.isEnabled;
}

export default function useCookieThough(
  listen: (cb: (preferences: CookiePreferences) => void) => void,
  getCookiePreferences: () => CookiePreferences,
  micropolicy: Policy['id'],
) {
  const [hasConsent, setConsentState] = useState<boolean>(false);

  useEffect(() => {
    const prefs = getCookiePreferences();
    setConsentState(isEnabled(prefs, micropolicy));
    listen(preferences => {
      setConsentState(isEnabled(preferences, micropolicy));
    });
    /* eslint-enable no-unused-expressions */
  }, [micropolicy, listen, getCookiePreferences]);

  return !!hasConsent;
}
