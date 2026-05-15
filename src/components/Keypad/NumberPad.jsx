import Button from "../Button/Button.jsx";
import "./NumberPad.css";

export default function NumberPad({ onAction, isScientificMode }) {
  // Normal number pad layout (3x4 grid)
  const normalNumbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", ".", ""]  // 0, then ., then empty (will be filled with equal positioning)
  ];
  
  // Scientific functions pad (3x4 grid)
  const scientificFunctions = [
    ["sin", "cos", "tan"],
    ["log", "√", "("],
    [")", "π", "e"],
    ["abs", "inv", "exp"]
  ];

  if (isScientificMode) {
    return (
      <div className="number-pad scientific-pad">
        {scientificFunctions.map((row, rowIndex) => (
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
    );
  }

  return (
    <div className="number-pad">
      {/* Rows 1-3: numbers 1-9 */}
      <div className="number-row">
        <Button label="1" onClick={() => onAction("1")} type="number" />
        <Button label="2" onClick={() => onAction("2")} type="number" />
        <Button label="3" onClick={() => onAction("3")} type="number" />
      </div>
      
      <div className="number-row">
        <Button label="4" onClick={() => onAction("4")} type="number" />
        <Button label="5" onClick={() => onAction("5")} type="number" />
        <Button label="6" onClick={() => onAction("6")} type="number" />
      </div>
      
      <div className="number-row">
        <Button label="7" onClick={() => onAction("7")} type="number" />
        <Button label="8" onClick={() => onAction("8")} type="number" />
        <Button label="9" onClick={() => onAction("9")} type="number" />
      </div>
      
      {/* Last row: 0 spans 2 columns, . in its own column */}
      <div className="number-row last-row">
        <Button label="0" onClick={() => onAction("0")} type="zero-span" />
        <Button label="." onClick={() => onAction(".")} type="number decimal" />
      </div>
    </div>
  );
}