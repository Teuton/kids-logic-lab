# Math King V2 Implementation Plan

> **For agentic workers:** Execute inline only. Do not use subagents for this project.

**Goal:** Convert the existing site into a mobile-first DOM + Phaser educational game shell and deliver three V2 gameplay-standard math levels without breaking legacy progress or routes.

**Architecture:** Keep the current hash router and saved-state model. Add a small Phaser host plus pure gameplay math helpers, reusable tutorial/effect modules, and level-specific scenes mounted inside DOM pages. Vite builds static output with the GitHub Pages base path.

**Tech Stack:** Phaser 4.2.1, Vite 8.3.0, GSAP 3.15.0, KaTeX 0.18.7, native ES modules, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-14-math-king-gameplay-v2-design.md`

## Global Constraints
- Preserve all existing level ids and current saved progress compatibility.
- Preserve duel, mistakes, achievements, report and settings routes.
- First phase only converts `factor-factory`, `lcm-race`, and `lamp-mission`.
- DOM remains responsible for HUD, tutorial text, buttons and accessible fallbacks.
- Phaser scenes are embedded, responsive and destroyed on route change.
- `reducedMotion` must suppress strong motion effects without changing behavior.
- Vite base path must be `/kids-logic-lab/`.
- Do not use `git add .`, force-push, or overwrite unrelated changes.

---

### Task 1: Add failing gameplay rules tests
**Files:**
- Create: `tests/gameplay-v2.test.mjs`
- Create later: `src/math/gameplay.js`

**Interfaces:**
- `lampSpacingState(sides, spacing)` -> `{ valid, edges, totalLamps }`
- `busSyncState(intervals, limit)` -> `{ firstCommon, arrivals }`
- `groupingState(total, boxes)` -> `{ valid, perBox, remainder }`
- `validGroupCounts(total)` -> number[]

- [ ] Write tests for 12m/24m/32m lamp spacing, 6/8 bus sync at 24, 45÷5, 45÷4 remainder, and `[1,3,5,9,15,45]`.
- [ ] Push test-only commit and verify CI fails because `src/math/gameplay.js` is missing.

### Task 2: Implement pure gameplay math helpers
**Files:**
- Create: `src/math/gameplay.js`

- [ ] Implement the tested helpers with no DOM or Phaser dependency.
- [ ] Verify `npm test` and syntax checks in CI.

### Task 3: Add Vite dependencies, build configuration and shared data
**Files:**
- Modify: `package.json`
- Create: `vite.config.js`
- Modify: `index.html`
- Create: `src/data/levelV2.js`
- Modify: `.github/workflows/test.yml`

- [ ] Add exact dependency versions: Phaser 4.2.1, GSAP 3.15.0, KaTeX 0.18.7, Vite 8.3.0.
- [ ] Add `dev`, `build`, `preview`, `test`, and `check` scripts.
- [ ] Configure Vite `base: '/kids-logic-lab/'`.
- [ ] Import site CSS from `src/main.js` or Vite entry and preserve legacy modules.
- [ ] Extend CI to run `npm ci`, tests, syntax checks and `npm run build`.
- [ ] Add world/concept/story/objective/skills/life application data for V2 levels.

### Task 4: Add reusable Phaser host, tutorial and effects
**Files:**
- Create: `src/game/GameHost.js`
- Create: `src/game/AudioManager.js`
- Create: `src/game/CameraEffects.js`
- Create: `src/game/ParticleEffects.js`
- Create: `src/game/RewardSystem.js`
- Create: `src/interactions/Slider.js`
- Create: `src/interactions/Timeline.js`
- Create: `src/tutorial/StepController.js`
- Create: `src/tutorial/NpcDialogue.js`
- Create: `src/effects/RewardEffects.js`
- Create: `src/styles/math-king-v2.css`

- [ ] Mount one Phaser scene inside a supplied DOM host and return a cleanup function.
- [ ] Respect `reducedMotion` in camera, particles and GSAP helpers.
- [ ] Provide tutorial step progression and DOM coach-highlight utilities.
- [ ] Keep all interactive DOM targets >=44px and focus-visible.

### Task 5: Convert the three V2 levels
**Files:**
- Modify: `src/levels/lampMission.js`
- Modify: `src/levels/lcmRace.js`
- Modify: `src/levels/factorFactory.js`
- Create: `src/game/scenes/LampMissionScene.js`
- Create: `src/game/scenes/BusSyncScene.js`
- Create: `src/game/scenes/FactorLogisticsScene.js`

- [ ] Lamp scene: 120/168/192 park edges, adjustable spacing, live lamp placement, visible remainder, 24m success, camera/particle reward, delayed GCD reveal and life-use cards.
- [ ] Bus scene: red 6-minute and blue 8-minute buses, station timeline, play/pause/step/speed/replay, 24-minute simultaneous arrival, delayed LCM reveal.
- [ ] Logistics scene: 45 oranges, selectable box counts, animated equal distribution, visible remainders, discover all factors, delayed factor definition.
- [ ] Use existing `completeLevel` so XP/stars/coins and next-level behavior stay compatible.

### Task 6: Upgrade home, HUD and world map
**Files:**
- Modify: `src/app.js`
- Modify: `src/ui/shell.js`
- Modify: `src/data/chapters.js`
- Create: `src/game/scenes/HomeCityScene.js`

- [ ] Rename visible product to Math King / 數學王 while keeping storage key and level ids unchanged.
- [ ] Add embedded animated city canvas with procedural buildings, traffic, clouds and math tower.
- [ ] Add stronger DOM CTA, continue button and existing secondary modes.
- [ ] Convert level path presentation into city districts/buildings while retaining every existing level.
- [ ] Add non-emoji primary HUD icon shapes where practical; emoji remains fallback only.

### Task 7: README, CI verification, merge and Pages deployment
**Files:**
- Modify: `README.md`
- Potentially create/update deployment workflow only if required by existing branch-based Pages flow.

- [ ] Document Math King V2, Phaser/Vite/GSAP/KaTeX, DOM + Canvas architecture and commands.
- [ ] Verify feature-branch Actions: tests, check and build all succeed.
- [ ] Open PR to `main`, merge only after green checks.
- [ ] Build static output and update existing `gh-pages` publication path without changing repository Pages settings.
- [ ] Verify `https://teuton.github.io/kids-logic-lab/` loads built assets from `/kids-logic-lab/`.
- [ ] Report original SHA, final SHA, branch, commits, test/build results and any remaining manual-device limitations.
