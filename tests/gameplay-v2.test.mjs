import test from 'node:test';
import assert from 'node:assert/strict';
import {
  lampSpacingState,
  busSyncState,
  groupingState,
  validGroupCounts,
} from '../src/math/gameplay.js';

test('路燈距離會回報每條邊的完整段數與剩餘距離', () => {
  const state = lampSpacingState([120, 168, 192], 32);
  assert.equal(state.valid, false);
  assert.deepEqual(state.edges.map((edge) => edge.remainder), [24, 8, 0]);
  assert.deepEqual(state.edges.map((edge) => edge.segments), [3, 5, 6]);
});

test('12m 可完整排列但 24m 才是更少路燈的合法方案', () => {
  const twelve = lampSpacingState([120, 168, 192], 12);
  const twentyFour = lampSpacingState([120, 168, 192], 24);
  assert.equal(twelve.valid, true);
  assert.equal(twentyFour.valid, true);
  assert.equal(twelve.totalLamps, 40);
  assert.equal(twentyFour.totalLamps, 20);
});

test('6 分鐘與 8 分鐘公車第一次再次同時進站是 24 分鐘', () => {
  const state = busSyncState([6, 8], 30);
  assert.equal(state.firstCommon, 24);
  assert.deepEqual(state.arrivals[6], [0, 6, 12, 18, 24, 30]);
  assert.deepEqual(state.arrivals[8], [0, 8, 16, 24]);
});

test('45 顆橘子分 5 箱剛好，分 4 箱會剩 1 顆', () => {
  assert.deepEqual(groupingState(45, 5), { valid: true, perBox: 9, remainder: 0 });
  assert.deepEqual(groupingState(45, 4), { valid: false, perBox: 11, remainder: 1 });
});

test('45 可以完整分組的箱數就是 45 的因數', () => {
  assert.deepEqual(validGroupCounts(45), [1, 3, 5, 9, 15, 45]);
});
