import { useState } from 'react';

export function useHistory() {
  const [history, setHistory] = useState([]);

  const addToHistory = (entry) => {
    setHistory(prev => [...prev, entry]);
  };

  return { history, addToHistory };
}