# Math King V2 Gameplay Design

## Goal
Upgrade the existing Kids Logic Lab into **Math King**, a mobile-first 2D educational game where children manipulate a world to discover mathematical rules before the formal vocabulary is revealed.

## Non-negotiable constraints
- Keep all existing levels, progress, XP, stars, coins, achievements, mistakes, report, duel mode, settings and reduced-motion behavior.
- No replacement project or showcase site; modify this repository in place.
- DOM + Phaser Canvas hybrid: DOM remains responsible for shell, HUD, dialogue, tutorial copy, accessibility and controls; Phaser owns game-world manipulation and feedback.
- GitHub Pages must remain deployable at `/kids-logic-lab/`.
- Mobile portrait is primary; 44px minimum interactive targets; pointer/touch/mouse and keyboard fallbacks.
- First phase converts only factor factory, LCM race/bus sync, and lamp mission to the V2 game standard.

## Architecture
### Shell and navigation
`src/app.js` keeps the current hash router and legacy routes. Home and map are visually upgraded but continue to navigate into existing level ids so saved progress remains compatible.

### Phaser host
`src/game/GameHost.js` owns Phaser lifecycle, responsive scaling, cleanup, reduced-motion configuration and scene mounting. Game scenes are isolated inside level-specific DOM sections instead of taking over the full page.

### Shared systems
- `src/game/RewardSystem.js`: bridges scene success to existing `completeLevel` reward logic and DOM reward animation.
- `src/game/AudioManager.js`: central low-volume WebAudio cues respecting sound settings.
- `src/game/CameraEffects.js`: shake/zoom/flash helpers disabled or softened under reduced motion.
- `src/game/ParticleEffects.js`: lightweight generated textures / particles; no large art dependency.
- `src/interactions/*`: slider / drag / snap / timeline primitives where interaction behavior is shared.
- `src/tutorial/*`: step controller, coach mark and NPC dialogue; one action per step.
- `src/effects/*`: DOM GSAP reward effects for HUD values and completion overlays.

### Data
`src/data/levelV2.js` adds story, objective, world, concept, skills, steps and life applications without changing the legacy `levels` array contract. `realLifeApplications` is shared data, not duplicated in each scene.

### Math-first separation
Pure helpers in `src/math/gameplay.js` describe visual outcomes without requiring DOM or Phaser:
- lamp layout / remainder for a proposed spacing
- first common bus return time and arrivals
- equal grouping / remainder for 45 items
These helpers are unit tested and scenes only visualize their outputs.

## Level flows
### Park Lamp Project / GCD
The player adjusts a distance ruler. Lamps are redrawn around 120m, 168m and 192m edges. Invalid spacing visibly leaves a final remainder; valid but smaller spacing is accepted as workable but the NPC asks for fewer lamps. 24m triggers scene celebration, then the overlay maps the observed segments to `120÷24=5`, `168÷24=7`, `192÷24=8`, and only then reveals 最大公因數 / GCD.

### Bus Sync Station / LCM
The red bus returns every 6 minutes and the blue bus every 8 minutes. A Phaser timeline supports play, pause, one-minute step, slow/normal speed and replay. Buses physically enter the station at each arrival; minute 24 is the first simultaneous arrival. The formal multiple lists and LCM vocabulary appear only after the shared return is seen.

### Supermarket Logistics / Factors
45 oranges are distributed into a selected number of boxes. Valid choices distribute equally; invalid choices visibly leave oranges on the conveyor. The player discovers all valid group counts 1, 3, 5, 9, 15 and 45. Only after discovery does the game define these counts as factors of 45.

## Home and city map
Home becomes a small animated Math King City scene with a procedural Phaser background (roads, park, shop, bus, construction, distant math tower) plus DOM CTA/HUD. The map is a DOM city layout with building-style nodes so legacy levels remain accessible; V2 zones are visually highlighted and future zones can be added without changing router semantics.

## Accessibility and motion
Phaser interactions always have equivalent DOM controls and aria labels. Tutorial focus uses DOM coach marks. `reducedMotion` suppresses shake, strong zoom, dense particles, parallax and exaggerated bounce while retaining all game state changes.

## Build and Pages
Use Phaser `4.2.1`, Vite `8.3.0`, GSAP `3.15.0`, and KaTeX `0.18.7`. Vite `base` is `/kids-logic-lab/`. CI installs dependencies, runs tests and builds. Pages continues to publish from the existing `gh-pages` branch, which will receive built `dist` output after feature verification.

## Validation
- Existing Node tests remain green.
- New tests cover valid/invalid lamp spacing and remainder, 6/8 first common return = 24, factor grouping valid/invalid cases and factor set for 45.
- `npm run build` must succeed in GitHub Actions.
- Manual responsive checks target 390×844, 430×932, 768×1024 and 1440×900.
