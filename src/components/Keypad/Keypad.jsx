import Button from "../Button/Button.jsx";
import "./Keypad.css";

export default function Keypad({ 
  onAction, onToggleHist, onToggleSci, isHistoryMode, isScientificMode, 
  onHoldReset, stopHoldReset 
}) {
  const normalSet = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", ".", "/"];
  const sciSet = ["sin", "cos", "tan", "^", "log", "√", "(", ")", "π", "e", "%", "!", "abs", "inv", "exp"];

  return (
    <div className="keypad-wrapper">
      <div className="utility-grid">
        <Button label="AC" type="utility" onClick={() => onAction("AC")} onHoldStart={onHoldReset} onHoldEnd={stopHoldReset} />
        <Button label="DEL" type="utility" onClick={() => onAction("DEL")} />
        <Button label={isHistoryMode ? "CALC" : "HIST"} type={`utility ${isHistoryMode ? "active" : ""}`} onClick={onToggleHist} />
        <Button label={isScientificMode ? "123" : "SCI"} type={`utility ${isScientificMode ? "active" : ""}`} onClick={onToggleSci} />
        <Button label="=" type="utility equal" onClick={() => onAction("=")} />
      </div>

      <div className="main-grid">
        {(isScientificMode ? sciSet : normalSet).map(key => (
          <Button 
            key={key} 
            label={key} 
            onClick={() => onAction(key)} 
            type={["+", "-", "*", "/", "^", "%"].includes(key) ? "operator" : ""} 
          />
        ))}
      </div>
    </div>
  );
}
