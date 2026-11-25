-- ==============================================================================
-- JEE PRACTICE - INITIAL SEED DATA
-- ==============================================================================

-- 1. Insert Core Subjects
INSERT INTO public.subjects (id, name, description, icon_name, color_accent, total_questions) VALUES
('physics', 'Physics', 'Mechanics, Electrodynamics, Modern Physics, Optics & Thermodynamics', 'Atom', '#3B82F6', 1500),
('chemistry', 'Chemistry', 'Physical Chemistry, Organic Mechanisms, Inorganic Coordination & Periodic Trends', 'FlaskConical', '#10B981', 1600),
('mathematics', 'Mathematics', 'Calculus, Algebra, Coordinate Geometry, Vectors & 3D Geometry', 'Compass', '#F59E0B', 1700)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Core Chapters
INSERT INTO public.chapters (id, subject_id, name, class_level, weightage_percent, total_questions) VALUES
('c1000000-0000-0000-0000-000000000001', 'physics', 'Rotational Motion & System of Particles', 11, 4.50, 120),
('c1000000-0000-0000-0000-000000000002', 'physics', 'Thermodynamics & Kinetic Theory', 11, 4.00, 110),
('c1000000-0000-0000-0000-000000000003', 'physics', 'Electrostatics & Capacitance', 12, 5.00, 140),
('c1000000-0000-0000-0000-000000000004', 'physics', 'Current Electricity & Magnetism', 12, 5.50, 150),
('c1000000-0000-0000-0000-000000000005', 'physics', 'Ray & Wave Optics', 12, 4.50, 130),
('c1000000-0000-0000-0000-000000000006', 'physics', 'Modern Physics & Dual Nature', 12, 6.00, 160),

('c2000000-0000-0000-0000-000000000001', 'chemistry', 'Chemical Bonding & Molecular Structure', 11, 5.00, 140),
('c2000000-0000-0000-0000-000000000002', 'chemistry', 'Chemical Thermodynamics & Energetics', 11, 4.00, 115),
('c2000000-0000-0000-0000-000000000003', 'chemistry', 'Equilibrium (Ionic & Chemical)', 11, 4.50, 130),
('c2000000-0000-0000-0000-000000000004', 'chemistry', 'Coordination Compounds', 12, 5.50, 145),
('c2000000-0000-0000-0000-000000000005', 'chemistry', 'Aldehydes, Ketones & Carboxylic Acids', 12, 5.00, 150),
('c2000000-0000-0000-0000-000000000006', 'chemistry', 'Electrochemistry & Solutions', 12, 4.50, 125),

('c3000000-0000-0000-0000-000000000001', 'mathematics', 'Definite Integrals & Applications', 12, 6.00, 170),
('c3000000-0000-0000-0000-000000000002', 'mathematics', 'Differential Calculus (Limits, Continuity, AOD)', 12, 6.50, 180),
('c3000000-0000-0000-0000-000000000003', 'mathematics', 'Matrices & Determinants', 12, 4.50, 130),
('c3000000-0000-0000-0000-000000000004', 'mathematics', 'Vectors & 3D Geometry', 12, 6.00, 160),
('c3000000-0000-0000-0000-000000000005', 'mathematics', 'Coordinate Geometry (Conic Sections)', 11, 5.50, 155),
('c3000000-0000-0000-0000-000000000006', 'mathematics', 'Probability & Statistics', 12, 4.00, 110)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Sample Mock Tests
INSERT INTO public.mock_tests (id, title, slug, description, test_type, duration_minutes, total_marks, total_questions, difficulty) VALUES
('m1000000-0000-0000-0000-000000000001', 'JEE Main Full Mock Test 01 (NTA Exact Pattern)', 'jee-main-full-mock-01', 'Comprehensive 3-hour examination covering the complete Class 11 and 12 syllabus with +4 / -1 marking scheme.', 'full_mock', 180, 300, 75, 'medium'),
('m1000000-0000-0000-0000-000000000002', 'JEE Main Full Mock Test 02 (High Yield)', 'jee-main-full-mock-02', 'Curated high-weightage topics focusing on Calculus, Electrodynamics and Organic Chemistry mechanisms.', 'full_mock', 180, 300, 75, 'hard'),
('m1000000-0000-0000-0000-000000000003', 'JEE Main 2024 Session 1 (Jan 27 Shift 1 Official PYQ)', 'jee-main-2024-jan-27-shift-1', 'Official JEE Main 2024 January Session 1 shift 1 question paper with detailed step-by-step solutions.', 'pyq', 180, 300, 75, 'medium'),
('m1000000-0000-0000-0000-000000000004', 'Physics: Electrodynamics Drill Test', 'physics-electrodynamics-drill', 'Specialized 25 question timed test focusing on Gauss Law, Capacitance, and Ampere Circuital Law.', 'subject_test', 60, 100, 25, 'medium')
ON CONFLICT (id) DO NOTHING;
