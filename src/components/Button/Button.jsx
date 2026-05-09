import "./Button.css";

export default function Button({ label, onClick, type, onHoldStart, onHoldEnd }) {
  const isZero = label === "0";
  
  return (
    <button 
      className={`btn-base ${type} ${isZero ? "zero-btn" : ""}`}
      onClick={() => onClick && onClick(label)}
      onMouseDown={onHoldStart}
      onMouseUp={onHoldEnd}
      onMouseLeave={onHoldEnd}
      onTouchStart={onHoldStart}
      onTouchEnd={onHoldEnd}
    >
      {label}
    </button>
  );
}