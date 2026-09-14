import { getFactors, lcmMany } from './core.js';

export function lampSpacingState(sides, spacing) {
  const safeSides = Array.isArray(sides) ? sides.map(Number) : [];
  const step = Number(spacing);
  if (!Number.isFinite(step) || step <= 0) {
    return {
      valid: false,
      edges: safeSides.map((length) => ({ length, segments: 0, remainder: length })),
      totalLamps: 0,
    };
  }

  const edges = safeSides.map((length) => ({
    length,
    segments: Math.floor(length / step),
    remainder: length % step,
  }));
  const valid = edges.length > 0 && edges.every((edge) => edge.remainder === 0);
  const totalLamps = valid ? edges.reduce((sum, edge) => sum + edge.segments, 0) : 0;
  return { valid, edges, totalLamps };
}

export function busSyncState(intervals, limit = 60) {
  const safeIntervals = (Array.isArray(intervals) ? intervals : [])
    .map(Number)
    .filter((value) => Number.isFinite(value) && value > 0);
  const maxMinute = Math.max(0, Math.floor(Number(limit) || 0));
  const arrivals = {};

  for (const interval of safeIntervals) {
    const values = [];
    for (let minute = 0; minute <= maxMinute; minute += interval) values.push(minute);
    arrivals[interval] = values;
  }

  return {
    firstCommon: safeIntervals.length ? lcmMany(safeIntervals) : 0,
    arrivals,
  };
}

export function groupingState(total, boxes) {
  const itemCount = Math.max(0, Math.floor(Number(total) || 0));
  const boxCount = Math.floor(Number(boxes) || 0);
  if (boxCount <= 0) return { valid: false, perBox: 0, remainder: itemCount };
  const perBox = Math.floor(itemCount / boxCount);
  const remainder = itemCount % boxCount;
  return { valid: remainder === 0, perBox, remainder };
}

export function validGroupCounts(total) {
  return getFactors(Math.floor(Number(total) || 0));
}
