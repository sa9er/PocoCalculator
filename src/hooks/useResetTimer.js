import { useRef } from 'react';

export function useResetTimer(setDisplay, setIsResult) {
  const timerRef = useRef(null);
  const isHolding = useRef(false);

  const startResetTimer = () => {
    isHolding.current = true;
    timerRef.current = setTimeout(() => {
      if (isHolding.current) {
        setDisplay('0');
        setIsResult(false);
        isHolding.current = false;
      }
    }, 3000);
  };

  const stopResetTimer = () => {
    isHolding.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return { startResetTimer, stopResetTimer };
}