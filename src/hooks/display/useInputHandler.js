import { operators, FUNCTION_NAMES } from '../../utils/constants';

export function useInputHandler(state) {
  const { display, setDisplay, isResult, setIsResult, lastResult, setLastResult, resetAcCount, handleTripleTap } = state;

  const handleAction = (val) => {
    if (val === 'AC') {
      handleClear();
      return { shouldCalculate: false };
    }

    resetAcCount();

    if (val === 'DEL') {
      handleDelete();
      return { shouldCalculate: false };
    }

    if (val === '=') {
      return handleEquals();
    }

    if (isResult) {
      return handleResultState(val);
    }

    return handleNormalState(val);
  };

  function handleClear() {
    setDisplay('0');
    setIsResult(false);
    setLastResult(null);
    handleTripleTap();
  }

  function handleDelete() {
    if (!isResult) {
      setDisplay(d => removeLastCharacter(d));
    }
  }

  function removeLastCharacter(str) {
    if (!str || str.length <= 1) return '0';
    
    for (const func of FUNCTION_NAMES) {
      if (str.endsWith(func)) {
        return str.slice(0, -func.length);
      }
    }
    return str.slice(0, -1);
  }

  function handleEquals() {
    if (isResult) {
      return { shouldCalculate: false };
    }
    return { shouldCalculate: true };
  }

  function handleResultState(val) {
    if (operators.includes(val) || val === 'ln' || val === '√' || val === '!') {
      const suffix = getOperatorSuffix(val);
      setDisplay((lastResult || display) + suffix);
      setIsResult(false);
      return { shouldCalculate: false };
    }
    return { shouldCalculate: false };
  }

  function handleNormalState(val) {
    if (val === '!') {
      setDisplay(prev => prev + '!');
      return { shouldCalculate: false };
    }

    if (operators.includes(val) || val === 'ln') {
      setDisplay(prev => handleOperatorInput(prev, val));
      setIsResult(false);
      return { shouldCalculate: false };
    }

    setDisplay(prev => appendToDisplay(prev, val));
    return { shouldCalculate: false };
  }

  function getOperatorSuffix(val) {
    return val.length > 1 || val === '√' ? `${val}(` : val;
  }

  function handleOperatorInput(prev, val) {
    const lastChar = prev.slice(-1);
    const isOperator = operators.includes(lastChar) || lastChar === '(';
    
    if (isOperator && prev !== '0') {
      const prefix = getOperatorSuffix(val);
      return prev.slice(0, -1) + prefix;
    }
    
    const suffix = getOperatorSuffix(val);
    return prev === '0' ? suffix : prev + suffix;
  }

  function appendToDisplay(prev, val) {
    if (prev === '0' && val !== '.' && !['π', 'e'].includes(val)) return val;
    if (val === '.') {
      const lastNumber = prev.split(/[+\-*/^%()]/).pop();
      if (lastNumber && lastNumber.includes('.')) return prev;
    }
    return prev + val;
  }

  return { handleAction };
}