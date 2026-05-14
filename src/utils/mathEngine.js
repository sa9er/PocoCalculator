import { create, all } from 'mathjs';

const math = create(all, {
  number: 'number',
  precision: 14
});

export function evaluateExpression(expression) {
  try {
    if (!expression || expression.trim() === '') {
      throw new Error('Empty expression');
    }

    let processed = expression
      // Fix factorial: number! → factorial(number)
      .replace(/(\d+)!/g, 'factorial($1)')
      // Fix sin(...)^n → (sin(...))^n
      .replace(/([a-z]+\([^()]+\))\^(\d+)/gi, '($1)^$2')
      // Implicit multiplication
      .replace(/\)\(/g, ')*(')
      .replace(/(\d)\(/g, '$1*(')
      .replace(/(\d)([a-z])/gi, '$1*$2')
      .replace(/√/g, 'sqrt(')
      // Map calculator functions to mathjs built-ins
      .replace(/log\(/g, 'log10(')
      .replace(/ln\(/g, 'log(');

    const result = math.evaluate(processed);

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
  } catch (error) {
    console.error('Math evaluation error:', error.message);
    throw new Error('Error');
  }
}