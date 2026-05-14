import { useState, useRef } from "react";
import "./Screen.css";

export default function Screen({ display, history, recentHistory, isHistoryMode, isResult }) {
  const [showCopied, setShowCopied] = useState(false);
  const lastTapRef = useRef(0);
  const timerRef = useRef(null);

  const handleDisplayTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      // Clear any existing timer
      if (timerRef.current) clearTimeout(timerRef.current);
      
      navigator.clipboard.writeText(display).then(() => {
        setShowCopied(true);
        timerRef.current = setTimeout(() => setShowCopied(false), 1200);
      }).catch(() => {
        const textArea = document.createElement("textarea");
        textArea.value = display;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setShowCopied(true);
        timerRef.current = setTimeout(() => setShowCopied(false), 1200);
      });
    }
    lastTapRef.current = now;
  };

  if (isHistoryMode) {
    return (
      <div className="screen-base history-view">
        <div className="full-history-list">
          <div className="hist-header">HISTORY LOG</div>
          {history.length === 0 ? (
            <div className="history-item">No history yet</div>
          ) : (
            history.map((item, i) => (
              <div key={i} className="history-item">
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="screen-base">
      <div className="history-rows">
        {recentHistory && recentHistory.map((item, index) => (
          <div key={index} className="history-line">{item}</div>
        ))}
      </div>
      <div 
        className={`display-main ${isResult ? "locked" : ""} ${display === "Error" ? "error" : ""}`}
        onClick={handleDisplayTap}
      >
        {display}
      </div>
      {showCopied && (
        <div className="copied-toast">Copied!</div>
      )}
    </div>
  );
}