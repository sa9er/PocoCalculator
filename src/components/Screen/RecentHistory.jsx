export function RecentHistory({ items }) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="history-rows">
      {items.map((item, index) => (
        <div key={index} className="history-line">{item}</div>
      ))}
    </div>
  );
}