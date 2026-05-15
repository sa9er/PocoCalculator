export function DisplayValue({ value, isResult, onClick }) {
  const className = `display-main${isResult ? ' locked' : ''}${value === 'Error' ? ' error' : ''}`;
  
  return (
    <div className={className} onClick={onClick}>
      {value}
    </div>
  );
}