import Button from "../Button/Button.jsx";

export default function UtilityBar({ 
  onAction, onToggleHist, onToggleSci, onPaste,
  isHistoryMode, isScientificMode, 
  onHoldReset, stopHoldReset 
}) {
  return (
    <div className="utility-grid">
      <Button 
        label="AC" 
        type="utility" 
        onClick={() => onAction("AC")} 
        onHoldStart={onHoldReset} 
        onHoldEnd={stopHoldReset} 
      />
      <Button 
        label="DEL" 
        type="utility" 
        onClick={() => onAction("DEL")} 
      />
      <Button 
        label="PASTE" 
        type="utility" 
        onClick={onPaste} 
      />
      <Button 
        label={isHistoryMode ? "CALC" : "HIST"} 
        type={`utility ${isHistoryMode ? "active" : ""}`} 
        onClick={onToggleHist} 
      />
      <Button 
        label={isScientificMode ? "123" : "SCI"} 
        type={`utility ${isScientificMode ? "active" : ""}`} 
        onClick={onToggleSci} 
      />
      <Button 
        label="=" 
        type="utility equal" 
        onClick={() => onAction("=")} 
      />
    </div>
  );
}