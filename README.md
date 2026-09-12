# Kids Logic Lab｜因數冒險島

給國小高年級學生的互動邏輯數學遊戲。第一章以「先玩、再觀察、再猜、再說明」的方式學質數、因數、互質、最大公因數與最小公倍數。

## 已完成的第一階段

- 遊戲首頁、世界地圖、XP / 等級 / 星星 / 金幣
- 質數森林：Pointer Events 拖曳分類
- 因數工廠：45 的因數配對乘法機
- 互質守門員：GCD=1 城門判斷
- 最大公因數礦坑：質因數礦石
- 最小公倍數賽道：開始 / 暫停 / 1×2×4× / 逐步 / 重播
- 尾數 0 工廠：50! 中 5 因子視覺化
- 操場追逐戰：150 秒 vs 120 秒跑道動畫
- 路燈工程：120 / 168 / 192 最大共同間距模擬
- 數字怪獸分隊：6 隻怪獸拖曳分組、質因數能量平衡
- 自由練習 10 題、隨機變化題、錯題本與再次挑戰
- 同裝置 2 人對戰：拖曳 + GCD/LCM 速度回合、答錯鎖定
- 今日學習報告、成就與設定
- 本機進度封裝儲存，可日後替換成 API
- 390px 手機、iPad、桌面 Responsive；支援 reduced motion

## 開發 / 測試

不需要安裝任何前端套件；GitHub Pages 可直接從 repository root 發佈。

```bash
npm test
npm run check
python3 -m http.server 8080
```

數學測試覆蓋教材指定案例：

- `isPrime(17) = true`
- `isPrime(27) = false`
- `gcd(165,217) = 1`
- `gcdMany([57,95,209]) = 19`
- `lcm(132,44) = 132`
- `lcmMany([15,16,18]) = 720`
- `lcm(150,120) = 600`
- `gcdMany([120,168,192]) = 24`
- `countTrailingZerosFactorial(50) = 12`

## GitHub Pages

在 repository **Settings → Pages → Build and deployment** 選擇 **Deploy from a branch**，Branch 選 `main` / `(root)`。
