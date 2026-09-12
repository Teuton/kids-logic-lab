import { levelFromXp } from './scoring.js';

const STORAGE_KEY = 'kidsLogicLab.progress.v1';
const todayKey = () => new Date().toISOString().slice(0, 10);

function initialState() {
  return {
    version: 1, xp: 0, coins: 0, stars: 0,
    completedLevels: [], levelStars: {}, mistakes: [], answers: [], achievements: [],
    settings: { sound: true, music: false, reducedMotion: false },
    daily: { date: todayKey(), seconds: 0, questions: 0, correct: 0 }, lastOpened: Date.now(),
  };
}

function normalize(state) {
  const base = initialState();
  const merged = { ...base, ...(state || {}) };
  merged.settings = { ...base.settings, ...(state?.settings || {}) };
  merged.daily = state?.daily?.date === todayKey() ? { ...base.daily, ...state.daily } : base.daily;
  return merged;
}

export function loadProgress() {
  try { return normalize(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')); }
  catch { return initialState(); }
}

export function saveProgress(state) { state.lastOpened = Date.now(); localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return state; }
export function getPlayerSummary(state) { return { level: levelFromXp(state.xp), xp: state.xp, coins: state.coins, stars: state.stars, completed: state.completedLevels.length }; }

export function awardLevel(state, levelId, stars, reward) {
  if (!state.completedLevels.includes(levelId)) state.completedLevels.push(levelId);
  const previous = state.levelStars[levelId] || 0;
  state.levelStars[levelId] = Math.max(previous, stars);
  state.stars += Math.max(0, stars - previous); state.xp += reward.xp; state.coins += reward.coins;
  return saveProgress(state);
}

export function recordAnswer(state, { questionId, concept, correct, playerAnswer, correctAnswer, hint = '', question = '' }) {
  state.answers.push({ questionId, concept, correct, at: Date.now() }); state.answers = state.answers.slice(-200);
  state.daily.questions += 1; if (correct) state.daily.correct += 1;
  if (!correct) addMistake(state, { questionId, concept, playerAnswer, correctAnswer, hint, question });
  saveProgress(state);
}

export function addMistake(state, mistake) {
  const existing = state.mistakes.find((item) => item.questionId === mistake.questionId && !item.mastered);
  if (existing) { existing.attempts += 1; existing.playerAnswer = mistake.playerAnswer; existing.updatedAt = Date.now(); }
  else state.mistakes.unshift({ ...mistake, attempts: 1, mastered: false, createdAt: Date.now() });
  state.mistakes = state.mistakes.slice(0, 100);
}

export function markMistakeMastered(state, questionId) { const item = state.mistakes.find((m) => m.questionId === questionId); if (item) item.mastered = true; saveProgress(state); }
export function setSetting(state, key, value) { state.settings[key] = value; saveProgress(state); }
export function addPlaySeconds(state, seconds) { state.daily.seconds += Math.max(0, Math.round(seconds)); saveProgress(state); }
export function resetProgress() { const state = initialState(); saveProgress(state); return state; }
