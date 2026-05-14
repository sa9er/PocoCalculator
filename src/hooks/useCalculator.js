import { useDisplay } from './useDisplay';
import { useHistory } from './useHistory';
import { useResetTimer } from './useResetTimer';
import { sanitizeDisplay } from '../utils/expressionUtils';
import { evaluateExpression } from '../utils/mathEngine';
import { normalizePastedText } from '../utils/clipboardUtils';

export function useCalculator() {
  const { fullHistory, recentHistory, addToHistory, clearRecentHistory } = useHistory();
  const { display, setDisplay, isResult, setIsResult, handleAction, setLastResult } = useDisplay(clearRecentHistory);
  const { startResetTimer, stopResetTimer } = useResetTimer(setDisplay, setIsResult, clearRecentHistory);

  const calculate = (inputStr) => {
    try {
      const cleanDisplay = sanitizeDisplay(inputStr);
      
      if (!cleanDisplay || cleanDisplay === '0') return;

      const result = evaluateExpression(cleanDisplay);
      
      addToHistory(`${cleanDisplay} = ${result}`);
      
      setDisplay(result.toString());
      setLastResult(result.toString());
      setIsResult(true);
    } catch (err) {
      setDisplay('Error');
      setIsResult(true);
    }
  };

  const handlePaste = async () => {
    try {
      const rawText = await navigator.clipboard.readText();
      const sanitized = normalizePastedText(rawText);

      if (sanitized) {
        setDisplay(sanitized);
        setIsResult(false);
      }
    } catch (err) {
      console.error('Paste Error:', err);
    }
  };

  const wrappedHandleAction = (val) => {
    const { shouldCalculate } = handleAction(val);
    if (shouldCalculate) {
      calculate(display);
    }
  };

  return {
    display,
    history: fullHistory,
    recentHistory,
    isResult,
    handleAction: wrappedHandleAction,
    handlePaste,
    startResetTimer,
    stopResetTimer
  };
}
