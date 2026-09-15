export function gcd(a, b) {
  let x = Math.abs(Number(a));
  let y = Math.abs(Number(b));
  while (y) [x, y] = [y, x % y];
  return x;
}

export function firstCommonMultiple(a, b) {
  const x = Math.abs(Number(a));
  const y = Math.abs(Number(b));
  if (!x || !y) return 0;
  return (x / gcd(x, y)) * y;
}

export function exactDivisorsFromChoices(total, choices) {
  return choices.filter((choice) => total % choice === 0);
}

export function largestSquareTile(width, height) {
  return gcd(width, height);
}

export function addMinutes(time, minutes) {
  const [hours, mins] = String(time).split(':').map(Number);
  const total = ((hours * 60 + mins + Number(minutes)) % 1440 + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export function scaleRecipe(recipe, factor) {
  return Object.fromEntries(Object.entries(recipe).map(([key, value]) => [key, Number((Number(value) * Number(factor)).toFixed(4))]));
}

export function gearDrivenTurns(driverTeeth, drivenTeeth, driverTurns) {
  if (!Number(drivenTeeth)) return 0;
  return Number(((Number(driverTeeth) / Number(drivenTeeth)) * Number(driverTurns)).toFixed(4));
}

export function factorPairs(total) {
  const result = [];
  for (let a = 1; a <= Math.sqrt(total); a += 1) {
    if (total % a === 0) result.push([a, total / a]);
  }
  return result;
}

export function unitPrice(totalPrice, quantity) {
  return Number((Number(totalPrice) / Number(quantity)).toFixed(4));
}
