import { Question, QuestionAttemptStatus, SubjectId } from "./database";

export type { QuestionAttemptStatus, SubjectId };

export interface ExamSection {
  id: SubjectId;
  name: string;
  totalQuestions: number;
  startIndex: number;
  endIndex: number;
}

export interface ExamQuestionState {
  question: Question;
  orderNumber: number;
  subjectId: SubjectId;
  sectionName: string; // e.g. "Section A (MCQ)" or "Section B (Numerical)"
  status: QuestionAttemptStatus;
  selectedOption: number | null;
  numericalAnswer: string;
  timeSpentSeconds: number;
  isBookmarked: boolean;
}

export interface ExamSummary {
  answered: number;
  notAnswered: number;
  notVisited: number;
  markedForReview: number;
  answeredAndMarkedForReview: number;
}

export interface ExamState {
  testId: string;
  attemptId: string;
  title: string;
  totalDurationSeconds: number;
  timeRemainingSeconds: number;
  currentQuestionIndex: number;
  currentSection: SubjectId;
  questions: ExamQuestionState[];
  isSubmitting: boolean;
  isTimeUp: boolean;
}

export const NTA_PALETTE_CONFIG: Record<
  QuestionAttemptStatus,
  { label: string; bgClass: string; textClass: string; badgeNumberBg: string }
> = {
  answered: {
    label: "Answered",
    bgClass: "bg-emerald-600 text-white border-emerald-500",
    textClass: "text-emerald-400",
    badgeNumberBg: "bg-emerald-600",
  },
  not_answered: {
    label: "Not Answered",
    bgClass: "bg-rose-600 text-white border-rose-500",
    textClass: "text-rose-400",
    badgeNumberBg: "bg-rose-600",
  },
  not_visited: {
    label: "Not Visited",
    bgClass: "bg-slate-700 text-slate-200 border-slate-600",
    textClass: "text-slate-400",
    badgeNumberBg: "bg-slate-700",
  },
  marked_for_review: {
    label: "Marked for Review",
    bgClass: "bg-purple-600 text-white border-purple-500",
    textClass: "text-purple-400",
    badgeNumberBg: "bg-purple-600",
  },
  answered_and_marked: {
    label: "Answered & Marked for Review (Evaluated)",
    bgClass: "bg-purple-600 text-white border-purple-500 relative after:content-[''] after:absolute after:bottom-0.5 after:right-0.5 after:w-2 after:h-2 after:bg-emerald-400 after:rounded-full",
    textClass: "text-purple-300",
    badgeNumberBg: "bg-purple-600",
  },
};
