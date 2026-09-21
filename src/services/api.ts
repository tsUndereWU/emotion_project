import axios from 'axios';
import { AnalyzeResponse, HistoryItem } from '../types';

const API_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Локальная история (на фронтенде), т.к. бэкенд пока не хранит историю
let localHistory: HistoryItem[] = [];

export const analyzeText = async (text: string): Promise<AnalyzeResponse> => {
  // Реальный запрос к бэкенду
  const response = await apiClient.post('/analyze', { text });
  const data = response.data;

  // data = { sentiment, score, text, emoji, timestamp }
  const newItem: HistoryItem = {
    text: data.text,
    sentiment: data.sentiment,
    score: data.score,
    emoji: data.emoji,
    timestamp: data.timestamp,
  };

  localHistory = [...localHistory, newItem];
  if (localHistory.length > 50) {
    localHistory = localHistory.slice(-50);
  }

  return {
    result: {
      sentiment: data.sentiment,
      score: data.score,
      emoji: data.emoji,
    },
    history: localHistory,
  };
};

export const fetchHistory = async (): Promise<HistoryItem[]> => {
  const response = await apiClient.get('/history');
  return response.data.history;
};