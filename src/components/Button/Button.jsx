import "./Button.css";

export default function Button({ label, onClick, type, onHoldStart, onHoldEnd }) {
  const isZero = label === "0";
  
  // Map labels to keyboard shortcuts for title hints
  const shortcutMap = {
    'AC': 'Esc',
    'DEL': 'Backspace',
    'PASTE': 'Ctrl+V',
    'HIST': 'Ctrl+H',
    'SCI': 'Ctrl+S',
    'sin': 'S',
    'cos': 'C',
    'tan': 'T',
    'log': 'L',
    'ln': 'N',
    '√': 'Q',
    'abs': 'A',
    'exp': 'X',
    'π': 'P',
    'e': 'E',
    'inv': 'I',
  };

  const shortcut = shortcutMap[label];
  
  return (
    <button 
      className={`btn-base ${type} ${isZero ? "zero-btn" : ""}`}
      onClick={() => onClick && onClick(label)}
      onMouseDown={onHoldStart}
      onMouseUp={onHoldEnd}
      onMouseLeave={onHoldEnd}
      onTouchStart={onHoldStart}
      onTouchEnd={onHoldEnd}
      title={shortcut ? `${label} (${shortcut})` : label}
    >
      {label}
    </button>
  );
}