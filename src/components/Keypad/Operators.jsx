import Button from "../Button/Button.jsx";
import "./Operators.css";

export default function Operators({ onAction }) {
  const operators = ["+", "-", "*", "/", "="];

  return (
    <div className="operators-panel">
      {operators.map(op => (
        <Button 
          key={op} 
          label={op} 
          onClick={() => onAction(op)} 
          type={op === "=" ? "equal" : "operator"}
        />
      ))}
    </div>
  );
}