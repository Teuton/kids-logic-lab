import { describe, expect, it } from 'vitest';
import { levels } from '../src/data/chapters.js';

describe('official Math King level order', () => {
  it('publishes a continuous 1 through 40 level sequence', () => {
    expect(levels).toHaveLength(40);
    expect(levels.map((level) => level.order)).toEqual(
      Array.from({ length: 40 }, (_, index) => index + 1),
    );
  });

  it('does not expose the legacy prime forest as level 1', () => {
    expect(levels[0]?.title).not.toBe('質數森林');
    expect(levels[0]?.order).toBe(1);
  });
});
