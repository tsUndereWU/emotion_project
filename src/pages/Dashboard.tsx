import React, { useState, useEffect } from 'react';
import { analyzeText, fetchHistory } from '../services/api';
import { HistoryItem } from '../types';
import TextInput from '../components/TextInput';
import EmotionChart from '../components/EmotionChart';
import HistoryList from '../components/HistoryList';

const Dashboard: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await fetchHistory();
      setHistory(data);
    };
    loadHistory();
  }, []);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    try {
      const response = await analyzeText(text);
      setHistory(response.history);
    } catch (error) {
      console.error('Ошибка анализа:', error);
      alert('Произошла ошибка при анализе. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Эмоциональный цифровой двойник</h1>
        <p style={{ color: '#666' }}>
          Введите текст, и ИИ определит ваше настроение
        </p>
      </header>

      <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} />

      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <EmotionChart history={history} />
      </div>

      <HistoryList history={history} />
    </div>
  );
};

export default Dashboard;