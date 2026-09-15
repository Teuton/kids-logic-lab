export const lifeMissionLevels = [
  {
    id: 'level-20-meeting', order: 20, title: '兩個角色在哪裡碰面？', icon: '🏃', subtitle: '8 格與 11 格的腳步第一次重合', xp: 150, world: 'stadium', concept: 'lcm',
    story: 'A 每次走 8 格，B 每次走 11 格，兩人從同一位置出發。', objective: '觀察兩種步長，找出第一次同時踩到的位置。',
    stages: [
      { label: '讓 A 往前走', result: 'A：8、16、24、32、40、48、56、64、72、80、88' },
      { label: '讓 B 往前走', result: 'B：11、22、33、44、55、66、77、88' },
      { label: '把兩條路線疊起來', result: '第一個共同踩到的位置是 88。88 ÷ 8 = 11，88 ÷ 11 = 8。' },
    ],
    challenge: { type: 'number', prompt: '兩個角色第一次會在第幾格碰面？', answer: 88, suffix: '格' },
    hints: ['找兩串數字第一次重複的位置。', 'A 的步長是 8，B 的步長是 11。', '88 同時可以被 8 和 11 整除。'],
  },
  {
    id: 'level-21-candy-filter', order: 21, title: '96 顆糖果留下 66 顆', icon: '🍬', subtitle: '依照規則一步步篩選', xp: 145, world: 'supermarket', concept: 'logic-filter',
    story: '倉庫有 96 顆糖果，不能直接做 96−66，要照規則逐步整理。', objective: '觀察每次排除後剩下多少，理解連續條件篩選。',
    stages: [
      { label: '排除過期商品', result: '96 → 88，排除了 8 顆。' },
      { label: '排除包裝破損', result: '88 → 74，又排除了 14 顆。' },
      { label: '排除不能出售的口味', result: '74 → 66，再排除了 8 顆。' },
    ],
    challenge: { type: 'number', prompt: '完成三次篩選後，最後留下幾顆？', answer: 66, suffix: '顆' },
    hints: ['每一步都從「目前剩下的數量」繼續。', '依序看 96→88→74。', '最後一步是 74→66。'],
  },
  {
    id: 'level-22-and-logic', order: 22, title: '誰可以參加校外活動？', icon: '🎒', subtitle: '帽子 AND 水壺 AND 名牌', xp: 145, world: 'amusement', concept: 'and-logic',
    story: '參加活動必須同時有帽子、水壺、名牌，少一樣都不行。', objective: '逐項檢查條件，理解「而且」代表全部都要成立。',
    stages: [
      { label: '先檢查帽子', result: '只通過第一關還不代表能參加。' },
      { label: '再檢查水壺', result: '同時有帽子和水壺的人留下來。' },
      { label: '最後檢查名牌', result: '三個條件都符合的人才通過。小明缺名牌，所以不能參加。' },
    ],
    challenge: { type: 'choice', prompt: '小明有帽子、有水壺，但沒有名牌。他可以參加嗎？', options: [{ value: 'no', label: '不可以' }, { value: 'yes', label: '可以' }], answer: 'no' },
    hints: ['規則中每一項都用「而且」連接。', '三項要同時成立。', '缺名牌就不符合全部條件。'],
  },
  {
    id: 'level-23-juice-ratio', order: 23, title: '果汁怎麼調才一樣甜？', icon: '🥤', subtitle: '2：1 整組一起放大', xp: 150, world: 'supermarket', concept: 'ratio',
    story: '原配方是果汁 2 杯、水 1 杯，要做更多份但甜度不能改變。', objective: '把比例中的每一項乘上同一個倍率。',
    stages: [
      { label: '做 1 份', result: '果汁：水 = 2：1' },
      { label: '做 2 份', result: '2：1 整組 ×2 → 4：2' },
      { label: '做 3 份', result: '2：1 整組 ×3 → 6：3' },
    ],
    challenge: { type: 'choice', prompt: '做 3 份時，哪個比例維持相同甜度？', options: [{ value: '6:3', label: '6：3' }, { value: '5:3', label: '5：3' }, { value: '3:2', label: '3：2' }], answer: '6:3' },
    hints: ['不是只增加其中一邊。', '兩個數要乘上同一倍率。', '2×3=6，1×3=3。'],
  },
  {
    id: 'level-24-feed-ratio', order: 24, title: '農場飼料 6：2：1', icon: '🌽', subtitle: '玉米、豆類、營養粉等比例放大', xp: 155, world: 'factory', concept: 'ratio',
    story: '飼料比例是玉米：豆類：營養粉 = 6：2：1。', objective: '從 1 倍、2 倍、3 倍一路觀察，再由玉米 24 杯反推倍率。',
    stages: [
      { label: '先做 1 倍', result: '6、2、1' },
      { label: '再做 2 倍', result: '12、4、2' },
      { label: '再做 3 倍', result: '18、6、3' },
    ],
    challenge: { type: 'text', prompt: '玉米有 24 杯時，豆類與營養粉各要幾杯？請輸入「豆類,營養粉」', answer: '8,4', target: { corn: 24, beans: 8, supplement: 4 } },
    hints: ['先看 6 變成 24 是幾倍。', '6×4=24，所以每一項都 ×4。', '2×4=8，1×4=4。'],
  },
  {
    id: 'level-25-farm-tiling', order: 25, title: '14 × 12 的農田怎麼鋪？', icon: '🧩', subtitle: '找能完整鋪滿的正方形拼板', xp: 155, world: 'construction', concept: 'divisibility',
    story: '一塊 14×12 的長方形農田，要用相同尺寸的正方形拼板完全鋪滿。', objective: '先算總格數，再實際比較不同正方形邊長是否會留下空隙。',
    stages: [
      { label: '先算總格數', result: '14 × 12 = 168 格。' },
      { label: '試 2×2', result: '14 和 12 都能被 2 整除，可以完整鋪滿。' },
      { label: '試 3×3、4×4', result: '3 不能整除 14；4 不能整除 14，所以都會留下空隙。' },
    ],
    challenge: { type: 'multi', prompt: '下列哪些正方形邊長可以完整鋪滿 14×12？', options: [{ value: '1', label: '1×1' }, { value: '2', label: '2×2' }, { value: '3', label: '3×3' }, { value: '4', label: '4×4' }], answers: ['1', '2'] },
    hints: ['邊長要同時整除 14 和 12。', '先檢查 14 能不能整除，再檢查 12。', '1 和 2 都是兩個數的共同因數。'],
  },
  {
    id: 'level-26-largest-tile', order: 26, title: '想用最大的正方形地墊', icon: '🟩', subtitle: '共同尺寸裡找最大的', xp: 160, world: 'construction', concept: 'gcd',
    story: '同一塊 14×12 農田，這次希望每一塊正方形越大越好。', objective: '找出 14 和 12 的共同因數，再選最大共同尺寸。',
    stages: [
      { label: '找 14 的因數', result: '14：1、2、7、14' },
      { label: '找 12 的因數', result: '12：1、2、3、4、6、12' },
      { label: '圈出共同尺寸', result: '共同尺寸只有 1、2；最大的就是 2。' },
    ],
    challenge: { type: 'choice', prompt: '最大的正方形地墊邊長是多少？', options: [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '4', label: '4' }, { value: '6', label: '6' }], answer: '2' },
    hints: ['要同時整除兩條邊。', '共同可用的尺寸是 1 和 2。', '最大共同尺寸是 2。'],
  },
  {
    id: 'level-27-half-fold', order: 27, title: '一張紙對摺一次', icon: '📄', subtitle: '把一個完整平均分成兩份', xp: 140, world: 'construction', concept: 'fraction',
    story: '一張紙代表 1 個完整的東西，對摺一次變成兩個相同部分。', objective: '用折紙看見 1/2，並理解兩個 1/2 合起來仍是 1。',
    stages: [
      { label: '把紙對摺', result: '整張紙被平均分成 2 份，每一份是 1/2。' },
      { label: '打開並標記兩半', result: '左半 1/2 + 右半 1/2。' },
      { label: '把兩半合回去', result: '1/2 + 1/2 = 1。' },
    ],
    challenge: { type: 'choice', prompt: '兩個 1/2 合起來是多少？', options: [{ value: '1', label: '1 個完整' }, { value: '1/2', label: '1/2' }, { value: '2', label: '2' }], answer: '1' },
    hints: ['兩份剛好把整張紙填滿。', '每一份是二分之一。', '1/2 + 1/2 = 2/2 = 1。'],
  },
  {
    id: 'level-28-fold-doubling', order: 28, title: '一直對摺會怎麼變？', icon: '🗂️', subtitle: '1、2、4、8、16 的倍增規律', xp: 145, world: 'construction', concept: 'doubling',
    story: '每對摺一次，紙張的份數都會發生固定變化。', objective: '實際觀察 1→2→4→8→16，找出每一次的規律。',
    stages: [
      { label: '對摺第 1 次', result: '1 → 2 份' },
      { label: '對摺第 2 次', result: '2 → 4 份' },
      { label: '再對摺兩次', result: '4 → 8 → 16 份' },
    ],
    challenge: { type: 'choice', prompt: '每對摺一次，份數發生什麼變化？', options: [{ value: 'x2', label: '×2' }, { value: '+2', label: '+2' }, { value: 'x3', label: '×3' }], answer: 'x2' },
    hints: ['比較相鄰兩個數。', '2÷1、4÷2、8÷4 都一樣。', '每次都是乘以 2。'],
  },
  {
    id: 'level-29-cake-fractions', order: 29, title: '蛋糕怎麼公平分？', icon: '🍰', subtitle: '2/4 和 1/2 是同一份量', xp: 150, world: 'supermarket', concept: 'fraction-equivalence',
    story: '蛋糕先分給 2 人，再改成 4 人，觀察同一個整體可以怎麼表示。', objective: '把兩塊 1/4 合起來，看見 2/4 = 1/2。',
    stages: [
      { label: '分給 2 人', result: '每人得到 1/2。' },
      { label: '改成 4 人', result: '每人得到 1/4。' },
      { label: '拿兩塊 1/4 合起來', result: '1/4 + 1/4 = 2/4，大小剛好和 1/2 一樣。' },
    ],
    challenge: { type: 'choice', prompt: '2/4 和哪一個分數一樣大？', options: [{ value: '1/2', label: '1/2' }, { value: '1/4', label: '1/4' }, { value: '3/4', label: '3/4' }], answer: '1/2' },
    hints: ['想像四等份中拿兩份。', '兩份四分之一剛好是半個蛋糕。', '2/4 約分後是 1/2。'],
  },
  {
    id: 'level-30-exact-spend', order: 30, title: '100 元剛好花完', icon: '🪙', subtitle: '用不同商品組合湊出 100', xp: 155, world: 'supermarket', concept: 'combinations',
    story: '你有 100 元，商店有牛奶 30、麵包 20、水果 25、餅乾 10 元。', objective: '調整購買數量，讓總價剛好等於 100 元。',
    stages: [
      { label: '先看四種價格', result: '牛奶 30、麵包 20、水果 25、餅乾 10。' },
      { label: '試一組組合', result: '30 + 30 + 20 + 20 = 100。' },
      { label: '再找另一種', result: '25 × 4 = 100，也能剛好花完。' },
    ],
    challenge: { type: 'counters', prompt: '自己調整數量，湊出剛好 100 元。', target: 100, items: [{ key: 'milk', label: '牛奶', price: 30 }, { key: 'bread', label: '麵包', price: 20 }, { key: 'fruit', label: '水果', price: 25 }, { key: 'cookie', label: '餅乾', price: 10 }] },
    hints: ['先挑一種價格，看看還差多少。', '可以重複買同一種商品。', '例如 30+30+20+20。'],
  },
  {
    id: 'level-31-unit-price', order: 31, title: '哪一包比較便宜？', icon: '🏷️', subtitle: '比較單價，不只看總價', xp: 150, world: 'supermarket', concept: 'unit-price',
    story: '商品 A：6 瓶 90 元；商品 B：10 瓶 140 元。', objective: '把總價除以數量，換成每瓶價格再比較。',
    stages: [
      { label: '算 A 的每瓶價格', result: '90 ÷ 6 = 15 元／瓶。' },
      { label: '算 B 的每瓶價格', result: '140 ÷ 10 = 14 元／瓶。' },
      { label: '比較單價', result: '14 < 15，所以 B 每瓶比較便宜。' },
    ],
    challenge: { type: 'choice', prompt: '哪一包比較便宜？', options: [{ value: 'B', label: '商品 B' }, { value: 'A', label: '商品 A' }, { value: 'same', label: '一樣便宜' }], answer: 'B' },
    hints: ['總價不同時，要先換成相同單位。', 'A 是 15 元／瓶。', 'B 是 14 元／瓶，所以 B 較便宜。'],
  },
  {
    id: 'level-32-movie-time', order: 32, title: '我要趕得上電影嗎？', icon: '🎬', subtitle: '把車程與走路時間接起來', xp: 150, world: 'bus-stop', concept: 'time',
    story: '電影 14:00 開始，公車 13:15 出發，車程 25 分鐘，下車後再走 10 分鐘。', objective: '沿著時間線一步一步加上行程時間。',
    stages: [
      { label: '搭公車 25 分鐘', result: '13:15 + 25 分鐘 = 13:40。' },
      { label: '再走路 10 分鐘', result: '13:40 + 10 分鐘 = 13:50。' },
      { label: '和電影時間比較', result: '14:00 − 13:50 = 還有 10 分鐘。' },
    ],
    challenge: { type: 'number', prompt: '照原本行程，到電影院後還剩幾分鐘？', answer: 10, suffix: '分鐘' },
    hints: ['先算公車抵達時間。', '13:15+25=13:40，再加走路 10 分鐘。', '13:50 到 14:00 還有 10 分鐘。'],
  },
  {
    id: 'level-33-desk-layout', order: 33, title: '教室桌椅怎麼排？', icon: '🪑', subtitle: '24 張桌子的長方形排列', xp: 155, world: 'construction', concept: 'factors',
    story: '24 張桌子要排成整齊長方形，但教室橫排最多只能放 6 張。', objective: '先列出所有因數配對，再加入真實空間限制篩選。',
    stages: [
      { label: '列出所有長方形', result: '1×24、2×12、3×8、4×6。' },
      { label: '加入「橫排最多 6 張」', result: '24、12、8 都太寬，只剩 4×6。' },
      { label: '確認桌數', result: '4×6 = 24，沒有少桌子也沒有多桌子。' },
    ],
    challenge: { type: 'choice', prompt: '哪一種排列符合橫排最多 6 張？', options: [{ value: '4x6', label: '4 × 6' }, { value: '3x8', label: '3 × 8' }, { value: '2x12', label: '2 × 12' }], answer: '4x6' },
    hints: ['先看第二個數有沒有超過 6。', '8、12、24 都超過限制。', '4×6 剛好 24，而且橫排是 6。'],
  },
  {
    id: 'level-34-sports-teams', order: 34, title: '運動會怎麼分隊？', icon: '🏅', subtitle: '32 人等分，再加入每隊人數限制', xp: 155, world: 'stadium', concept: 'factors',
    story: '32 位學生要分成每隊相同人數；每隊至少 4 人、不能超過 8 人。', objective: '從所有因數中再次篩選，最後比較哪個方案隊伍數最多。',
    stages: [
      { label: '先找能平均分的隊伍人數', result: '32 的因數包含 1、2、4、8、16、32。' },
      { label: '套用 4～8 人限制', result: '符合的只剩每隊 4 人或 8 人。' },
      { label: '比較隊伍數', result: '4 人一隊有 8 隊；8 人一隊有 4 隊，所以想要隊伍最多就選 4 人。' },
    ],
    challenge: { type: 'choice', prompt: '希望隊伍數最多，應該每隊幾人？', options: [{ value: '4', label: '4 人' }, { value: '8', label: '8 人' }], answer: '4' },
    hints: ['總人數固定，隊伍越小，隊伍數越多。', '4 人一隊：32÷4=8 隊。', '8 隊比 4 隊多。'],
  },
  {
    id: 'level-35-boxing', order: 35, title: '貨物怎麼裝箱？', icon: '📦', subtitle: '48 個蘋果選合適箱型', xp: 155, world: 'supermarket', concept: 'divisibility',
    story: '有 48 個蘋果，箱子可選每箱 4、6、8、10 個。', objective: '先找能完全裝完的箱型，再從中選箱子數最少的方案。',
    stages: [
      { label: '檢查每箱 4 個', result: '48÷4=12 箱，剛好裝完。' },
      { label: '檢查 6、8、10 個', result: '6→8 箱；8→6 箱；10 會有剩餘。' },
      { label: '比較箱子數', result: '可行方案中每箱 8 個只要 6 箱，箱子數最少。' },
    ],
    challenge: { type: 'choice', prompt: '希望箱子數最少，應選每箱幾個？', options: [{ value: '8', label: '8 個' }, { value: '6', label: '6 個' }, { value: '4', label: '4 個' }, { value: '10', label: '10 個' }], answer: '8' },
    hints: ['先排除不能整除 48 的箱型。', '4、6、8 都可以，10 不行。', '比較 12、8、6 箱，最少是 6 箱。'],
  },
  {
    id: 'level-36-tree-spacing', order: 36, title: '果樹要種多遠？', icon: '🌳', subtitle: '24 公尺田埂的等距種植', xp: 155, world: 'park', concept: 'constraints',
    story: '24 公尺田埂要等距種樹，可試每 2、3、4、6 公尺；後來又要求每兩棵至少距離 4 公尺。', objective: '先找能整除長度的間距，再加入最小距離條件。',
    stages: [
      { label: '檢查 2、3、4、6 公尺', result: '四種間距都能整除 24，端點能對齊。' },
      { label: '加入至少 4 公尺限制', result: '2、3 太近；只剩 4 或 6 公尺。' },
      { label: '比較能種的數量', result: '在合法方案中，4 公尺間距較小，所以能安排更多棵樹。' },
    ],
    challenge: { type: 'choice', prompt: '若還希望能種的棵數最多，應選哪個合法間距？', options: [{ value: '4', label: '4 公尺' }, { value: '6', label: '6 公尺' }], answer: '4' },
    hints: ['先符合「至少 4 公尺」。', '合法間距是 4 和 6。', '固定長度裡，間距較小可以放更多位置。'],
  },
  {
    id: 'level-37-gear-ratio', order: 37, title: '齒輪傳動比實驗室', icon: '⚙️', subtitle: '12 齒帶動 24 齒', xp: 165, world: 'factory', concept: 'ratio',
    story: '修理腳踏車變速器：主動齒輪 12 齒、從動齒輪 24 齒，觀察兩顆齒輪的轉動關係。', objective: '讓齒輪正確咬合，從齒數比推理轉數比。',
    example: { driverTeeth: 12, drivenTeeth: 24, driverTurns: 2, drivenTurns: 1 },
    stages: [
      { label: '裝上 12 齒主動齒輪', result: '主動齒輪：12 齒。' },
      { label: '裝上 24 齒從動齒輪', result: '從動齒輪齒數是主動齒輪的 2 倍，因此轉得比較慢。' },
      { label: '讓主動齒輪轉 2 圈', result: '12×2 = 24 個齒通過咬合點，剛好讓 24 齒從動齒輪轉 1 圈。' },
    ],
    challenge: { type: 'number', prompt: '主動齒輪轉 2 圈時，從動齒輪轉幾圈？', answer: 1, suffix: '圈' },
    hints: ['比較兩顆齒輪的齒數。', '從動齒輪齒數是主動齒輪 2 倍。', '12×2÷24=1。'],
  },
  {
    id: 'level-38-recipe-scale', order: 38, title: '優格早餐的等比例配方挑戰', icon: '🥣', subtitle: '4 人份放大成 6 人份', xp: 165, world: 'supermarket', concept: 'ratio-volume',
    story: '依照食譜準備優格燕麥杯，從 4 人份等比例放大到 6 人份。', objective: '每一種材料都乘上 6÷4=1.5，並真的使用半杯刻度。',
    recipe: { base: { people: 4, yogurt: 1, oats: 2, berries: 4 }, target: { people: 6, yogurt: 1.5, oats: 3, berries: 6 } },
    stages: [
      { label: '完成 4 人份原食譜', result: '優格 1 杯、燕麥 2 杯、莓果 4 匙。' },
      { label: '算放大倍率', result: '6÷4 = 1.5，所以所有材料都要 ×1.5。' },
      { label: '量出 6 人份', result: '優格 1½ 杯、燕麥 3 杯、莓果 6 匙；半杯刻度是必要操作。' },
    ],
    challenge: { type: 'recipe', prompt: '用量取按鈕完成 6 人份配方。', target: { yogurt: 1.5, oats: 3, berries: 6 } },
    hints: ['6 人份是 4 人份的 1.5 倍。', '優格 1 杯要再加半杯。', '1×1.5=1.5、2×1.5=3、4×1.5=6。'],
    sourceNote: '本關人數與食譜數值為自編、可編輯任務資料。',
  },
  {
    id: 'level-39-map-scale', order: 39, title: '地圖比例', icon: '🗺️', subtitle: '把地圖上的公分換成真實距離', xp: 165, world: 'construction', concept: 'scale',
    story: '孩子拿著校園周邊地圖規劃步行路線。這張練習地圖規定 1 公分代表 200 公尺。', objective: '量出地圖距離，再依比例換算真實距離。',
    stages: [
      { label: '讀懂比例尺', result: '地圖 1 cm → 真實 200 m。' },
      { label: '量學校到圖書館', result: '地圖上 3.5 cm，所以真實距離 3.5×200 = 700 m。' },
      { label: '再量公園路線', result: '地圖上 4.2 cm，所以真實距離 4.2×200 = 840 m。' },
    ],
    challenge: { type: 'number', prompt: '地圖上 4.2 公分代表真實多少公尺？', answer: 840, suffix: '公尺' },
    hints: ['每 1 公分就是 200 公尺。', '把 4.2 乘以 200。', '4.2×200=840。'],
    sourceNote: '原規劃只指定「地圖比例」主題；比例尺、路線與數值為本關自編、可編輯任務資料。',
  },
  {
    id: 'level-40-school-fair', order: 40, title: '綜合任務——辦班級園遊會', icon: '🎪', subtitle: '把人數、時間、比例、地圖與預算一起用', xp: 200, world: 'amusement', concept: 'integrated',
    story: '班上要辦園遊會，必須同時處理分組、飲料配方、路線距離與預算。', objective: '把前面學過的數學當成工具，完成一份可執行的園遊會計畫。',
    stages: [
      { label: '先安排工作人員', result: '24 位學生，每組 4 人 → 6 組。' },
      { label: '準備飲料', result: '每 6 杯需要果汁 4 杯、水 2 杯；要做 18 杯就是 ×3 → 果汁 12 杯、水 6 杯。' },
      { label: '確認搬運路線', result: '地圖 1 cm 代表 50 m，攤位到倉庫 6 cm → 300 m。' },
      { label: '核對預算', result: '材料 260 元、杯子 80 元、裝飾 60 元，共 400 元，沒有超過 500 元預算。' },
    ],
    challenge: { type: 'choice', prompt: '這份園遊會計畫最後剩多少預算？', options: [{ value: '100', label: '100 元' }, { value: '80', label: '80 元' }, { value: '60', label: '60 元' }], answer: '100' },
    hints: ['先把三項支出加起來。', '260+80+60=400。', '500−400=100。'],
    sourceNote: '原規劃只指定「綜合任務：辦班級園遊會」主題；人數、時刻、食譜、價格、地圖與預算均為本關自編、可編輯任務資料。',
  },
];

export function lifeMissionByOrder(order) {
  return lifeMissionLevels.find((level) => level.order === Number(order)) || null;
}

export function lifeMissionById(id) {
  return lifeMissionLevels.find((level) => level.id === id) || null;
}
