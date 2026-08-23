import type { AppState, MissionCompletion, MissionFeedback } from '../types';

const STORAGE_KEY = 'powerful-kids-state-v1';

const defaultState = (): AppState => ({
  activeChildId: 'ayaan',
  completions: [],
  feedback: [],
  lastPracticeDate: null,
  practiceStreak: 0,
  totalPowerPractices: 0,
});

function loadRaw(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function save(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function updateStreak(state: AppState): AppState {
  const today = todayKey();
  if (state.lastPracticeDate === today) return state;

  let streak = 1;
  if (state.lastPracticeDate === yesterdayKey()) {
    streak = state.practiceStreak + 1;
  }

  return {
    ...state,
    lastPracticeDate: today,
    practiceStreak: streak,
    totalPowerPractices: state.totalPowerPractices + 1,
  };
}

export const store = {
  getState(): AppState {
    return loadRaw();
  },

  setActiveChild(childId: string): AppState {
    const state = { ...loadRaw(), activeChildId: childId };
    save(state);
    return state;
  },

  completeMission(missionId: string, childId: string): AppState {
    let state = loadRaw();
    const exists = state.completions.some(
      (c) => c.missionId === missionId && c.childId === childId,
    );
    if (!exists) {
      const completion: MissionCompletion = {
        missionId,
        childId,
        completedAt: new Date().toISOString(),
      };
      state = { ...state, completions: [...state.completions, completion] };
      state = updateStreak(state);
    }
    save(state);
    return state;
  },

  addFeedback(feedback: Omit<MissionFeedback, 'id' | 'createdAt'>): AppState {
    const entry: MissionFeedback = {
      ...feedback,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const state = { ...loadRaw(), feedback: [...loadRaw().feedback, entry] };
    save(state);
    return state;
  },

  exportJson(): string {
    const state = loadRaw();
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        product: 'Powerful Kids',
        ...state,
      },
      null,
      2,
    );
  },

  isMissionComplete(missionId: string, childId: string): boolean {
    return loadRaw().completions.some(
      (c) => c.missionId === missionId && c.childId === childId,
    );
  },

  getCompletionsForChild(childId: string): MissionCompletion[] {
    return loadRaw().completions.filter((c) => c.childId === childId);
  },

  getFeedbackForChild(childId: string): MissionFeedback[] {
    return loadRaw().feedback.filter((f) => f.childId === childId);
  },
};
