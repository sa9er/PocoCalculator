import { useState } from 'react';
import { useInputHandler } from './display/useInputHandler';
import { useTripleTap } from './display/useTripleTap';

export function useDisplay(clearRecentHistory) {
  const [display, setDisplay] = useState('0');
  const [isResult, setIsResult] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  
  const { resetAcCount, handleTripleTap } = useTripleTap(clearRecentHistory);
  
  const { handleAction } = useInputHandler({
    display,
    setDisplay,
    isResult,
    setIsResult,
    lastResult,
    setLastResult,
    resetAcCount,
    handleTripleTap
  });

  return { display, setDisplay, isResult, setIsResult, handleAction, setLastResult };
}