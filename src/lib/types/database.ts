export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SubjectId = "physics" | "chemistry" | "mathematics";

export type QuestionType = "single_choice" | "numerical";
export type QuestionDifficulty = "easy" | "medium" | "hard";
export type TestType = "full_mock" | "chapter_test" | "subject_test" | "pyq";
export type TestAttemptStatus = "in_progress" | "completed" | "abandoned";
export type QuestionAttemptStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked_for_review"
  | "answered_and_marked";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  target_year: number;
  dream_college: string;
  preferred_language: string;
  avatar_url?: string;
  tests_attempted: number;
  total_questions_solved: number;
  average_score: number;
  best_score: number;
  overall_accuracy: number;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: SubjectId;
  name: string;
  description: string;
  icon_name: string;
  color_accent: string;
  total_questions: number;
}

export interface Chapter {
  id: string;
  subject_id: SubjectId;
  name: string;
  class_level: 11 | 12;
  weightage_percent: number;
  total_questions: number;
}

export interface Question {
  id: string;
  subject_id: SubjectId;
  chapter_id?: string;
  question_type: QuestionType;
  question_text: string;
  question_image_url?: string;
  options?: string[]; // 4 options for single_choice
  correct_option_index?: number; // 0, 1, 2, 3
  correct_numerical_value?: number;
  numerical_tolerance?: number;
  solution_text: string;
  solution_image_url?: string;
  difficulty: QuestionDifficulty;
  is_pyq: boolean;
  pyq_year?: number;
  pyq_session?: string;
  positive_marks: number;
  negative_marks: number;
}

export interface MockTest {
  id: string;
  title: string;
  slug: string;
  description: string;
  test_type: TestType;
  subject_id?: SubjectId;
  chapter_id?: string;
  duration_minutes: number;
  total_marks: number;
  total_questions: number;
  difficulty: QuestionDifficulty;
  is_published: boolean;
}

export interface TestAttempt {
  id: string;
  user_id: string;
  test_id: string;
  started_at: string;
  submitted_at?: string;
  time_taken_seconds: number;
  status: TestAttemptStatus;
  total_score: number;
  max_score: number;
  physics_score: number;
  chemistry_score: number;
  math_score: number;
  accuracy_percentage: number;
  percentile_estimate: number;
  total_answered: number;
  total_correct: number;
  total_incorrect: number;
  total_skipped: number;
}

export interface AttemptAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  status: QuestionAttemptStatus;
  selected_option?: number | null;
  numerical_answer?: number | null;
  is_correct?: boolean | null;
  time_spent_seconds: number;
  marks_awarded: number;
}

export interface Bookmark {
  id: string;
  user_id: string;
  question_id: string;
  note?: string;
  tags?: string[];
  created_at: string;
}
