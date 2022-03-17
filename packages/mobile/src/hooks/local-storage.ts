import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { isClientSide } from '../helpers/utils';

// Hook
export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  useEffect(() => {
    // TODO: consider add domain prefix if this is deployed on many domain
    // Get from local storage by key
    const item = isClientSide ? window.localStorage.getItem(key) : null;
    // Parse stored json or if none return initialValue
    if (item) setStoredValue(JSON.parse(item));
  }, [key]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: SetStateAction<T>) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
