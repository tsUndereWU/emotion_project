import React, { useState } from 'react';

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 3) {
      alert('Пожалуйста, введите хотя бы 3 символа');
      return;
    }
    onAnalyze(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Опишите свои эмоции или мысли здесь... (например: 'Я сегодня испытываю ... эмоции')
Пишите развернуто и подробно для качественного анализа!"
        rows={4}
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          resize: 'vertical',
        }}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          marginTop: '10px',
          padding: '10px 30px',
          backgroundColor: isLoading ? '#aaa' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: isLoading ? 'default' : 'pointer',
        }}
      >
        {isLoading ? 'Анализирую...' : 'Анализировать эмоцию'}
      </button>
    </form>
  );
};

export default TextInput;