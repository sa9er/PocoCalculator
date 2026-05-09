import { useState, useRef } from "react";
import Screen from "./components/Screen/Screen.jsx"; 
import Keypad from "./components/Keypad/Keypad.jsx"; // Updated this line
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState([]);
  const [isResult, setIsResult] = useState(false);
  const [isHistoryMode, setIsHistoryMode] = useState(false);
  const [isScientificMode, setIsScientificMode] = useState(false);
  const timerRef = useRef(null);

  const startResetTimer = () => {
    timerRef.current = setTimeout(() => { setDisplay("0"); setIsResult(false); }, 3000);
  };

  const stopResetTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const handleAction = (val) => {
    if (val === "AC") {
      setDisplay("0"); setIsResult(false);
    } else if (val === "DEL") {
      if (!isResult) setDisplay(d => d.length <= 1 ? "0" : d.slice(0, -1));
    } else if (val === "=") {
      const incomplete = ["+", "-", "*", "/", "^", "%", "(", "√"].includes(display.slice(-1));
      if (display === "0" || isResult || incomplete) return;
      try {
        let evalStr = display.replace(/√/g, "Math.sqrt").replace(/\^/g, "**").replace(/π/g, "Math.PI").replace(/e/g, "Math.E");
        const res = new Function(`return ${evalStr}`)();
        setHistory(prev => [...prev, `${display} = ${res}`]);
        setDisplay(res.toString());
        setIsResult(true);
      } catch { setDisplay("Error"); }
    } else {
      const isOp = ["+", "-", "*", "/", "^", "%", "sin", "cos", "tan", "log", "√"].includes(val);
      if (isOp) {
        setDisplay(display + (val.length > 1 || val === "√" ? `${val}(` : val));
        setIsResult(false);
      } else if (!isResult) {
        setDisplay(display === "0" ? val : display + val);
      }
    }
  };

  return (
    <div className="full-viewport">
      <Screen display={display} history={history} isHistoryMode={isHistoryMode} isResult={isResult} />
      <Keypad 
        onAction={handleAction}
        onToggleHist={() => setIsHistoryMode(!isHistoryMode)}
        onToggleSci={() => setIsScientificMode(!isScientificMode)}
        onHoldReset={startResetTimer}
        stopHoldReset={stopResetTimer}
        isHistoryMode={isHistoryMode}
        isScientificMode={isScientificMode}
      />
    </div>
  );
}
