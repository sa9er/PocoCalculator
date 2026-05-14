export function sanitizeDisplay(inputStr) {
  if (!inputStr || typeof inputStr !== 'string') {
    return '';
  }
  
  let cleanDisplay = inputStr.trim();
  
  if (cleanDisplay === '') {
    return '';
  }

  // Convert display symbols to mathjs-compatible format
  cleanDisplay = cleanDisplay
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt(');

  // Auto-balance parentheses
  const openCount = (cleanDisplay.match(/\(/g) || []).length;
  const closeCount = (cleanDisplay.match(/\)/g) || []).length;
  
  if (openCount > closeCount) {
    cleanDisplay += ')'.repeat(openCount - closeCount);
  } else if (closeCount > openCount) {
    cleanDisplay = '('.repeat(closeCount - openCount) + cleanDisplay;
  }

  // Remove trailing operators (but NOT factorial !)
  const trailingOperators = ['+', '-', '*', '/', '^', '%', '('];
  while (cleanDisplay.length > 0 && trailingOperators.includes(cleanDisplay.slice(-1))) {
    cleanDisplay = cleanDisplay.slice(0, -1);
  }

  return cleanDisplay || '';
}