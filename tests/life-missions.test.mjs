import test from 'node:test';
import assert from 'node:assert/strict';
import { lifeMissionLevels, lifeMissionByOrder } from '../src/data/lifeMissionLevels.js';
import {
  firstCommonMultiple,
  exactDivisorsFromChoices,
  largestSquareTile,
  addMinutes,
  scaleRecipe,
  gearDrivenTurns,
} from '../src/math/lifeMissions.js';

test('levels 20 through 40 are registered exactly once in order', () => {
  assert.equal(lifeMissionLevels.length, 21);
  assert.deepEqual(lifeMissionLevels.map((level) => level.order), Array.from({ length: 21 }, (_, index) => index + 20));
  assert.equal(new Set(lifeMissionLevels.map((level) => level.id)).size, 21);
});

test('level 24 feed ratio and level 37 gear ratio stay independent', () => {
  const feed = lifeMissionByOrder(24);
  const gear = lifeMissionByOrder(37);
  assert.equal(feed.id, 'level-24-feed-ratio');
  assert.equal(gear.id, 'level-37-gear-ratio');
  assert.notEqual(feed.id, gear.id);
  assert.deepEqual(feed.challenge.target, { corn: 24, beans: 8, supplement: 4 });
  assert.deepEqual(gear.example, { driverTeeth: 12, drivenTeeth: 24, driverTurns: 2, drivenTurns: 1 });
});

test('level 38 keeps the required half-cup yogurt target', () => {
  const recipe = lifeMissionByOrder(38);
  assert.deepEqual(recipe.recipe.base, { people: 4, yogurt: 1, oats: 2, berries: 4 });
  assert.deepEqual(recipe.recipe.target, { people: 6, yogurt: 1.5, oats: 3, berries: 6 });
});

test('core mission math matches the teaching values', () => {
  assert.equal(firstCommonMultiple(8, 11), 88);
  assert.deepEqual(exactDivisorsFromChoices(48, [4, 6, 8, 10]), [4, 6, 8]);
  assert.equal(largestSquareTile(14, 12), 2);
  assert.equal(addMinutes('13:15', 35), '13:50');
  assert.deepEqual(scaleRecipe({ yogurt: 1, oats: 2, berries: 4 }, 1.5), { yogurt: 1.5, oats: 3, berries: 6 });
  assert.equal(gearDrivenTurns(12, 24, 2), 1);
});
