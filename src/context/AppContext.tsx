import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AppState, MissionFeedback } from '../types';
import { store } from '../storage/store';

interface AppContextValue {
  state: AppState;
  refresh: () => void;
  setActiveChild: (childId: string) => void;
  completeMission: (missionId: string, childId: string) => void;
  addFeedback: (feedback: Omit<MissionFeedback, 'id' | 'createdAt'>) => void;
  exportData: () => string;
  isMissionComplete: (missionId: string, childId: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => store.getState());

  const refresh = useCallback(() => setState(store.getState()), []);

  const setActiveChild = useCallback((childId: string) => {
    setState(store.setActiveChild(childId));
  }, []);

  const completeMission = useCallback((missionId: string, childId: string) => {
    setState(store.completeMission(missionId, childId));
  }, []);

  const addFeedback = useCallback(
    (feedback: Omit<MissionFeedback, 'id' | 'createdAt'>) => {
      setState(store.addFeedback(feedback));
    },
    [],
  );

  const exportData = useCallback(() => store.exportJson(), []);

  const isMissionComplete = useCallback(
    (missionId: string, childId: string) =>
      store.isMissionComplete(missionId, childId),
    [state.completions],
  );

  const value = useMemo(
    () => ({
      state,
      refresh,
      setActiveChild,
      completeMission,
      addFeedback,
      exportData,
      isMissionComplete,
    }),
    [state, refresh, setActiveChild, completeMission, addFeedback, exportData, isMissionComplete],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
