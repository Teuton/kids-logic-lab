export function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let d = 3; d * d <= n; d += 2) {
    if (n % d === 0) return false;
  }
  return true;
}

export function getFactors(n) {
  if (!Number.isInteger(n) || n <= 0) return [];
  const small = [];
  const large = [];
  for (let d = 1; d * d <= n; d += 1) {
    if (n % d === 0) {
      small.push(d);
      if (d * d !== n) large.push(n / d);
    }
  }
  return [...small, ...large.reverse()];
}

export function primeFactorization(n) {
  if (!Number.isInteger(n) || n < 2) return {};
  const result = {};
  let value = n;
  for (let p = 2; p * p <= value; p += p === 2 ? 1 : 2) {
    while (value % p === 0) {
      result[p] = (result[p] || 0) + 1;
      value /= p;
    }
  }
  if (value > 1) result[value] = (result[value] || 0) + 1;
  return result;
}

export function gcd(a, b) {
  let x = Math.abs(Number(a));
  let y = Math.abs(Number(b));
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

export function gcdMany(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  return numbers.reduce((acc, value) => gcd(acc, value));
}

export function lcm(a, b) {
  const x = Math.abs(Number(a));
  const y = Math.abs(Number(b));
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  if (x === 0 || y === 0) return 0;
  return Math.abs((x / gcd(x, y)) * y);
}

export function lcmMany(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  return numbers.reduce((acc, value) => lcm(acc, value), 1);
}

export function isCoprime(a, b) {
  return gcd(a, b) === 1;
}

export function countTrailingZerosFactorial(n) {
  if (!Number.isInteger(n) || n < 0) return 0;
  let count = 0;
  for (let divisor = 5; divisor <= n; divisor *= 5) {
    count += Math.floor(n / divisor);
  }
  return count;
}

export function factorPairs(n) {
  return getFactors(n)
    .filter((factor) => factor <= n / factor)
    .map((factor) => [factor, n / factor]);
}

export function factorizationText(n) {
  const parts = Object.entries(primeFactorization(n)).map(([prime, power]) =>
    power === 1 ? `${prime}` : `${prime}^${power}`,
  );
  return parts.length ? parts.join(' × ') : `${n}`;
}
