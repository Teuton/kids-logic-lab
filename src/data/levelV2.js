export const realLifeApplications = {
  gcd: ['路燈等距排列', '樹木等距種植', '相同長度切割', '平均分組', '插旗子'],
  lcm: ['公車班次', '紅綠燈週期', '鐘聲', '輪班', '技能冷卻', '機器保養'],
  factors: ['物流裝箱', '座位分組', '平均分裝', '排成長方形', '包裝規格'],
};

export const v2Levels = {
  'lamp-mission': {
    id: 'lamp-mission',
    title: '公園路燈工程',
    world: 'park',
    concept: 'gcd',
    objective: '用最少的路燈完成三條路的等距排列',
    story: ['公園要裝新的路燈。', '每盞燈距離要完全一樣，三個轉角也一定要有燈。', '預算有限，希望路燈越少越好！'],
    skills: ['觀察餘數', '比較間距', '共同因數'],
    difficulty: 2,
    lifeApplications: realLifeApplications.gcd,
    steps: ['拖動距離尺', '觀察三條路的最後一段', '找一個三邊都剛好排完的距離', '再找更大的合法距離', '說出剛才發現的規律'],
  },
  'lcm-race': {
    id: 'lcm-race',
    title: '公車同步站',
    world: 'bus-stop',
    concept: 'lcm',
    objective: '找出兩台公車下一次一起回站的時間',
    story: ['紅色公車每 6 分鐘到站。', '藍色公車每 8 分鐘到站。', '它們現在一起離站，下一次什麼時候一起回來？'],
    skills: ['時間週期', '倍數', '共同出現'],
    difficulty: 2,
    lifeApplications: realLifeApplications.lcm,
    steps: ['按開始讓時間前進', '觀察每台公車何時回站', '需要時暫停或一步一步播放', '找到第一次兩台一起回站', '說出剛才發現的規律'],
  },
  'factor-factory': {
    id: 'factor-factory',
    title: '超市物流中心',
    world: 'supermarket',
    concept: 'factors',
    objective: '把 45 顆橘子平均裝箱，一顆也不能剩',
    story: ['物流中心收到 45 顆橘子。', '每箱要一樣多，而且不能剩下任何橘子。', '試試看哪些箱子數量可以完成任務。'],
    skills: ['平均分組', '餘數', '因數'],
    difficulty: 1,
    lifeApplications: realLifeApplications.factors,
    steps: ['拖動箱數選擇器', '看橘子是否能平均進箱', '記下沒有剩下橘子的箱數', '找齊所有可行箱數', '說出剛才發現的規律'],
  },
};

export const cityWorlds = [
  { id: 'supermarket', name: '超級市場', className: 'world-market' },
  { id: 'bus-stop', name: '公車站', className: 'world-bus' },
  { id: 'park', name: '公園', className: 'world-park' },
  { id: 'factory', name: '工廠', className: 'world-factory' },
  { id: 'construction', name: '建築工地', className: 'world-build' },
  { id: 'stadium', name: '運動場', className: 'world-stadium' },
  { id: 'amusement', name: '遊樂園', className: 'world-amusement' },
];

export function v2LevelById(id) {
  return v2Levels[id] || null;
}

export function worldForLevel(level) {
  if (v2Levels[level.id]) return v2Levels[level.id].world;
  if (level.id.includes('factory') || level.id === 'gear-ratio') return 'factory';
  if (level.id.includes('running') || level.id.includes('lcm')) return 'stadium';
  if (level.id.includes('rectangle') || level.id.includes('paper')) return 'construction';
  if (level.id.includes('prime') || level.id.includes('gcd') || level.id.includes('coprime')) return 'park';
  return 'amusement';
}
