export function levelFromXp(xp) {
  return Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 100)) + 1);
}

export function starsFor({ accuracy = 1, hintsUsed = 0 }) {
  if (accuracy >= 0.9 && hintsUsed === 0) return 3;
  if (accuracy >= 0.7 && hintsUsed <= 2) return 2;
  return 1;
}

export function rewardFor(baseXp, stars, hintsUsed = 0) {
  const hintPenalty = Math.min(0.25, hintsUsed * 0.05);
  const multiplier = 0.75 + stars * 0.15;
  return {
    xp: Math.max(10, Math.round(baseXp * multiplier * (1 - hintPenalty))),
    coins: 10 + stars * 8,
  };
}
