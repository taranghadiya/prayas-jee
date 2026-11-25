"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ExamHeader } from "@/components/exam/exam-header";
import { ExamLegend } from "@/components/exam/legend";
import { QuestionPalette } from "@/components/exam/question-palette";
import { QuestionViewer } from "@/components/exam/question-viewer";
import { SubmitConfirmModal } from "@/components/exam/submit-confirm-modal";
import {
  ExamQuestionState,
  ExamSummary,
  QuestionAttemptStatus,
} from "@/lib/types/exam";
import { SubjectId } from "@/lib/types/database";
import { SAMPLE_EXAM_QUESTIONS, MOCK_TESTS_LIST } from "@/lib/constants/mock-data";
import { createClient } from "@/lib/supabase/client";

export default function LiveExamPage() {
  const params = useParams();
  const router = useRouter();
  const testId = (params.testId as string) || "jee-mock-01";
  const test = MOCK_TESTS_LIST.find((t) => t.id === testId) || MOCK_TESTS_LIST[0];

  // Total test time: default 180 mins = 10800 secs
  const [timeRemaining, setTimeRemaining] = React.useState<number>(test.duration_minutes * 60);
  const [activeSubject, setActiveSubject] = React.useState<SubjectId>("physics");
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  // Initialize questions states from SAMPLE_EXAM_QUESTIONS (simulating full question set)
  const [examQuestions, setExamQuestions] = React.useState<ExamQuestionState[]>(() => {
    // Generate questions partitioned across Physics (25), Chemistry (25), Math (25)
    const subjects: SubjectId[] = ["physics", "chemistry", "mathematics"];
    const allQuestions: ExamQuestionState[] = [];

    let overallOrder = 1;
    subjects.forEach((sub) => {
      // 25 questions per subject (20 Section A MCQ, 5 Section B Numerical)
      for (let i = 1; i <= 25; i++) {
        const isMcq = i <= 20;
        const sampleBase = SAMPLE_EXAM_QUESTIONS.find(
          (q) => q.subject_id === sub && (isMcq ? q.question_type === "single_choice" : q.question_type === "numerical")
        ) || SAMPLE_EXAM_QUESTIONS[0];

        allQuestions.push({
          question: {
            ...sampleBase,
            id: `q-${sub}-${i}`,
            question_text: `[${sub.toUpperCase()} Q${i}] ${sampleBase.question_text}`,
          },
          orderNumber: overallOrder++,
          subjectId: sub,
          sectionName: isMcq ? "Section A (Single Choice)" : "Section B (Numerical)",
          status: overallOrder === 2 ? "not_answered" : "not_visited", // Q1 visited first
          selectedOption: null,
          numericalAnswer: "",
          timeSpentSeconds: 0,
          isBookmarked: false,
        });
      }
    });

    return allQuestions;
  });

  // Countdown timer effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit(); // Auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter questions for currently selected subject
  const subjectQuestions = examQuestions.filter((q) => q.subjectId === activeSubject);
  const activeQuestionGlobalIndex = examQuestions.findIndex(
    (q, idx) => q.subjectId === activeSubject && subjectQuestions[currentQuestionIndex]?.question.id === q.question.id
  );

  const currentQ = examQuestions[activeQuestionGlobalIndex] || examQuestions[0];

  // Helper to calculate overall summary counts
  const summary: ExamSummary = React.useMemo(() => {
    return {
      answered: examQuestions.filter((q) => q.status === "answered").length,
      notAnswered: examQuestions.filter((q) => q.status === "not_answered").length,
      notVisited: examQuestions.filter((q) => q.status === "not_visited").length,
      markedForReview: examQuestions.filter((q) => q.status === "marked_for_review").length,
      answeredAndMarkedForReview: examQuestions.filter((q) => q.status === "answered_and_marked").length,
    };
  }, [examQuestions]);

  // Handlers for student responses
  const handleOptionSelect = (optionIndex: number) => {
    setExamQuestions((prev) =>
      prev.map((q, idx) =>
        idx === activeQuestionGlobalIndex
          ? { ...q, selectedOption: optionIndex }
          : q
      )
    );
  };

  const handleNumericalChange = (val: string) => {
    setExamQuestions((prev) =>
      prev.map((q, idx) =>
        idx === activeQuestionGlobalIndex
          ? { ...q, numericalAnswer: val }
          : q
      )
    );
  };

  const handleClearResponse = () => {
    setExamQuestions((prev) =>
      prev.map((q, idx) =>
        idx === activeQuestionGlobalIndex
          ? { ...q, selectedOption: null, numericalAnswer: "", status: "not_answered" }
          : q
      )
    );
  };

  const handleToggleBookmark = () => {
    setExamQuestions((prev) =>
      prev.map((q, idx) =>
        idx === activeQuestionGlobalIndex
          ? { ...q, isBookmarked: !q.isBookmarked }
          : q
      )
    );
  };

  const advanceToNextQuestion = () => {
    if (currentQuestionIndex < subjectQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // If at end of subject, wrap to next subject
      if (activeSubject === "physics") {
        setActiveSubject("chemistry");
        setCurrentQuestionIndex(0);
      } else if (activeSubject === "chemistry") {
        setActiveSubject("mathematics");
        setCurrentQuestionIndex(0);
      }
    }
  };

  const handleSaveAndNext = () => {
    const hasAnswer =
      currentQ.selectedOption !== null ||
      (currentQ.numericalAnswer && currentQ.numericalAnswer.trim() !== "");

    const newStatus: QuestionAttemptStatus = hasAnswer ? "answered" : "not_answered";

    setExamQuestions((prev) =>
      prev.map((q, idx) =>
        idx === activeQuestionGlobalIndex ? { ...q, status: newStatus } : q
      )
    );

    advanceToNextQuestion();
  };

  const handleMarkForReviewAndNext = () => {
    setExamQuestions((prev) =>
      prev.map((q, idx) =>
        idx === activeQuestionGlobalIndex
          ? { ...q, status: "marked_for_review" }
          : q
      )
    );
    advanceToNextQuestion();
  };

  const handleSaveAndMarkForReview = () => {
    const hasAnswer =
      currentQ.selectedOption !== null ||
      (currentQ.numericalAnswer && currentQ.numericalAnswer.trim() !== "");

    const newStatus: QuestionAttemptStatus = hasAnswer
      ? "answered_and_marked"
      : "marked_for_review";

    setExamQuestions((prev) =>
      prev.map((q, idx) =>
        idx === activeQuestionGlobalIndex ? { ...q, status: newStatus } : q
      )
    );
    advanceToNextQuestion();
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    const attemptId = "att-" + Date.now();
    const timeTaken = test.duration_minutes * 60 - timeRemaining;

    // Evaluate answers dynamically
    let physicsScore = 0;
    let chemistryScore = 0;
    let mathScore = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalAnswered = 0;
    let totalSkipped = 0;

    const evaluatedQuestions = examQuestions.map((eq, idx) => {
      const isAnswered =
        eq.status === "answered" || eq.status === "answered_and_marked";
      let isCorrect = false;
      let marksAwarded = 0;

      if (isAnswered) {
        totalAnswered++;
        if (eq.question.question_type === "single_choice") {
          if (eq.selectedOption === eq.question.correct_option_index) {
            isCorrect = true;
            marksAwarded = 4;
            totalCorrect++;
          } else {
            isCorrect = false;
            marksAwarded = -1;
            totalIncorrect++;
          }
        } else {
          // Numerical
          const userVal = parseFloat(eq.numericalAnswer);
          const correctVal = eq.question.correct_numerical_value;
          if (
            !isNaN(userVal) &&
            correctVal !== undefined &&
            Math.abs(userVal - correctVal) <= (eq.question.numerical_tolerance || 0.01)
          ) {
            isCorrect = true;
            marksAwarded = 4;
            totalCorrect++;
          } else {
            isCorrect = false;
            marksAwarded = -1;
            totalIncorrect++;
          }
        }
      } else {
        totalSkipped++;
      }

      if (eq.subjectId === "physics") physicsScore += marksAwarded;
      if (eq.subjectId === "chemistry") chemistryScore += marksAwarded;
      if (eq.subjectId === "mathematics") mathScore += marksAwarded;

      return {
        ...eq.question,
        orderNumber: idx + 1,
        userOption: eq.selectedOption,
        userNumerical: eq.numericalAnswer,
        isCorrect,
        isSkipped: !isAnswered,
        marks: marksAwarded,
        timeSpent: eq.timeSpentSeconds || 45,
      };
    });

    const totalScore = physicsScore + chemistryScore + mathScore;
    const accuracy =
      totalAnswered > 0
        ? Number(((totalCorrect / totalAnswered) * 100).toFixed(1))
        : 0;

    // Projected rank calculation
    let estimatedRank = "45,000+";
    if (totalScore >= 260) estimatedRank = "500 - 1,200";
    else if (totalScore >= 220) estimatedRank = "1,500 - 3,500";
    else if (totalScore >= 180) estimatedRank = "4,000 - 9,500";
    else if (totalScore >= 140) estimatedRank = "12,000 - 24,000";
    else if (totalScore >= 100) estimatedRank = "30,000 - 55,000";

    const percentileEstimate =
      totalScore >= 250
        ? 99.85
        : totalScore >= 200
        ? 98.6
        : totalScore >= 150
        ? 95.2
        : totalScore >= 100
        ? 88.4
        : totalScore > 0
        ? Math.max(10, Number((totalScore * 0.85).toFixed(1)))
        : 0.0;

    const newAttempt = {
      id: attemptId,
      testId,
      title: test.title,
      date: new Date().toISOString().split("T")[0],
      score: totalScore,
      maxScore: test.total_marks || 300,
      physicsScore,
      chemistryScore,
      mathScore,
      accuracy,
      percentile: percentileEstimate,
      timeTaken: timeTaken > 0 ? timeTaken : 60,
      totalAnswered,
      totalCorrect,
      totalIncorrect,
      totalSkipped,
      estimatedRank,
      status: "completed",
    };

    if (typeof window !== "undefined") {
      try {
        const activeUser = localStorage.getItem("jee_active_user") || "default_aspirant";

        // 1. Save to account-specific test attempts history
        const userKey = `jee_attempts_${activeUser}`;
        const existingUserAttempts = localStorage.getItem(userKey);
        const userList = existingUserAttempts ? JSON.parse(existingUserAttempts) : [];
        userList.unshift(newAttempt);
        localStorage.setItem(userKey, JSON.stringify(userList));

        // 2. Also keep active session cache
        localStorage.setItem("jee_test_attempts", JSON.stringify(userList));

        // 3. Save individual attempt details for results & analysis
        localStorage.setItem(
          `jee_attempt_${attemptId}`,
          JSON.stringify({
            attempt: newAttempt,
            questions: evaluatedQuestions,
          })
        );
      } catch (e) {
        console.error("Failed to save attempt to localStorage:", e);
      }
    }

    // 4. Background cloud sync to Supabase if connected
    (async () => {
      try {
        const supabase = createClient();
        const res: any = await supabase.auth.getUser();
        const user = res?.data?.user;
        if (user) {
          await supabase.from("test_attempts").insert({
            user_id: user.id,
            test_id: "m1000000-0000-0000-0000-000000000001",
            time_taken_seconds: timeTaken > 0 ? timeTaken : 60,
            status: "completed",
            total_score: totalScore,
            max_score: 300,
            physics_score: physicsScore,
            chemistry_score: chemistryScore,
            math_score: mathScore,
            accuracy_percentage: accuracy,
            percentile_estimate: percentileEstimate,
            total_answered: totalAnswered,
            total_correct: totalCorrect,
            total_incorrect: totalIncorrect,
            total_skipped: totalSkipped,
          });
        }
      } catch (err) {
        // Cloud sync caught safely
      }
    })();

    setTimeout(() => {
      router.push(`/exam/${testId}/result/${attemptId}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col justify-between select-none">
      {/* Official Exam Header */}
      <ExamHeader
        testTitle={test.title}
        timeRemainingSeconds={timeRemaining}
        currentNumber={currentQ ? currentQ.orderNumber : 1}
        totalQuestions={examQuestions.length || 90}
        isMarkedForReview={currentQ?.status === "marked_for_review" || currentQ?.status === "answered_and_marked"}
        onToggleMarkForReview={handleMarkForReviewAndNext}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Examination Work Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-2 sm:p-4 gap-3 sm:gap-4">
        {/* Left Column: Subject Tabs + Question Canvas */}
        <div className="flex-1 flex flex-col space-y-3">
          {/* Subject Switcher Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {(["physics", "chemistry", "mathematics"] as SubjectId[]).map((sub) => {
              const isActive = activeSubject === sub;
              const count = examQuestions.filter((q) => q.subjectId === sub && (q.status === "answered" || q.status === "answered_and_marked")).length;

              return (
                <button
                  key={sub}
                  onClick={() => {
                    setActiveSubject(sub);
                    setCurrentQuestionIndex(0);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs capitalize transition-all duration-150 flex items-center gap-2 border ${
                    isActive
                      ? "bg-brand-600 text-white border-brand-500 shadow-md"
                      : "bg-[#0B0F19] text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  <span>{sub}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-slate-200">
                    {count}/25
                  </span>
                </button>
              );
            })}
          </div>

          {/* Core Question Viewer */}
          <div className="flex-1">
            <QuestionViewer
              questionState={currentQ}
              onOptionSelect={handleOptionSelect}
              onNumericalChange={handleNumericalChange}
              onClearResponse={handleClearResponse}
              onSaveAndNext={handleSaveAndNext}
              onSaveAndMarkForReview={handleSaveAndMarkForReview}
              onMarkForReviewAndNext={handleMarkForReviewAndNext}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        </div>

        {/* Right Column: NTA Question Palette & Live Status Counter */}
        <div className="w-full lg:w-80 rounded-xl border border-slate-800 bg-[#0B0F19] flex flex-col justify-between shrink-0 shadow-lg">
          <div>
            {/* Status Legend */}
            <ExamLegend summary={summary} />

            {/* Active Subject Palette Grid */}
            <QuestionPalette
              questions={subjectQuestions}
              currentQuestionIndex={currentQuestionIndex}
              onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
            />
          </div>

          {/* Quick Submit Trigger */}
          <div className="p-3 border-t border-slate-800 bg-[#080C14]">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 font-bold text-xs text-white shadow-sm transition-colors"
            >
              Submit Entire Examination
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <SubmitConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleFinalSubmit}
        questions={examQuestions}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
