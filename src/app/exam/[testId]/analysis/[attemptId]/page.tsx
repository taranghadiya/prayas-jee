"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_EXAM_QUESTIONS, MOCK_TESTS_LIST } from "@/lib/constants/mock-data";

export default function DetailedAnalysisPage() {
  const params = useParams();
  const testId = params.testId as string;
  const attemptId = params.attemptId as string;
  const test = MOCK_TESTS_LIST.find((t) => t.id === testId) || MOCK_TESTS_LIST[0];

  const [filter, setFilter] = React.useState<"all" | "correct" | "incorrect" | "skipped">("all");
  const [bookmarkedIds, setBookmarkedIds] = React.useState<Record<string, boolean>>({});
  const [questionsList, setQuestionsList] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`jee_attempt_${attemptId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
            setQuestionsList(parsed.questions);
            return;
          }
        } catch (e) {
          console.error("Error parsing stored attempt questions:", e);
        }
      }

      // Fallback for sample att-101
      const fallbackData = SAMPLE_EXAM_QUESTIONS.map((q, idx) => {
        const isCorrect = idx !== 1 && idx !== 5;
        const isSkipped = idx === 5;
        const userOption = isSkipped ? null : isCorrect ? q.correct_option_index ?? 0 : (q.correct_option_index === 0 ? 1 : 0);
        const userNumerical = isSkipped ? "" : isCorrect ? String(q.correct_numerical_value) : "3500";
        const marks = isSkipped ? 0 : isCorrect ? 4 : -1;
        const timeSpent = 60 + (idx * 24);

        return {
          ...q,
          orderNumber: idx + 1,
          isCorrect,
          isSkipped,
          userOption,
          userNumerical,
          marks,
          timeSpent,
        };
      });
      setQuestionsList(fallbackData);
    }
  }, [attemptId]);

  const filteredQuestions = questionsList.filter((q) => {
    if (filter === "correct") return q.isCorrect && !q.isSkipped;
    if (filter === "incorrect") return !q.isCorrect && !q.isSkipped;
    if (filter === "skipped") return q.isSkipped;
    return true;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#080711] text-white p-4 sm:p-8 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/30 pb-5">
          <div className="flex items-center gap-3">
            <Link href={`/exam/${testId}/result/${attemptId}`}>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-[#948FA8] hover:text-white rounded-full">
                <ChevronLeft className="h-3.5 w-3.5" /> Result
              </Button>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif text-white tracking-tight">
                Detailed Solutions &amp; Analysis
              </h1>
              <p className="text-xs text-[#948FA8]">{test.title}</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex rounded-full bg-[#111022] p-1 border border-purple-900/30 text-xs">
            {[
              { id: "all", label: "All Questions" },
              { id: "correct", label: "Correct (+4)" },
              { id: "incorrect", label: "Incorrect (-1)" },
              { id: "skipped", label: "Skipped (0)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  filter === tab.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                    : "text-[#948FA8] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Detailed List */}
        <div className="space-y-6">
          {filteredQuestions.map((q) => {
            const isBookmarked = !!bookmarkedIds[q.id];

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-purple-900/30 bg-[#111022] overflow-hidden shadow-xl"
              >
                {/* Question Header Meta */}
                <div className="p-4 bg-[#0E0D1C] border-b border-purple-900/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-white text-sm">
                      Question {q.orderNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase bg-purple-950/60 border border-purple-500/30 text-purple-300">
                      {q.subject_id}
                    </span>
                    <span className="text-[#948FA8]">
                      {q.question_type === "single_choice" ? "Section A (MCQ)" : "Section B (Numerical)"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Outcome status */}
                    {q.isSkipped ? (
                      <span className="flex items-center gap-1 font-semibold text-slate-400 bg-slate-800/60 px-2.5 py-0.5 rounded-full">
                        <HelpCircle className="h-3.5 w-3.5" /> Skipped (0 M)
                      </span>
                    ) : q.isCorrect ? (
                      <span className="flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Correct (+4 M)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2.5 py-0.5 rounded-full">
                        <XCircle className="h-3.5 w-3.5" /> Incorrect (-1 M)
                      </span>
                    )}

                    <span className="text-[#948FA8] flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-purple-400" /> {q.timeSpent}s
                    </span>

                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className={`p-1.5 rounded-full border text-xs transition-colors ${
                        isBookmarked
                          ? "bg-purple-600/30 border-purple-500 text-purple-300"
                          : "border-purple-900/40 text-[#7B7593] hover:text-white"
                      }`}
                      title="Bookmark Question"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Question Body */}
                <div className="p-6 space-y-5 text-sm">
                  <div className="text-white font-sans leading-relaxed text-sm">
                    {q.question_text}
                  </div>

                  {/* Options with correctness highlights */}
                  {q.question_type === "single_choice" && q.options && (
                    <div className="space-y-2.5 pt-2">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isOfficialCorrect = optIdx === q.correct_option_index;
                        const isStudentChosen = optIdx === q.userOption;

                        let borderClass = "border-purple-900/30 bg-[#16132D]";
                        let badgeBg = "bg-[#231F46] text-[#948FA8]";

                        if (isOfficialCorrect) {
                          borderClass = "border-emerald-500/50 bg-emerald-950/25 text-emerald-100 shadow-sm";
                          badgeBg = "bg-emerald-600 text-white";
                        } else if (isStudentChosen && !q.isCorrect) {
                          borderClass = "border-rose-500/50 bg-rose-950/25 text-rose-100 shadow-sm";
                          badgeBg = "bg-rose-600 text-white";
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`flex items-start gap-3 p-3.5 rounded-2xl border text-xs ${borderClass}`}
                          >
                            <span className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${badgeBg}`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1 pt-0.5">{opt}</span>
                            {isOfficialCorrect && (
                              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                                Correct Answer
                              </span>
                            )}
                            {isStudentChosen && !isOfficialCorrect && (
                              <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                                Your Selection
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Numerical comparison */}
                  {q.question_type === "numerical" && (
                    <div className="p-4 rounded-xl bg-[#17142F] border border-purple-900/30 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#948FA8]">Official Correct Value:</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {q.correct_numerical_value}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#948FA8]">Your Submitted Value:</span>
                        <span className={`font-mono font-bold ${q.isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                          {q.userNumerical || "Unanswered"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Step-by-Step Verified Solution */}
                  <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 text-xs space-y-2 mt-4 shadow-inner">
                    <div className="font-bold text-purple-300 flex items-center gap-2 uppercase tracking-wider text-[11px]">
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                      <span>Verified Step-by-Step Solution:</span>
                    </div>
                    <div className="text-slate-300 leading-relaxed whitespace-pre-line pt-1">
                      {q.solution_text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}