import { useState } from 'react';

export function useHistory() {
  const [fullHistory, setFullHistory] = useState([]);
  const [recentHistory, setRecentHistory] = useState([]);

  const addToHistory = (entry) => {
    setFullHistory(prev => [...prev, entry]);
    setRecentHistory(prev => [...prev.slice(-2), entry]); // Keep last 3
  };

  const clearRecentHistory = () => {
    setRecentHistory([]);
  };

  return { fullHistory, recentHistory, addToHistory, clearRecentHistory };
}