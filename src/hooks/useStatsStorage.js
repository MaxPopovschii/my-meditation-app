import { useEffect } from 'react';

export const useStatsStorage = (stats, setStats) => {
  useEffect(() => {
    const savedStats = localStorage.getItem('meditation-stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('meditation-stats', JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  }, [stats]);
};