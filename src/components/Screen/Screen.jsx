import "./Screen.css";

export default function Screen({ display, history, isHistoryMode, isResult }) {
  if (isHistoryMode) {
    return (
      <div className="screen-base history-view">
        <div className="full-history-list">
          <div className="hist-header">HISTORY LOG</div>
          {history.length === 0 ? (
            <div className="history-item">No history yet</div>
          ) : (
            history.map((item, i) => <div key={i} className="history-item">{item}</div>)
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="screen-base">
      <div className="history-rows">
        {history.slice(-3).map((item, index) => (
          <div key={index} className="history-line">{item}</div>
        ))}
      </div>
      <div className={`display-main ${isResult ? "locked" : ""}`}>
        {display}
      </div>
    </div>
  );
}
