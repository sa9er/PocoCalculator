import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { CopiedToast } from "./CopiedToast";
import { RecentHistory } from "./RecentHistory";
import { DisplayValue } from "./DisplayValue";
import "./Screen.css";

export default function Screen({ display, history, recentHistory, isHistoryMode, isResult }) {
  const { showCopied, handleDisplayTap } = useCopyToClipboard(display);

  if (isHistoryMode) {
    return (
      <div className="screen-base history-view">
        <div className="full-history-list">
          <div className="hist-header">HISTORY LOG</div>
          {history.length === 0 ? (
            <div className="history-item">No history yet</div>
          ) : (
            history.map((item, i) => (
              <div key={i} className="history-item">{item}</div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="screen-base">
      <RecentHistory items={recentHistory} />
      <DisplayValue value={display} isResult={isResult} onClick={handleDisplayTap} />
      {showCopied && <CopiedToast />}
    </div>
  );
}