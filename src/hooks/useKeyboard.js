import { useEffect } from 'react';

export function useKeyboard(handleAction, handlePaste, isHistoryMode, setIsHistoryMode, isScientificMode, setIsScientificMode) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default for calculator keys
      const key = e.key;
      
      // Numbers
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        handleAction(key);
        return;
      }

      // Operators
      const operatorMap = {
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '%': '%',
        '^': '^',
      };

      if (operatorMap[key]) {
        e.preventDefault();
        handleAction(operatorMap[key]);
        return;
      }

      // Decimal point
      if (key === '.') {
        e.preventDefault();
        handleAction('.');
        return;
      }

      // Parentheses
      if (key === '(' || key === ')') {
        e.preventDefault();
        handleAction(key);
        return;
      }

      // Equal
      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleAction('=');
        return;
      }

      // Backspace for delete
      if (key === 'Backspace') {
        e.preventDefault();
        handleAction('DEL');
        return;
      }

      // Escape for AC
      if (key === 'Escape') {
        e.preventDefault();
        handleAction('AC');
        return;
      }

      // Paste (Ctrl+V / Cmd+V)
      if ((e.ctrlKey || e.metaKey) && key === 'v') {
        e.preventDefault();
        handlePaste();
        return;
      }

      // Scientific mode toggle (Ctrl+S)
      if ((e.ctrlKey || e.metaKey) && key === 's') {
        e.preventDefault();
        setIsScientificMode(!isScientificMode);
        return;
      }

      // History toggle (Ctrl+H)
      if ((e.ctrlKey || e.metaKey) && key === 'h') {
        e.preventDefault();
        setIsHistoryMode(!isHistoryMode);
        return;
      }

      // Scientific functions (letter keys)
      const letterMap = {
        's': 'sin',
        'c': 'cos',
        't': 'tan',
        'l': 'log',
        'n': 'ln',
        'q': 'sqrt',  // q for square root
        'a': 'abs',
        'e': 'e',
        'p': 'π',
        'x': 'exp',
        'i': 'inv',
      };

      // Only trigger letter shortcuts if not in an input field and no modifier keys
      if (letterMap[key] && !e.ctrlKey && !e.metaKey && !e.altKey && e.target === document.body) {
        e.preventDefault();
        handleAction(letterMap[key]);
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleAction, handlePaste, isHistoryMode, setIsHistoryMode, isScientificMode, setIsScientificMode]);
}