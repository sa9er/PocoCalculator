import { useState } from 'react';

export function useTripleTap(onTripleTap) {
  const [acCount, setAcCount] = useState(0);
  const [lastAcTime, setLastAcTime] = useState(0);

  const resetAcCount = () => setAcCount(0);

  const handleTripleTap = () => {
    const now = Date.now();
    if (now - lastAcTime < 1000) {
      const newCount = acCount + 1;
      setAcCount(newCount);
      if (newCount >= 3) {
        onTripleTap();
        setAcCount(0);
      }
    } else {
      setAcCount(1);
    }
    setLastAcTime(now);
  };

  return { acCount, resetAcCount, handleTripleTap };
}