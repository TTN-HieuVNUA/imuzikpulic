import * as SecureStore from 'expo-secure-store';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// Hook
export function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T | null, Dispatch<SetStateAction<T | null>>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T | null>(null);
  useEffect(() => {
    setImmediate(async () => {
      try {
        // TODO: consider add domain prefix if this is deployed on many domain
        // Get from local storage by key
        const item = await SecureStore.getItemAsync(key);
        // Parse stored json or if none return initialValue
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        setStoredValue(initialValue ?? null);
      }
    });
  }, [initialValue, key]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: SetStateAction<T | null>) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      SecureStore.setItemAsync(key, JSON.stringify(valueToStore)).catch(console.error);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
