import { create, all } from 'mathjs';
import { processExpression } from './expression/expressionProcessor';

const math = create(all, {
  number: 'number',
  precision: 14
});

export function evaluateExpression(expression) {
  try {
    if (!expression || expression.trim() === '') {
      throw new Error('Empty expression');
    }

    const processed = processExpression(expression);
    const result = math.evaluate(processed);

    return formatResult(result);
  } catch (error) {
    console.error('Math evaluation error:', error.message);
    throw new Error('Error');
  }
}

function formatResult(result) {
  if (result === undefined || result === null) {
    throw new Error('Invalid expression');
  }

  if (typeof result === 'number' && !isFinite(result)) {
    if (result === Infinity) return 'Infinity';
    if (result === -Infinity) return '-Infinity';
    return 'Error';
  }

  if (typeof result === 'number') {
    if (Math.abs(result) > 1e12 || (Math.abs(result) < 1e-10 && result !== 0)) {
      return result.toExponential(6);
    }
    return parseFloat(result.toPrecision(12)).toString();
  }

  return result.toString();
}