export interface AnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  emoji?: string;
}

export interface HistoryItem extends AnalysisResult {
  text: string;
  timestamp: string;
}

export interface AnalyzeResponse {
  result: AnalysisResult;
  history: HistoryItem[];
}