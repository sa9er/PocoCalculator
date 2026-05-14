import { useState } from "react";
import Screen from "./components/Screen/Screen.jsx"; 
import Keypad from "./components/Keypad/Keypad.jsx";
import UtilityBar from "./components/Keypad/UtilityBar.jsx";
import { useCalculator } from "./hooks/useCalculator";
import { useKeyboard } from "./hooks/useKeyboard";
import "./App.css";

export default function App() {
  const [isHistoryMode, setIsHistoryMode] = useState(false);
  const [isScientificMode, setIsScientificMode] = useState(false);
  
  const { 
    display, history, recentHistory, isResult, 
    handleAction, handlePaste,
    startResetTimer, stopResetTimer 
  } = useCalculator();

  useKeyboard(
    handleAction, 
    handlePaste, 
    isHistoryMode, 
    setIsHistoryMode, 
    isScientificMode, 
    setIsScientificMode
  );

  return (
    <div className="full-viewport">
      <Screen 
        display={display} 
        history={history}
        recentHistory={recentHistory}
        isHistoryMode={isHistoryMode} 
        isResult={isResult} 
      />
      
      <div className="keypad-wrapper">
        <UtilityBar 
          onAction={handleAction}
          onPaste={handlePaste}
          onToggleHist={() => setIsHistoryMode(!isHistoryMode)}
          onToggleSci={() => setIsScientificMode(!isScientificMode)}
          onHoldReset={startResetTimer}
          stopHoldReset={stopResetTimer}
          isHistoryMode={isHistoryMode}
          isScientificMode={isScientificMode}
        />
        
        <Keypad 
          onAction={handleAction} 
          isScientificMode={isScientificMode} 
        />
      </div>
    </div>
  );
}