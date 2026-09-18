import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { HistoryItem } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface EmotionChartProps {
  history: HistoryItem[];
}

const EmotionChart: React.FC<EmotionChartProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', background: '#f9f9f9', borderRadius: '8px' }}>
        <p>Напишите что-нибудь, чтобы увидеть график эмоций!</p>
      </div>
    );
  }

  const labels = history.map((item) => {
    const date = new Date(item.timestamp);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  });

  const scores = history.map((item) => item.score);
  const colors = history.map((item) => 
    item.sentiment === 'positive' ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Уровень эмоций (0 - негатив, 1 - позитив)',
        data: scores,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.2,
        pointBackgroundColor: colors,
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ваш эмоциональный график за сессию',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.1,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default EmotionChart;