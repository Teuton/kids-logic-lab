import test from 'node:test';
import assert from 'node:assert/strict';
import { levels } from '../src/data/chapters.js';

test('official Math King publishes a continuous 1 through 40 level sequence', () => {
  assert.equal(levels.length, 40);
  assert.deepEqual(
    levels.map((level) => level.order),
    Array.from({ length: 40 }, (_, index) => index + 1),
  );
});

test('official Math King starts with the strawberry boxing mission', () => {
  assert.equal(levels[0]?.order, 1);
  assert.equal(levels[0]?.id, 'level-01-strawberry-boxes');
  assert.equal(levels[0]?.title, '24 顆草莓怎麼裝盒？');
});
