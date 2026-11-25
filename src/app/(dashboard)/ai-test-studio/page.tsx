"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Zap,
  BookOpen,
  FileText,
  Upload,
  Key,
  CheckCircle2,
  Clock,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Shield,
  Layers,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AITestStudioPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState<"generator" | "scanner" | "settings">("generator");

  // Generator form states
  const [subject, setSubject] = React.useState<"all" | "physics" | "chemistry" | "mathematics">("all");
  const [difficulty, setDifficulty] = React.useState<"jee_main" | "jee_advanced">("jee_main");
  const [questionCount, setQuestionCount] = React.useState<number>(10);
  const [customPrompt, setCustomPrompt] = React.useState<string>("");
  const [targetChapters, setTargetChapters] = React.useState<string>("");

  // Scanner form state
  const [rawText, setRawText] = React.useState<string>("");

  // Gemini API key state
  const [apiKey, setApiKey] = React.useState<string>("");
  const [isKeySaved, setIsKeySaved] = React.useState<boolean>(false);

  // Generation status
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [generationStep, setGenerationStep] = React.useState<string>("");
  const [generatedTest, setGeneratedTest] = React.useState<any | null>(null);

  // Saved tests
  const [savedTests, setSavedTests] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedKey = localStorage.getItem("prayas_gemini_api_key");
      if (storedKey) setApiKey(storedKey);

      const storedCustom = localStorage.getItem("jee_custom_tests");
      if (storedCustom) {
        try {
          const parsed = JSON.parse(storedCustom);
          if (Array.isArray(parsed)) setSavedTests(parsed);
        } catch {}
      }
    }
  }, []);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("prayas_gemini_api_key", apiKey.trim());
    }
    setIsKeySaved(true);
    setTimeout(() => setIsKeySaved(false), 3000);
  };

  const handleGenerate = async (isScanner: boolean = false) => {
    setIsGenerating(true);
    setGenerationStep("Consulting JEE syllabus & high-yield blueprints...");

    try {
      setTimeout(() => {
        setGenerationStep("Synthesizing questions, distractors & step-by-step solutions...");
      }, 900);

      const res = await fetch("/api/ai/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: customPrompt,
          subject,
          chapters: targetChapters ? targetChapters.split(",").map((s) => s.trim()) : [],
          difficulty,
          questionCount: isScanner ? 10 : questionCount,
          rawText: isScanner ? rawText : "",
          apiKey: apiKey.trim(),
        }),
      });

      const data = await res.json();

      if (data.success && data.questions) {
        const testId = `ai-test-${Date.now()}`;
        const durationMins = questionCount * 2; // 2 minutes per question

        // Map to full exam question states
        const formattedQuestions = data.questions.map((q: any, idx: number) => ({
          question: {
            id: q.id || `ai-q-${idx + 1}`,
            test_id: testId,
            subject_id: q.subject_id || "physics",
            question_type: q.question_type || "single_choice",
            question_text: q.question_text,
            options: q.options || ["Option A", "Option B", "Option C", "Option D"],
            correct_option_index: q.correct_option_index ?? 0,
            correct_numerical_value: q.correct_numerical_value,
            solution_text: q.solution_text || "Step-by-step solution provided.",
          },
          orderNumber: idx + 1,
          subjectId: q.subject_id || "physics",
          sectionName:
            q.question_type === "numerical"
              ? "Section B (Numerical)"
              : "Section A (Single Choice)",
          status: idx === 0 ? "not_answered" : "not_visited",
          selectedOption: null,
          numericalAnswer: "",
          timeSpentSeconds: 0,
          isBookmarked: false,
        }));

        const newTestRecord = {
          id: testId,
          title: data.title || "✦ AI Generated JEE Practice Test",
          subject: subject === "all" ? "Full PCM" : subject.toUpperCase(),
          totalQuestions: formattedQuestions.length,
          durationMinutes: durationMins,
          difficulty: difficulty === "jee_advanced" ? "JEE Advanced" : "JEE Main",
          source: data.source || "gemini-ai",
          createdAt: new Date().toISOString(),
          questions: formattedQuestions,
        };

        // Save into local storage
        if (typeof window !== "undefined") {
          localStorage.setItem(`jee_custom_test_${testId}`, JSON.stringify(newTestRecord));

          const updatedList = [newTestRecord, ...savedTests.slice(0, 9)];
          localStorage.setItem("jee_custom_tests", JSON.stringify(updatedList));
          setSavedTests(updatedList);
        }

        setGeneratedTest(newTestRecord);
      }
    } catch (err) {
      console.error("Error generating AI test:", err);
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 text-xs font-semibold mb-2">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>NTA AI Question Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
            ✦ AI Test Studio
          </h1>
          <p className="text-sm text-[#948FA8] mt-1">
            Generate unlimited custom JEE Main &amp; Advanced examinations in seconds, or convert physical question papers into live CBT tests.
          </p>
        </div>

        <button
          onClick={() => setActiveTab("settings")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-900/30 bg-[#111022] hover:bg-[#1C1738] text-xs font-medium text-[#948FA8] hover:text-white transition-colors"
        >
          <Key className="h-3.5 w-3.5 text-purple-400" />
          <span>{apiKey ? "API Key Connected" : "Connect Gemini API"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-purple-900/30 gap-8 text-sm">
        <button
          onClick={() => setActiveTab("generator")}
          className={`pb-3 font-medium transition-colors relative flex items-center gap-2 ${
            activeTab === "generator"
              ? "text-white font-semibold"
              : "text-[#948FA8] hover:text-white"
          }`}
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span>Instant AI Generator</span>
          {activeTab === "generator" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("scanner")}
          className={`pb-3 font-medium transition-colors relative flex items-center gap-2 ${
            activeTab === "scanner"
              ? "text-white font-semibold"
              : "text-[#948FA8] hover:text-white"
          }`}
        >
          <FileText className="h-4 w-4 text-purple-400" />
          <span>Physical Paper Scanner</span>
          {activeTab === "scanner" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`pb-3 font-medium transition-colors relative flex items-center gap-2 ${
            activeTab === "settings"
              ? "text-white font-semibold"
              : "text-[#948FA8] hover:text-white"
          }`}
        >
          <Key className="h-4 w-4 text-purple-400" />
          <span>Gemini AI Key</span>
          {activeTab === "settings" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          )}
        </button>
      </div>

      {/* Generator Tab */}
      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Configuration */}
          <div className="lg:col-span-8 rounded-2xl border border-purple-900/30 bg-[#111022] p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#948FA8] uppercase tracking-wider">
                Select Subject
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "all", label: "Full PCM Mix" },
                  { id: "physics", label: "Physics" },
                  { id: "chemistry", label: "Chemistry" },
                  { id: "mathematics", label: "Mathematics" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSubject(s.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      subject === s.id
                        ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40"
                        : "bg-[#17142F] border-purple-900/20 text-[#948FA8] hover:text-white hover:border-purple-700/50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#948FA8] uppercase tracking-wider">
                Exam Difficulty Pattern
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDifficulty("jee_main")}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    difficulty === "jee_main"
                      ? "bg-[#1E1A3D] border-purple-500 text-white ring-1 ring-purple-500 shadow-md"
                      : "bg-[#17142F] border-purple-900/20 text-[#948FA8] hover:border-purple-700/50"
                  }`}
                >
                  <div className="font-semibold text-xs text-white">JEE Main Standard</div>
                  <div className="text-[11px] text-[#948FA8] mt-0.5">
                    Speed &amp; precision focused with +4 / -1 marking scheme.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDifficulty("jee_advanced")}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    difficulty === "jee_advanced"
                      ? "bg-[#1E1A3D] border-purple-500 text-white ring-1 ring-purple-500 shadow-md"
                      : "bg-[#17142F] border-purple-900/20 text-[#948FA8] hover:border-purple-700/50"
                  }`}
                >
                  <div className="font-semibold text-xs text-white">JEE Advanced (High Depth)</div>
                  <div className="text-[11px] text-[#948FA8] mt-0.5">
                    Multi-concept numericals, analytical distractors &amp; tricky traps.
                  </div>
                </button>
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#948FA8] uppercase tracking-wider">
                Number of Questions
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { count: 5, label: "5 Qs (10m Drill)" },
                  { count: 10, label: "10 Qs (20m Sprint)" },
                  { count: 25, label: "25 Qs (50m Section)" },
                  { count: 30, label: "30 Qs (60m Mock)" },
                ].map((c) => (
                  <button
                    key={c.count}
                    type="button"
                    onClick={() => setQuestionCount(c.count)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                      questionCount === c.count
                        ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40"
                        : "bg-[#17142F] border-purple-900/20 text-[#948FA8] hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Chapters Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#948FA8] uppercase tracking-wider">
                Specific Chapters / Topics (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Rotational Motion, Thermodynamics, Calculus, Coordination Chemistry"
                value={targetChapters}
                onChange={(e) => setTargetChapters(e.target.value)}
                className="w-full h-10 rounded-xl bg-[#17142F] border border-purple-900/30 px-3.5 text-xs text-white placeholder-[#7B7593] focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Custom AI Prompt Focus */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#948FA8] uppercase tracking-wider">
                Custom Instructions for AI (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Include 2 numerical problems, tricky graph-based physics questions, and organic isomerism traps."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full rounded-xl bg-[#17142F] border border-purple-900/30 p-3 text-xs text-white placeholder-[#7B7593] focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Button
                variant="purplePill"
                size="lg"
                onClick={() => handleGenerate(false)}
                disabled={isGenerating}
                className="w-full text-xs font-bold gap-2 py-3.5 shadow-xl shadow-purple-900/50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-white" />
                    <span>{generationStep || "Generating AI Test..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-white" />
                    <span>✦ Generate Custom Test with AI</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Sidebar: Generated Result or Recent AI Tests */}
          <div className="lg:col-span-4 space-y-6">
            {generatedTest ? (
              <div className="rounded-2xl border border-purple-500/50 bg-[#16132D] p-6 space-y-4 shadow-2xl ring-1 ring-purple-500/50 animate-in fade-in-50">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Test Ready to Attempt</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {generatedTest.title}
                </h3>

                <div className="space-y-2 text-xs text-[#948FA8] pt-2 border-t border-purple-900/30">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="text-white font-mono font-bold">
                      {generatedTest.totalQuestions} Questions
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="text-white font-mono font-bold">
                      {generatedTest.durationMinutes} Minutes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marking:</span>
                    <span className="text-emerald-400 font-mono font-bold">+4 / -1</span>
                  </div>
                </div>

                <Link href={`/exam/${generatedTest.id}/instructions`} className="block pt-2">
                  <Button variant="purplePill" className="w-full text-xs font-bold gap-2">
                    <span>Launch CBT Exam</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-400" />
                  <span>Recently Generated Tests</span>
                </h3>

                {savedTests.length === 0 ? (
                  <p className="text-xs text-[#7B7593]">
                    No custom tests generated yet. Configure options on the left and tap Generate!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedTests.slice(0, 4).map((t) => (
                      <div
                        key={t.id}
                        className="p-3 rounded-xl bg-[#17142F] border border-purple-900/20 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-white line-clamp-1">{t.title}</div>
                          <div className="text-[11px] text-[#948FA8]">
                            {t.totalQuestions} Qs • {t.difficulty}
                          </div>
                        </div>
                        <Link href={`/exam/${t.id}/instructions`}>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-purple-300 hover:text-white rounded-full">
                            Start →
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Physical Paper Scanner Tab */}
      {activeTab === "scanner" && (
        <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl mx-auto">
          <div>
            <h3 className="text-lg font-bold text-white">Physical Paper &amp; PYQ Scanner</h3>
            <p className="text-xs text-[#948FA8] mt-1">
              Paste questions from your offline coaching sheets, PDF mocks, or physical question papers. AI will parse them into an interactive CBT mock test with timer and scoring.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#948FA8] uppercase tracking-wider">
              Paste Question Text / Offline Notes
            </label>
            <textarea
              rows={8}
              placeholder="Paste question text here, e.g.:&#10;Q1. A particle of mass 2kg is released from height 20m...&#10;(A) 10 m/s (B) 20 m/s (C) 15 m/s (D) 25 m/s&#10;Ans: B&#10;&#10;Q2. Which of the following is an electrophile?&#10;(A) NH3 (B) BF3 (C) H2O (D) OH-&#10;Ans: B"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full rounded-xl bg-[#17142F] border border-purple-900/30 p-4 text-xs font-mono text-white placeholder-[#7B7593] focus:outline-none focus:border-purple-500 leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="purplePill"
              size="lg"
              disabled={!rawText.trim() || isGenerating}
              onClick={() => handleGenerate(true)}
              className="text-xs font-bold gap-2 px-8"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>Converting Physical Paper...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-white" />
                  <span>Convert into Live CBT Test →</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Gemini AI Key Settings Tab */}
      {activeTab === "settings" && (
        <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 sm:p-8 space-y-6 shadow-xl max-w-2xl mx-auto">
          <div>
            <h3 className="text-lg font-bold text-white">Connect Google Gemini AI</h3>
            <p className="text-xs text-[#948FA8] mt-1">
              Google provides a 100% free Gemini API key with no credit card required. Connecting your key gives you unlimited instant test generation with official JEE reasoning.
            </p>
          </div>

          {isKeySaved && (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Your Gemini API key has been securely saved locally!</span>
            </div>
          )}

          <form onSubmit={handleSaveApiKey} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#948FA8]">Google Gemini API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full h-10 rounded-xl bg-[#17142F] border border-purple-900/30 px-3.5 text-xs text-white placeholder-[#7B7593] focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#948FA8] pt-1">
              <span>Don't have a key?</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:text-purple-300 font-semibold underline flex items-center gap-1"
              >
                <span>Get Free Key at Google AI Studio</span>
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>

            <div className="pt-2">
              <Button variant="purplePill" type="submit" className="text-xs px-6">
                Save API Key
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}