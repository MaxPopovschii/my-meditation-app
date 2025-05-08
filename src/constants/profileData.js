export const SAMPLE_MEDITATIONS = [
  { id: 1, name: 'Respiro Consapevole', sessions: 12, totalMinutes: 120 },
  { id: 2, name: 'Meditazione Guidata', sessions: 8, totalMinutes: 160 },
  { id: 3, name: 'Body Scan', sessions: 5, totalMinutes: 75 },
  { id: 4, name: 'Mindfulness', sessions: 3, totalMinutes: 45 }
];

export const ENHANCED_ACHIEVEMENTS = [
  { 
    id: 1, 
    icon: '🌱', 
    title: 'Primi Passi', 
    description: 'Completa la tua prima sessione',
    progress: 1,
    total: 1,
    completed: true,
    completedDate: '2024-05-08'
  },
  { 
    id: 2, 
    icon: '🔥', 
    title: 'Streak Master', 
    description: 'Mantieni una streak di 7 giorni',
    progress: 5,
    total: 7,
    completed: false
  }
];

export const INITIAL_PLANNED_SESSIONS = [
  {
    id: 1,
    title: 'Meditazione Mattutina',
    date: '2024-05-08T08:00:00',
    duration: 15,
    type: 'Respiro Consapevole'
  }
];