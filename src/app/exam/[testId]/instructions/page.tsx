"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FileText,
  Clock,
  Award,
  AlertTriangle,
  CheckSquare,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_TESTS_LIST } from "@/lib/constants/mock-data";

export default function TestInstructionsPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;
  const test = MOCK_TESTS_LIST.find((t) => t.id === testId) || MOCK_TESTS_LIST[0];

  const [testInfo, setTestInfo] = React.useState({
    id: testId,
    title: test.title,
    duration: test.duration_minutes || 180,
    totalQuestions: test.total_questions || 75,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const customStr = localStorage.getItem(`jee_custom_test_${testId}`);
      if (customStr) {
        try {
          const parsed = JSON.parse(customStr);
          setTestInfo({
            id: testId,
            title: parsed.title || test.title,
            duration: parsed.durationMinutes || 60,
            totalQuestions: parsed.totalQuestions || parsed.questions?.length || 10,
          });
        } catch {}
      }
    }
  }, [testId, test]);

  const [acknowledged, setAcknowledged] = React.useState(false);

  const handleStartExam = () => {
    if (!acknowledged) return;
    router.push(`/exam/${testInfo.id}/live`);
  };

  return (
    <div className="min-h-screen bg-[#080711] text-white flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-purple-900/30 bg-[#0A0914] px-6 py-4 flex items-center justify-between">
        <Link
          href="/mock-tests"
          className="flex items-center gap-2 text-xs font-semibold text-[#948FA8] hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Tests
        </Link>
        <div className="flex items-center gap-2 text-xs text-purple-300 font-semibold">
          <ShieldCheck className="h-4 w-4 text-purple-400" />
          <span>Prayas Official CBT Simulator</span>
        </div>
      </header>

      {/* Main Instructions Card */}
      <main className="max-w-4xl mx-auto w-full p-4 sm:p-8 flex-1">
        <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 sm:p-8 space-y-8 shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 text-xs font-semibold mb-3">
              National Testing Agency CBT Format
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
              General Instructions: {testInfo.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#948FA8] mt-1">
              Please read the instructions carefully before commencing the examination.
            </p>
          </div>

          {/* Test Meta summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#17142F] border border-purple-900/30">
              <span className="text-[#948FA8] uppercase block text-[10px]">Total Duration</span>
              <span className="font-bold text-white text-sm font-mono">{testInfo.duration} Minutes</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#17142F] border border-purple-900/30">
              <span className="text-[#948FA8] uppercase block text-[10px]">Total Marks</span>
              <span className="font-bold text-purple-300 text-sm font-mono">{testInfo.totalQuestions * 4} Marks</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#17142F] border border-purple-900/30">
              <span className="text-[#948FA8] uppercase block text-[10px]">Total Questions</span>
              <span className="font-bold text-white text-sm font-mono">{testInfo.totalQuestions} Questions</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#17142F] border border-purple-900/30">
              <span className="text-[#948FA8] uppercase block text-[10px]">Marking Scheme</span>
              <span className="font-bold text-emerald-400 text-sm font-mono">+4.0 / -1.0</span>
            </div>
          </div>

          {/* Marking Rules */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-900/20 pt-6">
            <h3 className="text-base font-bold text-white">Section &amp; Question Paper Blueprint</h3>
            <ul className="list-disc list-inside space-y-2 text-[#948FA8]">
              <li>
                The examination consists of three subjects: <strong className="text-white">Physics (25 Qs)</strong>,{" "}
                <strong className="text-white">Chemistry (25 Qs)</strong>, and <strong className="text-white">Mathematics (25 Qs)</strong>.
              </li>
              <li>
                Each subject has two sections:
                <ul className="list-circle list-inside ml-5 mt-1 space-y-1 text-[#948FA8]">
                  <li><strong className="text-white">Section A:</strong> 20 Multiple Choice Questions (all compulsory).</li>
                  <li><strong className="text-white">Section B:</strong> 10 Numerical Value Questions (answer any 5).</li>
                </ul>
              </li>
              <li>
                <strong className="text-emerald-400">+4 Marks</strong> will be awarded for each correct answer.
              </li>
              <li>
                <strong className="text-rose-400">-1 Mark</strong> will be deducted for each incorrect answer in both Section A and Section B.
              </li>
              <li>
                <strong className="text-slate-400">0 Marks</strong> will be given for unattempted questions.
              </li>
            </ul>
          </div>

          {/* Question Palette Color Legend */}
          <div className="space-y-3 border-t border-purple-900/20 pt-6">
            <h3 className="text-base font-bold text-white">Navigating Question Palette</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#17142F] border border-purple-900/30">
                <span className="h-6 w-6 rounded-md bg-emerald-600 font-bold flex items-center justify-center text-white text-[11px]">
                  1
                </span>
                <span className="text-slate-300">Answered</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#17142F] border border-purple-900/30">
                <span className="h-6 w-6 rounded-md bg-[#251F48] font-bold flex items-center justify-center text-slate-400 text-[11px]">
                  2
                </span>
                <span className="text-slate-300">Not Answered</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#17142F] border border-purple-900/30">
                <span className="h-6 w-6 rounded-md bg-purple-600 font-bold flex items-center justify-center text-white text-[11px]">
                  3
                </span>
                <span className="text-slate-300">Marked for Review</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#17142F] border border-purple-900/30">
                <span className="h-6 w-6 rounded-md bg-purple-700 ring-2 ring-purple-400 font-bold flex items-center justify-center text-white text-[11px]">
                  4
                </span>
                <span className="text-slate-300">Current Question</span>
              </div>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="pt-6 border-t border-purple-900/20">
            <label className="flex items-start gap-3 p-4 rounded-xl bg-[#17142F] border border-purple-900/30 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-purple-600 cursor-pointer"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                I have read and understood all the examination instructions above. I declare that I am appearing in this test under strict simulated examination conditions without unauthorized reference materials.
              </span>
            </label>
          </div>

          {/* Action Button */}
          <div className="flex justify-end gap-3 pt-2">
            <Link href="/mock-tests">
              <Button variant="ghost" className="text-xs text-[#948FA8] hover:text-white rounded-full">
                Cancel
              </Button>
            </Link>
            <Button
              variant="purplePill"
              size="lg"
              disabled={!acknowledged}
              onClick={handleStartExam}
              className="text-xs font-bold gap-2 px-8"
            >
              <span>I am Ready to Begin</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}