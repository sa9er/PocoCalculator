export function normalizePastedText(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return null;
  }

  try {
    let translated = rawText
      .replace(/\\pi/g, 'pi')
      .replace(/\\cdot/g, '*')
      .replace(/\\times/g, '*')
      .replace(/\\div/g, '/')
      .replace(/\\sqrt/g, 'sqrt')
      .replace(/\\left\(/g, '(')
      .replace(/\\right\)/g, ')')
      .replace(/\{/g, '(') 
      .replace(/\}/g, ')')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, 'pi')
      .replace(/\s+/g, '');

    const sanitized = translated.replace(/[^0-9+\-*/().^a-zA-Z!]/g, '');

    if (sanitized.length > 0 && /[0-9a-z)]/i.test(sanitized)) {
      return sanitized;
    }

    return null;
  } catch (err) {
    console.error('Clipboard processing error:', err);
    return null;
  }
}