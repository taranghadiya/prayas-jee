# JEE Practice - Professional JEE Main Examination & Preparation Platform

A responsive, high-performance web platform built specifically for JEE Main aspirants, featuring an authentic National Testing Agency (NTA) computer-based test (CBT) examination simulator, full-length mock tests, chapter-wise practice, shift-wise PYQ papers, and surgical diagnostic performance analytics.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: TypeScript (Strict typing throughout)
- **Styling**: Tailwind CSS with custom deep navy/charcoal dark design system
- **UI Architecture**: Modular shadcn-inspired primitives
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) & Supabase SSR
- **Icons**: Lucide React
- **Visualization**: Recharts & High-Precision SVG metrics

---

## 📁 Project Architecture

```
jee-practice/
├── supabase/
│   ├── schema.sql             # Production PostgreSQL schema, RLS policies & indexes
│   └── seed.sql               # Seed data for subjects, chapters, questions & mock tests
├── src/
│   ├── app/
│   │   ├── (auth)/            # Authentication route group
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/       # Dashboard & practice route group
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── mock-tests/page.tsx
│   │   │   ├── chapter-practice/page.tsx
│   │   │   ├── subject-practice/page.tsx
│   │   │   ├── pyq/page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   ├── bookmarks/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── exam/              # Live examination interface & results
│   │   │   └── [testId]/
│   │   │       ├── instructions/page.tsx
│   │   │       ├── live/page.tsx
│   │   │       ├── result/[attemptId]/page.tsx
│   │   │       └── analysis/[attemptId]/page.tsx
│   │   ├── globals.css        # Obsidian dark theme & formula styling
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Premium landing page
│   ├── components/
│   │   ├── ui/                # Reusable UI primitives (Button, Card, Badge, Modal, etc.)
│   │   ├── navigation/        # Navbar, Sidebar, Footer
│   │   ├── exam/              # ExamHeader, QuestionPalette, QuestionViewer, Legend, SubmitModal
│   │   └── dashboard/         # StatCard, RecentTestsTable, WeakChaptersList, SubjectProgress
│   └── lib/
│       ├── types/             # database.ts, exam.ts, analytics.ts
│       ├── supabase/          # client.ts, server.ts
│       ├── constants/         # syllabus.ts, mock-data.ts
│       └── utils.ts           # Scoring calculators, time formatting, cn helper
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## ⚡ Quick Setup Instructions

### 1. Set as Active Workspace
To work conveniently inside this project directory, set your workspace to:
`/data/user/0/ai.antigem/files/home/.gemini/antigravity-cli/scratch/jee-practice`

### 2. Install Dependencies
Run with `pnpm` (fast, efficient):
```bash
pnpm install
```

### 3. Supabase Setup
1. Create a project on [Supabase](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard and run the contents of [supabase/schema.sql](file:///data/user/0/ai.antigem/files/home/.gemini/antigravity-cli/scratch/jee-practice/supabase/schema.sql).
3. (Optional) Run the seed file [supabase/seed.sql](file:///data/user/0/ai.antigem/files/home/.gemini/antigravity-cli/scratch/jee-practice/supabase/seed.sql) to populate initial questions and chapters.
4. Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### 4. Start Development Server
```bash
pnpm dev
```
Navigate to `http://localhost:3000` in your browser.
