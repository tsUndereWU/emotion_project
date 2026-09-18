import React from 'react';
import { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
}

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) {
    return <p>История анализов пуста.</p>;
  }

  const reversedHistory = [...history].reverse().slice(0, 10);

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Последние анализы</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reversedHistory.map((item, index) => {
          const emoji = item.sentiment === 'positive' ? '😊' : '😔';
          const color = item.sentiment === 'positive' ? '#28a745' : '#dc3545';
          return (
            <li
              key={index}
              style={{
                padding: '12px',
                marginBottom: '8px',
                background: '#f8f9fa',
                borderRadius: '6px',
                borderLeft: `4px solid ${color}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                {emoji} {item.text.length > 40 ? item.text.substring(0, 40) + '...' : item.text}
              </span>
              <span style={{ fontWeight: 'bold', color: color }}>
                {item.sentiment} ({Math.round(item.score * 100)}%)
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HistoryList;