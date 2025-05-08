import { useEffect } from 'react';

export const useActivitySimulation = (setStats) => {
  useEffect(() => {
    const simulateActivity = () => {
      setStats(prev => ({
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + Math.floor(Math.random() * 10) + 5,
        experience: (prev.experience + 10) % 100,
        level: prev.experience > 90 ? prev.level + 1 : prev.level,
        streak: Math.random() > 0.3 ? prev.streak + 1 : prev.streak,
        lastSession: new Date().toISOString(),
        completedMeditations: prev.completedMeditations.map(med => ({
          ...med,
          sessions: Math.random() > 0.5 ? med.sessions + 1 : med.sessions,
          totalMinutes: med.totalMinutes + (Math.random() > 0.5 ? 10 : 0)
        }))
      }));
    };

    const interval = setInterval(simulateActivity, 30000);
    return () => clearInterval(interval);
  }, [setStats]);
};