import katex from 'katex';
import 'katex/dist/katex.min.css';

export function renderFormula(element, latex, { displayMode = false } = {}) {
  if (!element) return;
  katex.render(latex, element, {
    throwOnError: false,
    displayMode,
    strict: 'ignore',
  });
}

export function renderFormulaList(container, formulas = []) {
  if (!container) return;
  container.innerHTML = '';
  formulas.forEach((formula) => {
    const row = document.createElement('div');
    row.className = 'math-formula-row';
    container.append(row);
    renderFormula(row, formula);
  });
}
