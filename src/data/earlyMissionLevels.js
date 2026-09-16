const option = (value, label = String(value)) => ({ value: String(value), label });

export const earlyMissionLevels = [
  {
    id: 'level-01-strawberry-boxes', order: 1, title: '24 顆草莓怎麼裝盒？', icon: '🍓', subtitle: '找出可以平均裝完的盒數', xp: 100, world: 'supermarket', concept: 'factors',
    story: '水果店有 24 顆草莓，每盒要一樣多，而且一顆也不能剩。', objective: '試不同盒數，找出哪些盒數能把 24 顆草莓平均裝完。',
    stages: [
      { label: '先試 5 盒', result: '24 ÷ 5 會剩 4 顆，所以 5 不是 24 的因數。' },
      { label: '再試 6 盒', result: '24 ÷ 6 = 4，每盒 4 顆，完全沒有剩。' },
      { label: '整理所有成功盒數', result: '1、2、3、4、6、8、12、24 都能平均裝完。' },
    ],
    challenge: { type: 'multi', prompt: '哪些盒數可以把 24 顆草莓平均裝完？', options: [1,2,3,4,5,6,7,8,12,24].map(option), answers: [1,2,3,4,6,8,12,24] },
    hints: ['不能有剩下的草莓。', '可以用 24 ÷ 盒數檢查餘數。', '24 的因數共有 1、2、3、4、6、8、12、24。'],
  },
  {
    id: 'level-02-student-groups', order: 2, title: '30 位學生怎麼分組？', icon: '🧑‍🤝‍🧑', subtitle: '平均分組後再加入人數限制', xp: 105, world: 'stadium', concept: 'factors',
    story: '班上有 30 位學生，要分成每組人數相同的小隊。', objective: '先找能整除 30 的每組人數，再套用「每組至少 5 人、最多 10 人」。',
    stages: [
      { label: '試每組 2 人', result: '30 ÷ 2 = 15 組，可以平均分完。' },
      { label: '試每組 4 人', result: '30 ÷ 4 會剩 2 人，所以不行。' },
      { label: '加入 5～10 人限制', result: '符合平均分組又在範圍內的是每組 5、6、10 人。' },
    ],
    challenge: { type: 'multi', prompt: '哪些每組人數同時符合「平均分完、至少 5 人、最多 10 人」？', options: [2,3,4,5,6,10,15].map(option), answers: [5,6,10] },
    hints: ['先找 30 的因數。', '再留下 5 到 10 之間的數。', '5、6、10 都可以整除 30。'],
  },
  {
    id: 'level-03-drink-boxes', order: 3, title: '36 瓶飲料裝箱', icon: '🧃', subtitle: '用餘數判斷每箱幾瓶', xp: 110, world: 'supermarket', concept: 'factors',
    story: '倉庫有 36 瓶飲料，要每箱裝一樣多，而且不能剩。', objective: '依序嘗試不同的每箱瓶數，找出可行的裝箱方式。',
    stages: [
      { label: '試每箱 2 瓶', result: '36 ÷ 2 = 18 箱，剛好裝完。' },
      { label: '試每箱 5 瓶', result: '36 ÷ 5 會剩 1 瓶，所以 5 不行。' },
      { label: '找乘法配對', result: '4×9、6×6、3×12 都能乘回 36。' },
    ],
    challenge: { type: 'multi', prompt: '在這些選項中，哪些每箱瓶數可以剛好裝完 36 瓶？', options: [2,3,4,5,6].map(option), answers: [2,3,4,6] },
    hints: ['看除完後有沒有餘數。', '36 可以被 2、3、4、6 整除。', '5 會留下 1 瓶。'],
  },
  {
    id: 'level-04-fruit-rectangles', order: 4, title: '水果可以排成幾種長方形？', icon: '🍊', subtitle: '用長方形排列看見因數配對', xp: 110, world: 'construction', concept: 'factors-prime',
    story: '把水果排成完整長方形，可以直接看見一個數有哪些乘法配對。', objective: '比較 7、8 等數字能排出的長方形，觀察質數與合數的差異。',
    stages: [
      { label: '排 7 顆水果', result: '7 只能排成 1×7；除了 1 和自己沒有其他因數。' },
      { label: '排 8 顆水果', result: '8 可以排成 1×8，也可以排成 2×4。' },
      { label: '比較排列方式', result: '只能有 1×自己這組因數配對的數，會成為後面的「質數」。' },
    ],
    challenge: { type: 'choice', prompt: '哪一個數和 7 一樣，只能排成 1×自己的長方形？', options: [option(5), option(6), option(9), option(11)], answer: 11 },
    hints: ['找只有 1 和自己兩個因數的數。', '6 和 9 都能排出別的長方形。', '11 只有 1×11。'],
  },
  {
    id: 'level-05-prime-detective', order: 5, title: '質數偵探', icon: '🕵️', subtitle: '從 1～50 找出只有兩個因數的數', xp: 115, world: 'park', concept: 'prime',
    story: '偵探要從數字名單中找出「剛好只有兩個因數」的數。', objective: '用 2、3、5、7 的倍數規律排除合數，再檢查剩下的候選。',
    stages: [
      { label: '先排除 2 的倍數', result: '除了 2 本身，其他偶數都至少還能被 2 整除。' },
      { label: '再檢查 3、5、7', result: '像 21 = 3×7，所以 21 不是質數。' },
      { label: '留下真正質數', result: '質數必須剛好只有 1 和自己兩個正因數。' },
    ],
    challenge: { type: 'multi', prompt: '下面哪些是質數？', options: [option(21), option(23), option(29), option(33)], answers: [23,29] },
    hints: ['21 可以拆成 3×7。', '33 可以拆成 3×11。', '23 和 29 都只有 1 和自己能整除。'],
  },
  {
    id: 'level-06-one-prime', order: 6, title: '1 到底是不是質數？', icon: '1️⃣', subtitle: '用因數個數建立質數規則', xp: 115, world: 'park', concept: 'prime-composite',
    story: '1、2、3、4、5 排成一列，但「1」到底要放進質數還是合數那一邊？', objective: '逐一數因數個數，建立「質數剛好兩個因數」的規則。',
    stages: [
      { label: '檢查 2、3、5', result: '2、3、5 都只有 1 和自己兩個因數，所以是質數。' },
      { label: '檢查 4', result: '4 有 1、2、4 三個因數，所以是合數。' },
      { label: '最後檢查 1', result: '1 只有一個正因數，因此既不是質數，也不是合數。' },
    ],
    challenge: { type: 'choice', prompt: '數字 1 應該怎麼分類？', options: [option('prime','質數'), option('composite','合數'), option('neither','既不是質數也不是合數')], answer: 'neither' },
    hints: ['質數要「剛好」有兩個正因數。', '1 只有因數 1。', '所以 1 不符合質數，也不符合合數。'],
  },
  {
    id: 'level-07-prime-factor-12', order: 7, title: '12 的質因數拆解工作坊', icon: '🧱', subtitle: '一路拆到每一塊都是質數', xp: 120, world: 'factory', concept: 'prime-factorization',
    story: '工作坊要把 12 拆成最基本、不能再拆的質數積木。', objective: '先找乘法拆法，再繼續把合數拆開，直到全部都是質數。',
    stages: [
      { label: '先把 12 拆成 3×4', result: '3 已經是質數，但 4 還可以繼續拆。' },
      { label: '把 4 再拆成 2×2', result: '得到 12 = 2×2×3。' },
      { label: '乘回去驗證', result: '2×2×3 = 12，拆解正確。' },
    ],
    challenge: { type: 'choice', prompt: '12 的質因數分解是哪一個？', options: [option('2x6','2×6'), option('3x4','3×4'), option('2x2x3','2×2×3')], answer: '2x2x3' },
    hints: ['最後每一個因數都必須是質數。', '4 還不是質數，要再拆一次。', '12 = 2×2×3。'],
  },
  {
    id: 'level-08-number-block-factory', order: 8, title: '數字積木工廠', icon: '🏭', subtitle: '拆解 18、24、30、36 並乘回驗證', xp: 125, world: 'factory', concept: 'prime-factorization',
    story: '工廠收到 18、24、30、36 四種數字積木，要拆成最基本的質數零件。', objective: '每次拆解後檢查零件是不是質數，最後再乘回原數。',
    stages: [
      { label: '拆 18', result: '18 = 2×9 = 2×3×3。' },
      { label: '拆 24', result: '24 = 2×12 = 2×2×6 = 2×2×2×3。' },
      { label: '用乘法驗貨', result: '把所有質因數乘回去，必須得到原本的數字。' },
    ],
    challenge: { type: 'choice', prompt: '36 的質因數分解是哪一個？', options: [option('6x6','6×6'), option('2x18','2×18'), option('2x2x3x3','2×2×3×3')], answer: '2x2x3x3' },
    hints: ['答案裡不能再出現合數零件。', '6、18 都還能繼續拆。', '36 = 2×2×3×3。'],
  },
  {
    id: 'level-09-picnic-bags', order: 9, title: '野餐袋怎麼分？', icon: '🧺', subtitle: '24 餅乾與 36 飲料一起平均分', xp: 130, world: 'park', concept: 'common-factors',
    story: '野餐有 24 塊餅乾、36 瓶飲料，要分成內容完全相同的袋子。', objective: '找出袋數必須同時整除 24 和 36，不能讓任何東西剩下。',
    stages: [
      { label: '先試 2 袋', result: '每袋 12 塊餅乾、18 瓶飲料，成功。' },
      { label: '再試 3 袋', result: '每袋 8 塊餅乾、12 瓶飲料，也成功。' },
      { label: '試 5 袋', result: '24 和 36 都不能被 5 整除，所以失敗。' },
    ],
    challenge: { type: 'multi', prompt: '哪些袋數能讓 24 塊餅乾和 36 瓶飲料都平均分完？', options: [1,2,3,4,5,6,12].map(option), answers: [1,2,3,4,6,12] },
    hints: ['袋數要同時是 24 和 36 的因數。', '5 不是兩者的共同因數。', '共同因數是 1、2、3、4、6、12。'],
  },
  {
    id: 'level-10-max-packages', order: 10, title: '最多能做幾份套餐？', icon: '🍱', subtitle: '從共同因數中找最大的那一個', xp: 135, world: 'supermarket', concept: 'gcd',
    story: '有 24 塊餅乾和 36 瓶飲料，要做出最多份完全相同的套餐。', objective: '比較可行的套餐份數 2、3、4、6、12，找出最大的可行數。',
    stages: [
      { label: '確認 6 份', result: '每份 4 塊餅乾、6 瓶飲料，可以。' },
      { label: '再試 12 份', result: '每份 2 塊餅乾、3 瓶飲料，也可以。' },
      { label: '比較所有共同因數', result: '12 是 24 和 36 最大的共同因數，所以可以做最多 12 份。' },
    ],
    challenge: { type: 'number', prompt: '最多可以做幾份完全相同的套餐？', answer: 12, suffix: '份' },
    hints: ['先找 24 和 36 的共同因數。', '題目要「最多份」。', '最大的共同因數是 12。'],
  },
  {
    id: 'level-11-common-factors', order: 11, title: '共同因數在哪裡？', icon: '🔎', subtitle: '把兩組因數交集找出來', xp: 135, world: 'factory', concept: 'common-factors',
    story: '把 18 和 24 的因數分成兩排，看看哪些數字同時出現在兩邊。', objective: '從兩組因數中找交集，為最大公因數做準備。',
    stages: [
      { label: '列出 18 的因數', result: '18 的因數：1、2、3、6、9、18。' },
      { label: '列出 24 的因數', result: '24 的因數：1、2、3、4、6、8、12、24。' },
      { label: '圈出重複數字', result: '共同因數是 1、2、3、6。' },
    ],
    challenge: { type: 'multi', prompt: '哪些是 18 和 24 的共同因數？', options: [1,2,3,4,6,8,9,12].map(option), answers: [1,2,3,6] },
    hints: ['要同時出現在兩邊。', '4 不是 18 的因數；9 不是 24 的因數。', '交集是 1、2、3、6。'],
  },
  {
    id: 'level-12-park-lamps', order: 12, title: '公園路燈工程', icon: '💡', subtitle: '120、168、192 公尺找最大等距', xp: 145, world: 'park', concept: 'gcd',
    story: '公園三條邊長 120、168、192 公尺，路燈必須等距，而且希望用最少的燈。', objective: '找一個三條邊都能整除的最大間距。',
    stages: [
      { label: '先試 12 公尺', result: '三條邊都能剛好排完，所以 12 是共同因數。' },
      { label: '再把間距拉大', result: '24 公尺仍然能讓 120、168、192 全部整除。' },
      { label: '確認不能再更大', result: '24 是三個長度的最大公因數；間距最大，路燈數也最少。' },
    ],
    challenge: { type: 'number', prompt: '三條邊都等距放燈時，最大的合法間距是多少？', answer: 24, suffix: '公尺' },
    hints: ['間距必須同時整除 120、168、192。', '12 可以，但題目還要求越大越好。', '最大共同因數是 24。'],
  },
  {
    id: 'level-13-coprime-basics', order: 13, title: '共同因數只剩 1？', icon: '🤝', subtitle: '用最大公因數 1 認識互質', xp: 140, world: 'park', concept: 'coprime',
    story: '有些兩個數字不是質數，卻可能沒有除了 1 以外的共同因數。', objective: '比較兩個數的因數，找出最大公因數是不是 1。',
    stages: [
      { label: '看 7 和 20', result: '7 的因數是 1、7；20 的因數是 1、2、4、5、10、20。' },
      { label: '找共同因數', result: '兩邊只共同擁有 1。' },
      { label: '揭曉名稱', result: '最大公因數是 1 的兩個數，叫做互質。' },
    ],
    challenge: { type: 'choice', prompt: '哪一組數互質？', options: [option('6,9','6 和 9'), option('7,20','7 和 20'), option('8,12','8 和 12')], answer: '7,20' },
    hints: ['互質代表最大公因數等於 1。', '6 和 9 共同有 3；8 和 12 共同有 4。', '7 和 20 只有共同因數 1。'],
  },
  {
    id: 'level-14-composite-coprime', order: 14, title: '兩個合數也能互質？', icon: '🧩', subtitle: '8 和 9 都是合數，但最大公因數是 1', xp: 145, world: 'park', concept: 'coprime',
    story: '「互質」不是說兩個數都要是質數。來看看 8 和 9。', objective: '列出 8 和 9 的因數，確認兩個合數也可能互質。',
    stages: [
      { label: '檢查 8', result: '8 的因數是 1、2、4、8，所以 8 是合數。' },
      { label: '檢查 9', result: '9 的因數是 1、3、9，所以 9 也是合數。' },
      { label: '找共同因數', result: '8 和 9 只有共同因數 1，所以它們互質。' },
    ],
    challenge: { type: 'choice', prompt: '8 和 9 的關係是什麼？', options: [option('both-prime','兩個都是質數'), option('coprime','兩個都是合數，而且互質'), option('not-coprime','兩個都是合數，而且不互質')], answer: 'coprime' },
    hints: ['先不要看它們是不是質數。', '只要檢查最大公因數是不是 1。', '8 和 9 都是合數，但共同因數只有 1。'],
  },
  {
    id: 'level-15-bus-multiples', order: 15, title: '公車每 6 分鐘來一次', icon: '🚌', subtitle: '從時刻表看見 6 的倍數', xp: 140, world: 'bus-stop', concept: 'multiples',
    story: '一班公車從 08:00 起每 6 分鐘到站一次。', objective: '觀察 08:06、08:12、08:18、08:24、08:30，把分鐘數和倍數連起來。',
    stages: [
      { label: '看前五班時間', result: '08:06、08:12、08:18、08:24、08:30。' },
      { label: '只看分鐘差', result: '6、12、18、24、30 都是 6 的倍數。' },
      { label: '繼續往後推', result: '下一次是 08:36，因為 36 也是 6 的倍數。' },
    ],
    challenge: { type: 'choice', prompt: '08:30 的下一班公車是幾點？', options: [option('08:34'), option('08:35'), option('08:36')], answer: '08:36' },
    hints: ['每次固定增加 6 分鐘。', '30 + 6 = 36。', '所以下一班是 08:36。'],
  },
  {
    id: 'level-16-bus-sync', order: 16, title: '兩班公車什麼時候一起來？', icon: '🚏', subtitle: '6 分鐘與 8 分鐘的班次第一次重合', xp: 145, world: 'bus-stop', concept: 'common-multiples',
    story: '紅車每 6 分鐘到站，藍車每 8 分鐘到站，現在兩台同時離站。', objective: '列出兩邊的到站時間，找到第一次再次同時到站。',
    stages: [
      { label: '列紅車時間', result: '紅車：6、12、18、24、30……' },
      { label: '列藍車時間', result: '藍車：8、16、24、32……' },
      { label: '找第一次重合', result: '第一次共同出現的是 24 分鐘。' },
    ],
    challenge: { type: 'number', prompt: '兩班公車第一次再次同時到站是幾分鐘後？', answer: 24, suffix: '分鐘' },
    hints: ['找 6 的倍數和 8 的倍數第一次重複。', '24 同時可以被 6 和 8 整除。', '第一次重合是 24。'],
  },
  {
    id: 'level-17-alarm-meeting', order: 17, title: '兩個鬧鐘', icon: '⏰', subtitle: '10 分鐘與 15 分鐘第一次同響', xp: 145, world: 'amusement', concept: 'lcm',
    story: '鬧鐘 A 每 10 分鐘響一次，鬧鐘 B 每 15 分鐘響一次，現在一起響。', objective: '列出兩邊時間，找第一次再次同時響鈴。',
    stages: [
      { label: '列 A 的時間', result: 'A：10、20、30、40、50、60……' },
      { label: '列 B 的時間', result: 'B：15、30、45、60……' },
      { label: '比較共同時間', result: '30 和 60 都是共同時間，但第一次是 30。' },
    ],
    challenge: { type: 'number', prompt: '兩個鬧鐘第一次再次一起響是幾分鐘後？', answer: 30, suffix: '分鐘' },
    hints: ['共同時間不只一個。', '題目問的是「第一次」。', '10 和 15 的最小公倍數是 30。'],
  },
  {
    id: 'level-18-amusement-rides', order: 18, title: '遊樂園班次', icon: '🎠', subtitle: '12 分鐘與 18 分鐘在 9:36 再同步', xp: 150, world: 'amusement', concept: 'lcm',
    story: '旋轉木馬每 12 分鐘一班，小火車每 18 分鐘一班，9:00 同時出發。', objective: '找兩個班次第一次再次同時出發的時間。',
    stages: [
      { label: '列旋轉木馬', result: '12、24、36、48……分鐘後出發。' },
      { label: '列小火車', result: '18、36、54……分鐘後出發。' },
      { label: '把 36 分鐘加回時鐘', result: '9:00 + 36 分鐘 = 9:36。' },
    ],
    challenge: { type: 'choice', prompt: '兩個設施第一次再次同時出發是幾點？', options: [option('09:24'), option('09:30'), option('09:36')], answer: '09:36' },
    hints: ['先找 12 和 18 的最小公倍數。', '第一次共同倍數是 36。', '9:00 加 36 分鐘就是 9:36。'],
  },
  {
    id: 'level-19-traffic-lights', order: 19, title: '兩個交通號誌', icon: '🚦', subtitle: '40 秒與 60 秒的循環在 120 秒重合', xp: 150, world: 'bus-stop', concept: 'lcm-time',
    story: '號誌 A 每 40 秒完成一次循環，號誌 B 每 60 秒完成一次循環，現在同時回到起點。', objective: '找第一次再次同時完成循環的秒數，並換算成分鐘。',
    stages: [
      { label: '列 A 的循環', result: 'A：40、80、120、160……秒。' },
      { label: '列 B 的循環', result: 'B：60、120、180……秒。' },
      { label: '找重合並換單位', result: '第一次重合是 120 秒，也就是 2 分鐘。' },
    ],
    challenge: { type: 'number', prompt: '兩個號誌第一次再次同時完成循環是幾分鐘後？', answer: 2, suffix: '分鐘' },
    hints: ['先找 40 和 60 的最小公倍數。', '第一次共同時間是 120 秒。', '120 秒 ÷ 60 = 2 分鐘。'],
  },
];
