# 數學王 Math King

> 把數學放進生活裡，用遊戲自己發現答案。

`kids-logic-lab` 正在從「互動式數學教材 + 遊戲 UI」升級為真正可操作的 2D 教育遊戲。核心流程是：

**PLAY → SEE → THINK → DISCOVER → EXPLAIN → APPLY**

孩子先遇到生活問題、直接操作世界、看見成功或失敗的原因，最後才揭曉數學名稱與正式算式。

## Math King V2

第一階段保留所有既有關卡與進度系統，只把三個代表關卡升級為 V2 Game Standard：

- **公園路燈工程**：120m / 168m / 192m 三條路即時排燈。拖動距離尺時，非法距離會真的留下紅色剩餘路段；合法但較小的距離會使用更多路燈；24m 成功後才揭曉最大公因數 GCD。
- **公車同步站**：紅車每 6 分鐘、藍車每 8 分鐘。可開始、暫停、逐分鐘、調速度、重播；公車真的進站，24 分鐘第一次同時回站後才揭曉最小公倍數 LCM。
- **超市物流中心**：45 顆橘子依玩家選擇的箱數實際分配。不能平均分時，剩餘橘子會留在輸送帶；找齊 1、3、5、9、15、45 後才定義「因數」。

三關都包含：

- Phaser Canvas 真實物件與動畫
- Drag + Snap / Timeline 等操作
- 世界本身呈現錯誤，而不是只顯示「答錯」
- 原創數學王助手 NPC
- STEP-by-STEP Tutorial
- Camera / Particle / Reward feedback
- 成功後 KaTeX 算式揭曉
- 生活應用卡片與小挑戰
- reduced motion 版本
- DOM accessible fallback controls

## 技術架構

### Phaser 4

使用 **Phaser 4.2.1**，負責：

- 首頁數學王城市場景
- 三個 V2 關卡場景
- Sprite / Game Object
- Drag & Snap
- Tween / Timeline
- Camera feedback
- Particle reward
- Touch / Mouse pointer interaction

### DOM + Canvas Hybrid

不是把整個網站塞進 Canvas。

**DOM** 繼續負責：

- HUD
- 導覽
- NPC 對話
- 教學文字
- 操作按鈕與鍵盤 fallback
- 錯題本 / 成就 / 報告 / 設定
- Accessibility

**Phaser Canvas** 只負責真正需要「玩」的世界與物件。

### GSAP

使用 **GSAP 3.15.0** 做 DOM reward / HUD 微動畫。

### KaTeX

使用 **KaTeX 0.18.7**。公式只在玩家先操作並發現規律之後出現。

### Vite

使用 **Vite 8.3.0** 打包靜態網站。`vite.config.js` 固定：

```text
base: /kids-logic-lab/
```

避免 GitHub Pages 子路徑資源 404。

## 重要目錄

```text
src/
├─ game/
│  ├─ GameHost.js
│  ├─ AudioManager.js
│  ├─ CameraEffects.js
│  ├─ ParticleEffects.js
│  ├─ RewardSystem.js
│  └─ scenes/
│     ├─ HomeCityScene.js
│     ├─ LampMissionScene.js
│     ├─ BusSyncScene.js
│     └─ FactorLogisticsScene.js
├─ interactions/
│  ├─ Slider.js
│  └─ Timeline.js
├─ tutorial/
│  ├─ StepController.js
│  └─ NpcDialogue.js
├─ effects/
│  └─ RewardEffects.js
├─ math/
│  ├─ core.js
│  └─ gameplay.js
├─ data/
│  ├─ chapters.js
│  └─ levelV2.js
└─ levels/
   ├─ v2Common.js
   ├─ lampMission.js
   ├─ lcmRace.js
   └─ factorFactory.js
```

## 保留的既有系統

V2 沒有更換既有儲存 key 或關卡 id，因此原本的：

- 題庫
- XP / 等級 / 星星 / 金幣
- 關卡解鎖與世界地圖
- 錯題本
- 成就
- 今日學習報告
- 雙人模式
- 自由練習
- 設定
- sound / music
- reduced motion
- 其餘既有數學關卡

都繼續沿用。

## 開發

需求：Node.js 22。

```bash
npm install
npm run dev
```

Vite 開發伺服器啟動後即可測試。

## 測試

```bash
npm test
npm run check
npm run build
```

核心 unit tests 包含：

- GCD / LCM / factor 原有數學邏輯
- 120/168/192 路燈合法與非法距離、剩餘路段
- 6/8 公車第一次共同時間 = 24
- 45 顆橘子的合法與非法平均分組
- 45 的合法箱數集合

Playwright 提供兩層驗證：

```bash
npx playwright install chromium
npm run test:responsive
npm run test:browser
```

`test:responsive` 專門驗證以下尺寸：

- 390 × 844
- 430 × 932
- 768 × 1024
- 1440 × 900

`test:browser` 是 CI 的完整瀏覽器驗收，除了以上四個尺寸，還會真的把三個 V2 關卡玩到概念揭曉，確認：

- 路燈 24m → 最大公因數 / GCD 揭曉
- 1、3、5、9、15、45 六種裝箱 → 45 的因數揭曉
- 公車逐分鐘走到 24 → 最小公倍數 / LCM 揭曉
- reduced motion 開啟後仍可完成關卡
- 自由練習、雙人、錯題、成就、報告、設定等既有路由可正常開啟
- Canvas、44px 操作目標、runtime error 與橫向溢位檢查

## Production Build

```bash
npm run build
```

輸出：

```text
dist/
```

這是可直接部署的靜態網站。

## GitHub Pages

正式網址：

<https://teuton.github.io/kids-logic-lab/>

Pages 繼續使用既有 `gh-pages` 分支，不切換 Pages 設定。

`main` 更新後，`deploy-gh-pages` workflow 會：

1. `npm install`
2. `npm test`
3. `npm run build`
4. 將 `dist` 同步到既有 `gh-pages`
5. 用一般 commit + fast-forward push 發布，**不 force push**

## 未來 V2 擴充

目前架構已可繼續套用到：分數披薩店、超市找零、折扣商店、角度建築師、面積裝潢、體積裝箱、時間排班、比例飲料店、速度賽車、機率遊樂園、邏輯密室、數線跳躍、幾何拼板與紙張摺疊。

原則不變：**數學不是遊戲外的題目；數學是解決遊戲問題的工具。**
