import test from 'node:test';
import assert from 'node:assert/strict';
import { levels } from '../src/data/chapters.js';

function isPrime(value) {
  if (value < 2) return false;
  for (let divisor = 2; divisor * divisor <= value; divisor += 1) {
    if (value % divisor === 0) return false;
  }
  return true;
}

test('official Math King publishes a continuous 1 through 40 level sequence', () => {
  assert.equal(levels.length, 40);
  assert.deepEqual(
    levels.map((level) => level.order),
    Array.from({ length: 40 }, (_, index) => index + 1),
  );
  assert.equal(new Set(levels.map((level) => level.id)).size, 40);
});

test('official Math King starts with the strawberry boxing mission', () => {
  assert.equal(levels[0]?.order, 1);
  assert.equal(levels[0]?.id, 'level-01-strawberry-boxes');
  assert.equal(levels[0]?.title, '24 顆草莓怎麼裝盒？');
});

test('level 4 prime challenge has exactly one prime answer', () => {
  const level = levels.find((item) => item.order === 4);
  const primeOptions = level.challenge.options
    .map((item) => Number(item.value))
    .filter(isPrime);
  assert.deepEqual(primeOptions, [11]);
  assert.equal(String(level.challenge.answer), '11');
});
