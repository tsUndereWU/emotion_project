import axios from 'axios';
import { AnalyzeResponse, HistoryItem } from '../types';

// ПОКА НЕТ БЭКЕНДА - используем умную заглушку
const IS_MOCK = true; 

const API_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---------- РЕАЛИСТИЧНАЯ ЗАГЛУШКА (имитирует работу AI) ----------
// Словарь эмоций для разных слов
const emotionDictionary: Record<string, string> = {
  'счастлив': 'positive',
  'рад': 'positive',
  'отлично': 'positive',
  'прекрасно': 'positive',
  'люблю': 'positive',
  'хорошо': 'positive',
  'замечательно': 'positive',
  'класс': 'positive',
  'супер': 'positive',
  'круто': 'positive',
  'ура': 'positive',
  'груст': 'negative',
  'печал': 'negative',
  'плохо': 'negative',
  'устал': 'negative',
  'разочарован': 'negative',
  'зол': 'negative',
  'нерв': 'negative',
  'тревож': 'negative',
  'страх': 'negative',
  'тоск': 'negative',
  'нормально': 'neutral',
  'так себе': 'neutral',
  'неплохо': 'neutral',
  'средне': 'neutral',
};

const getEmoji = (sentiment: string): string => {
  const map: Record<string, string> = {
    'positive': '😊',
    'negative': '😔',
    'neutral': '😐'
  };
  return map[sentiment] || '😐';
};

// Имитация анализа текста (как будто нейросеть)
const mockAnalyze = (text: string): { sentiment: 'positive' | 'negative' | 'neutral', score: number } => {
  const lowerText = text.toLowerCase();
  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
  let score = 0.5;

  // Проверяем все слова из словаря
  for (const [word, emotion] of Object.entries(emotionDictionary)) {
    if (lowerText.includes(word)) {
      sentiment = emotion as 'positive' | 'negative' | 'neutral';
      break;
    }
  }

  // Генерируем реалистичный score
  if (sentiment === 'positive') {
    score = 0.65 + Math.random() * 0.34; // 0.65 - 0.99
  } else if (sentiment === 'negative') {
    score = 0.1 + Math.random() * 0.35; // 0.1 - 0.45
  } else {
    score = 0.4 + Math.random() * 0.2; // 0.4 - 0.6
  }

  return { sentiment, score: Math.round(score * 100) / 100 };
};

// Хранилище истории (как будто база данных)
let mockHistory: HistoryItem[] = [
  { 
    text: 'Сегодня отличная погода, я счастлив!', 
    sentiment: 'positive', 
    score: 0.92, 
    timestamp: new Date(Date.now() - 3600000).toISOString() 
  },
  { 
    text: 'Немного устал после работы', 
    sentiment: 'negative', 
    score: 0.28, 
    timestamp: new Date(Date.now() - 7200000).toISOString() 
  },
  { 
    text: 'Обычный день, ничего особенного', 
    sentiment: 'neutral', 
    score: 0.51, 
    timestamp: new Date(Date.now() - 10800000).toISOString() 
  },
];

export const analyzeText = async (text: string): Promise<AnalyzeResponse> => {
  if (IS_MOCK) {
    // Имитация задержки сети (как будто AI думает)
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));

    const result = mockAnalyze(text);
    const newItem: HistoryItem = {
      text: text,
      sentiment: result.sentiment,
      score: result.score,
      timestamp: new Date().toISOString(),
    };
    
    mockHistory.push(newItem);
    // Храним только последние 50 записей
    if (mockHistory.length > 50) {
      mockHistory = mockHistory.slice(-50);
    }

    return {
      result: result,
      history: mockHistory,
    };
  }

  // Реальный запрос к бэкенду (когда появится)
  const response = await apiClient.post('/analyze', { text });
  return response.data;
};

export const fetchHistory = async (): Promise<HistoryItem[]> => {
  if (IS_MOCK) {
    return mockHistory;
  }
  const response = await apiClient.get('/history');
  return response.data.history;
};