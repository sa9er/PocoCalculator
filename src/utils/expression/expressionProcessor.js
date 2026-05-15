export function processExpression(expression) {
  let processed = expression;

  // Convert factorial notation: 3! → factorial(3)
  processed = processed.replace(/(\d+)!/g, 'factorial($1)');

  // Fix function^power notation: sin(x)^2 → (sin(x))^2
  processed = processed.replace(/([a-z]+\([^()]+\))\^(\d+)/gi, '($1)^$2');

  // Implicit multiplication
  processed = processed
    .replace(/\)\(/g, ')*(')
    .replace(/(\d)\(/g, '$1*(')
    .replace(/(\d)([a-z])/gi, '$1*$2')
    .replace(/√/g, 'sqrt(');

  // Map calculator functions to mathjs built-ins
  processed = processed
    .replace(/log\(/g, 'log10(')
    .replace(/ln\(/g, 'log(');

  return processed;
}