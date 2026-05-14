import Button from "../Button/Button.jsx";
import "./Keypad.css";

export default function Keypad({ onAction, isScientificMode }) {
  const normalSet = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", ".", "/"];
  const sciSet = ["sin", "cos", "tan", "^", "log", "√", "(", ")", "π", "e", "%", "!", "abs", "inv", "exp"];

  return (
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
  );
}
