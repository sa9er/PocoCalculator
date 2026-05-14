import { useState, useRef } from "react";

export function useCalculator() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState([]);
  const [isResult, setIsResult] = useState(false);
  const timerRef = useRef(null);

  const startResetTimer = () => {
    timerRef.current = setTimeout(() => { 
      setDisplay("0"); 
      setIsResult(false); 
    }, 3000);
  };


  const stopResetTimer = () => {
    if (timerRef.current) { 
      clearTimeout(timerRef.current); 
      timerRef.current = null; 
    }
  };

  const calculate = (inputStr) => {
    try {
      let cleanDisplay = inputStr.trim();
      
      // Auto-balance parentheses and trim trailing operators
      const openCount = (cleanDisplay.match(/\(/g) || []).length;
      const closeCount = (cleanDisplay.match(/\)/g) || []).length;
      if (openCount > closeCount) cleanDisplay += ")".repeat(openCount - closeCount);

      while (["+", "-", "*", "/", "^", "%", "(", "√"].includes(cleanDisplay.slice(-1))) {
        cleanDisplay = cleanDisplay.slice(0, -1);
      }

      if (!cleanDisplay || cleanDisplay === "0") return;

      // Map display symbols to JavaScript Math properties
      // Order matters: replace specific functions first, then constants
      let evalStr = cleanDisplay
        .replace(/√/g, "Math.sqrt")
        .replace(/\^/g, "**")
        // Replace π with Math.PI first
        .replace(/π/g, "Math.PI")
        // Replace standalone 'e' with Math.E, but not when it's part of another word
        .replace(/(?<![a-zA-Z.])e(?![a-zA-Z])/g, "Math.E");

      const res = new Function(`return ${evalStr}`)();
      setHistory(prev => [...prev, `${cleanDisplay} = ${res}`]);
      setDisplay(res.toString());
      setIsResult(true);
    } catch (err) { 
      setDisplay("Error"); 
    }
  };

  const handlePaste = async () => {
    try {
      const rawText = await navigator.clipboard.readText();

      // STEP 1: Direct Normalization 
      // Convert standard LaTeX (\pi, \cdot) and Unicode variants to display characters
      let translated = rawText
        .replace(/\\pi/g, "π")
        .replace(/\\cdot/g, "*")
        .replace(/\{/g, "(") 
        .replace(/\}/g, ")")
        .replace(/\s+/g, "");

      // STEP 2: Strict Whitelist Sanitization
      // Put hyphen at the end to avoid range interpretation
      const sanitized = translated.replace(/[^0-9+*/^.%()√πeE\-]/g, "");

      if (sanitized) {
        setDisplay(sanitized); 
        setIsResult(false);    
      }
    } catch (err) {
      console.error("Paste Error:", err);
    }
  };

  const handleAction = (val) => {
    if (val === "AC") {
      setDisplay("0"); 
      setIsResult(false);
    } else if (val === "DEL") {
      if (!isResult) setDisplay(d => d.length <= 1 ? "0" : d.slice(0, -1));
    } else if (val === "=") {
      calculate(display);
    } else {
      const isOp = ["+", "-", "*", "/", "^", "%", "sin", "cos", "tan", "log", "√"].includes(val);
      if (isOp) {
        setDisplay(display + (val.length > 1 || val === "√" ? `${val}(` : val));
        setIsResult(false);
      } else {
        if (isResult) {
          setDisplay(val);
          setIsResult(false);
        } else {
          setDisplay(display === "0" ? val : display + val);
        }
      }
    }
  };

  return { 
    display, history, isResult, 
    handleAction, handlePaste, 
    startResetTimer, stopResetTimer 
  };
}