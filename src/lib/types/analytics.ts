export interface SubjectPerformanceMetric {
  subject: string;
  accuracy: number;
  score: number;
  maxScore: number;
  attempted: number;
  total: number;
  color: string;
}

export interface WeakChapterMetric {
  chapterId: string;
  chapterName: string;
  subject: string;
  accuracy: number;
  incorrectCount: number;
  recommendedAction: string;
}

export interface TestScoreTrend {
  testName: string;
  date: string;
  score: number;
  percentile: number;
  physics: number;
  chemistry: number;
  math: number;
}

export interface StudentDashboardSummary {
  totalTestsAttempted: number;
  averageScore: number;
  bestScore: number;
  overallAccuracy: number;
  totalQuestionsSolved: number;
  percentileEstimate: number;
  rankEstimate: number;
}
