-- ==============================================================================
-- JEE PRACTICE PLATFORM - SUPABASE POSTGRESQL PRODUCTION SCHEMA
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    target_year INTEGER DEFAULT 2025,
    dream_college TEXT DEFAULT 'IIT Bombay',
    preferred_language TEXT DEFAULT 'English',
    avatar_url TEXT,
    tests_attempted INTEGER DEFAULT 0,
    total_questions_solved INTEGER DEFAULT 0,
    average_score NUMERIC(5,2) DEFAULT 0.00,
    best_score NUMERIC(5,2) DEFAULT 0.00,
    overall_accuracy NUMERIC(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SUBJECTS
CREATE TABLE IF NOT EXISTS public.subjects (
    id TEXT PRIMARY KEY, -- 'physics', 'chemistry', 'mathematics'
    name TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    color_accent TEXT,
    total_questions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CHAPTERS
CREATE TABLE IF NOT EXISTS public.chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    class_level INTEGER CHECK (class_level IN (11, 12)),
    weightage_percent NUMERIC(4,2) DEFAULT 3.33,
    total_questions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. QUESTIONS
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('single_choice', 'numerical')),
    question_text TEXT NOT NULL,
    question_image_url TEXT,
    options JSONB, -- Array of strings e.g. ["A", "B", "C", "D"] for single_choice, NULL for numerical
    correct_option_index INTEGER, -- 0, 1, 2, 3 for single_choice
    correct_numerical_value NUMERIC(10,2), -- for numerical
    numerical_tolerance NUMERIC(6,3) DEFAULT 0.000,
    solution_text TEXT NOT NULL,
    solution_image_url TEXT,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    is_pyq BOOLEAN DEFAULT false,
    pyq_year INTEGER,
    pyq_session TEXT, -- e.g. 'Jan 27 Shift 1'
    positive_marks NUMERIC(3,1) DEFAULT 4.0,
    negative_marks NUMERIC(3,1) DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. MOCK TESTS
CREATE TABLE IF NOT EXISTS public.mock_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    test_type TEXT NOT NULL CHECK (test_type IN ('full_mock', 'chapter_test', 'subject_test', 'pyq')),
    subject_id TEXT REFERENCES public.subjects(id) ON DELETE SET NULL, -- NULL for full_mock
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 180,
    total_marks INTEGER NOT NULL DEFAULT 300,
    total_questions INTEGER NOT NULL DEFAULT 75,
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TEST QUESTIONS (Mapping questions to a test with sections)
CREATE TABLE IF NOT EXISTS public.test_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    section_name TEXT NOT NULL, -- 'Physics Sec A', 'Physics Sec B', etc.
    order_index INTEGER NOT NULL,
    is_mandatory BOOLEAN DEFAULT true, -- Section B has 10 questions, any 5 to be answered
    UNIQUE (test_id, question_id)
);

-- 7. TEST ATTEMPTS
CREATE TABLE IF NOT EXISTS public.test_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    test_id UUID NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    submitted_at TIMESTAMP WITH TIME ZONE,
    time_taken_seconds INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    total_score NUMERIC(5,2) DEFAULT 0.00,
    max_score INTEGER DEFAULT 300,
    physics_score NUMERIC(5,2) DEFAULT 0.00,
    chemistry_score NUMERIC(5,2) DEFAULT 0.00,
    math_score NUMERIC(5,2) DEFAULT 0.00,
    accuracy_percentage NUMERIC(5,2) DEFAULT 0.00,
    percentile_estimate NUMERIC(5,2) DEFAULT 0.00,
    total_answered INTEGER DEFAULT 0,
    total_correct INTEGER DEFAULT 0,
    total_incorrect INTEGER DEFAULT 0,
    total_skipped INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. ATTEMPT ANSWERS (Each question response in a test attempt)
CREATE TABLE IF NOT EXISTS public.attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES public.test_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'not_visited' CHECK (
        status IN ('not_visited', 'not_answered', 'answered', 'marked_for_review', 'answered_and_marked')
    ),
    selected_option INTEGER, -- index 0..3
    numerical_answer NUMERIC(10,2),
    is_correct BOOLEAN,
    time_spent_seconds INTEGER DEFAULT 0,
    marks_awarded NUMERIC(4,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (attempt_id, question_id)
);

-- 9. BOOKMARKS
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    note TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, question_id)
);

-- 10. WEAK TOPICS / STUDENT PERFORMANCE TRACKER
CREATE TABLE IF NOT EXISTS public.student_chapter_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    total_attempted INTEGER DEFAULT 0,
    total_correct INTEGER DEFAULT 0,
    accuracy_percentage NUMERIC(5,2) DEFAULT 0.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, chapter_id)
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_questions_subject ON public.questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_chapter ON public.questions(chapter_id);
CREATE INDEX IF NOT EXISTS idx_questions_pyq ON public.questions(is_pyq, pyq_year);
CREATE INDEX IF NOT EXISTS idx_test_questions_test ON public.test_questions(test_id, order_index);
CREATE INDEX IF NOT EXISTS idx_test_attempts_user ON public.test_attempts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_attempt_answers_attempt ON public.attempt_answers(attempt_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_chapter_stats ENABLE ROW LEVEL SECURITY;

-- Read public access for subjects, chapters, questions, mock_tests
CREATE POLICY "Public subjects are viewable by all" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Public chapters are viewable by all" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Public questions are viewable by authenticated users" ON public.questions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public mock tests are viewable by all" ON public.mock_tests FOR SELECT USING (is_published = true);
CREATE POLICY "Test questions viewable by authenticated users" ON public.test_questions FOR SELECT TO authenticated USING (true);

-- User-specific policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own test attempts" ON public.test_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own test attempts" ON public.test_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own test attempts" ON public.test_attempts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own attempt answers" ON public.attempt_answers FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.test_attempts WHERE test_attempts.id = attempt_answers.attempt_id AND test_attempts.user_id = auth.uid()));

CREATE POLICY "Users can modify own attempt answers" ON public.attempt_answers FOR ALL 
USING (EXISTS (SELECT 1 FROM public.test_attempts WHERE test_attempts.id = attempt_answers.attempt_id AND test_attempts.user_id = auth.uid()));

CREATE POLICY "Users can manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own chapter stats" ON public.student_chapter_stats FOR ALL USING (auth.uid() = user_id);
