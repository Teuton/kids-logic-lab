export const levels = [
  { id: 'prime-forest', order: 1, title: '質數森林', icon: '🌲', subtitle: '把數字送回正確的家', xp: 90 },
  { id: 'factor-factory', order: 2, title: '因數工廠', icon: '⚙️', subtitle: '啟動 45 的乘法機器', xp: 100 },
  { id: 'coprime-gate', order: 3, title: '互質守門員', icon: '🏰', subtitle: 'GCD = 1 才能通過', xp: 110 },
  { id: 'gcd-mine', order: 4, title: '最大公因數礦坑', icon: '⛏️', subtitle: '挖出共同的質因數', xp: 120 },
  { id: 'lcm-race', order: 5, title: '最小公倍數賽道', icon: '🏁', subtitle: '找第一次一起到達的位置', xp: 120 },
  { id: 'zero-factory', order: 6, title: '尾數 0 工廠', icon: '🏭', subtitle: '用 2 和 5 製造 10', xp: 120 },
  { id: 'running-track', order: 7, title: 'BOSS：操場追逐戰', icon: '🏃', subtitle: '再次同時回到起點', xp: 150 },
  { id: 'lamp-mission', order: 8, title: 'BOSS：路燈工程', icon: '💡', subtitle: '找最大的共同間距', xp: 150 },
  { id: 'number-balance', order: 9, title: 'BOSS：數字怪獸分隊', icon: '👾', subtitle: '讓兩隊質因數能量平衡', xp: 180 },
];

export const chapter = {
  id: 'factors-lcm-gcd',
  title: '第一章｜最大公因數與最小公倍數',
  shortTitle: '因數冒險島',
  levels,
};

export function levelById(id) {
  return levels.find((level) => level.id === id);
}
