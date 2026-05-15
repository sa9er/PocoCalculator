import Button from "../Button/Button.jsx";
import "./Keypad.css";

export default function Keypad({ onAction, isScientificMode }) {
  // Operators for vertical column
  const operators = ["+", "-", "*", "/", "="];

  if (isScientificMode) {
    const scientificRows = [
      ["sin", "cos", "tan"],
      ["log", "√", "("],
      [")", "π", "e"],
      ["abs", "inv", "exp"]
    ];
    
    return (
      <div className="calculator-body">
        <div className="numbers-section">
          {scientificRows.map((row, rowIndex) => (
            <div key={rowIndex} className="number-row">
              {row.map(key => (
                <Button 
                  key={key} 
                  label={key} 
                  onClick={() => onAction(key)} 
                  type="scientific"
                />
              ))}
            </div>
          ))}
        </div>
        <div className="operators-section">
          {operators.map(op => (
            <Button 
              key={op} 
              label={op} 
              onClick={() => onAction(op)} 
              type={op === "=" ? "equal" : "operator"}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="calculator-body">
      {/* Numbers section - 4 rows */}
      <div className="numbers-section">
        {/* Row 1: 1, 2, 3 */}
        <div className="number-row">
          <Button label="1" onClick={() => onAction("1")} type="number" />
          <Button label="2" onClick={() => onAction("2")} type="number" />
          <Button label="3" onClick={() => onAction("3")} type="number" />
        </div>
        
        {/* Row 2: 4, 5, 6 */}
        <div className="number-row">
          <Button label="4" onClick={() => onAction("4")} type="number" />
          <Button label="5" onClick={() => onAction("5")} type="number" />
          <Button label="6" onClick={() => onAction("6")} type="number" />
        </div>
        
        {/* Row 3: 7, 8, 9 */}
        <div className="number-row">
          <Button label="7" onClick={() => onAction("7")} type="number" />
          <Button label="8" onClick={() => onAction("8")} type="number" />
          <Button label="9" onClick={() => onAction("9")} type="number" />
        </div>
        
        {/* Row 4: 0 and . side by side */}
        <div className="number-row last-row">
          <Button label="0" onClick={() => onAction("0")} type="number" />
          <Button label="." onClick={() => onAction(".")} type="number" />
        </div>
      </div>
      
      {/* Operators section - vertical column on the right */}
      <div className="operators-section">
        <Button label="+" onClick={() => onAction("+")} type="operator" />
        <Button label="-" onClick={() => onAction("-")} type="operator" />
        <Button label="*" onClick={() => onAction("*")} type="operator" />
        <Button label="/" onClick={() => onAction("/")} type="operator" />
        <Button label="=" onClick={() => onAction("=")} type="equal" />
      </div>
    </div>
  );
}