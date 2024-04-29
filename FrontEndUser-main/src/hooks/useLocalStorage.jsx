import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue === null) {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });

  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
