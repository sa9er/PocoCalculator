import { useState } from 'react';
import { operators } from '../utils/constants';

export function useDisplay() {
  const [display, setDisplay] = useState('0');
  const [isResult, setIsResult] = useState(false);

  const handleAction = (val) => {
    if (val === 'AC') {
      setDisplay('0');
      setIsResult(false);
      return { shouldCalculate: false };
    }

    if (val === 'DEL') {
      if (!isResult) {
        setDisplay(d => {
          if (!d || d.length <= 1) return '0';
          const functionNames = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', 'abs(', 'exp('];
          for (const func of functionNames) {
            if (d.endsWith(func)) {
              return d.slice(0, -func.length);
            }
          }
          return d.slice(0, -1);
        });
      }
      return { shouldCalculate: false };
    }

    if (val === '=') {
      return { shouldCalculate: true };
    }

    // Handle factorial
    if (val === '!') {
      setDisplay(prev => prev + '!');
      return { shouldCalculate: false };
    }

    if (operators.includes(val) || val === 'ln') {
      setDisplay(prev => {
        const lastChar = prev.slice(-1);
        const isOperator = operators.includes(lastChar) || lastChar === '(';
        
        if (isOperator && prev !== '0') {
          const prefix = val.length > 1 || val === '√' ? `${val}(` : val;
          return prev.slice(0, -1) + prefix;
        }
        
        const suffix = val.length > 1 || val === '√' ? `${val}(` : val;
        return prev === '0' ? suffix : prev + suffix;
      });
      setIsResult(false);
      return { shouldCalculate: false };
    }

    if (isResult) {
      if (['+', '-', '*', '/', '^', '%'].includes(val)) {
        setDisplay(display + val);
      } else {
        setDisplay(val);
      }
      setIsResult(false);
    } else {
      setDisplay(prev => {
        if (prev === '0' && val !== '.' && !['π', 'e'].includes(val)) return val;
        if (val === '.') {
          const lastNumber = prev.split(/[+\-*/^%()]/).pop();
          if (lastNumber && lastNumber.includes('.')) return prev;
        }
        return prev + val;
      });
    }

    return { shouldCalculate: false };
  };

  return { display, setDisplay, isResult, setIsResult, handleAction };
}