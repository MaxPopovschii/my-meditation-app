import { createContext, useContext, useReducer, useEffect } from 'react';

const ProgressContext = createContext();

const initialState = {
  totalSessions: 0,
  totalMinutes: 0,
  streak: 0,
  lastSession: null,
  completedMeditations: [],
  achievements: []
};

function progressReducer(state, action) {
  switch (action.type) {
    case 'ADD_SESSION':
      return {
        ...state,
        totalSessions: state.totalSessions + 1,
        totalMinutes: state.totalMinutes + action.payload.duration,
        lastSession: new Date(),
        completedMeditations: [
          ...state.completedMeditations,
          action.payload
        ]
      };
    case 'UPDATE_STREAK':
      return {
        ...state,
        streak: action.payload
      };
    default:
      return state;
  }
}

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('meditation-progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      Object.entries(parsed).forEach(([key, value]) => {
        dispatch({ type: 'RESTORE', payload: { key, value } });
      });
    }
  }, []);

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('meditation-progress', JSON.stringify(state));
  }, [state]);

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}