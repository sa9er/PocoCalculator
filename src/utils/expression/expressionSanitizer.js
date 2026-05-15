import { TRAILING_OPERATORS } from '../constants';

export function sanitizeDisplay(inputStr) {
  if (!inputStr || typeof inputStr !== 'string') {
    return '';
  }
  
  let cleanDisplay = inputStr.trim();
  
  if (cleanDisplay === '') {
    return '';
  }

  cleanDisplay = cleanDisplay
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt(');

  cleanDisplay = balanceParentheses(cleanDisplay);
  cleanDisplay = removeTrailingOperators(cleanDisplay);

  return cleanDisplay || '';
}

function balanceParentheses(expression) {
  let result = expression;
  const openCount = (result.match(/\(/g) || []).length;
  const closeCount = (result.match(/\)/g) || []).length;
  
  if (openCount > closeCount) {
    result += ')'.repeat(openCount - closeCount);
  } else if (closeCount > openCount) {
    result = '('.repeat(closeCount - openCount) + result;
  }
  
  return result;
}

function removeTrailingOperators(expression) {
  let result = expression;
  while (result.length > 0 && TRAILING_OPERATORS.includes(result.slice(-1))) {
    result = result.slice(0, -1);
  }
  return result;
}