"use client";

import * as React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Award,
  Zap,
  Target,
  ArrowUpRight,
  ChevronRight,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState<
    "overview" | "subjects" | "weaknesses" | "comparison"
  >("overview");

  const [tests, setTests] = React.useState<any[]>([]);
  const [activePoint, setActivePoint] = React.useState<number | null>(3); // Default to last point (Test 4)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const activeUserStr = localStorage.getItem("jee_active_user");
      let storedAttempts: any = null;

      if (activeUserStr) {
        try {
          const user = JSON.parse(activeUserStr);
          if (user.email) {
            const userKey = `jee_attempts_${user.email}`;
            storedAttempts = localStorage.getItem(userKey);
          }
        } catch {}
      }

      if (!storedAttempts) {
        storedAttempts = localStorage.getItem("jee_test_attempts");
      }

      if (storedAttempts) {
        try {
          const parsed = JSON.parse(storedAttempts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTests(parsed);
          }
        } catch {}
      }
    }
  }, []);

  // Performance data points matching the reference image curve
  const performanceTrend = [
    { label: "Test 1", value: 78, score: "78%", tooltip: "JEE Mock 1 • 78%" },
    { label: "Test 2", value: 84, score: "84%", tooltip: "JEE Mock 2 • 84%" },
    { label: "Test 3", value: 89, score: "89%", tooltip: "JEE Mock 3 • 89%" },
    { label: "Test 4", value: 95, score: "95%", tooltip: "JEE Advanced Mock #12 • 95%" },
  ];

  // SVG coordinate calculations for smooth curve
  // ViewBox: 0 0 500 180
  // X: 50 -> 450. Y: min 70 -> 150, max 100 -> 30
  const points = [
    { x: 50, y: 135, val: 78, label: "Test 1" },
    { x: 180, y: 105, val: 84, label: "Test 2" },
    { x: 310, y: 75, val: 89, label: "Test 3" },
    { x: 440, y: 45, val: 95, label: "Test 4" },
  ];

  // Bezier path for the smooth curve
  const curvePath = "M 50 135 C 110 120, 120 105, 180 105 C 240 105, 250 75, 310 75 C 370 75, 380 45, 440 45";
  const areaPath = "M 50 135 C 110 120, 120 105, 180 105 C 240 105, 250 75, 310 75 C 370 75, 380 45, 440 45 L 440 170 L 50 170 Z";

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200 max-w-6xl mx-auto">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
          Analytics
        </h1>
        <p className="text-sm text-[#948FA8] mt-1">
          Detailed metrics tracking your score trajectory, speed vs accuracy, and syllabus mastery.
        </p>
      </div>

      {/* Tabs with Underline */}
      <div className="flex border-b border-purple-900/30 gap-8 text-sm">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 font-medium transition-colors relative ${
            activeTab === "overview"
              ? "text-white font-semibold"
              : "text-[#948FA8] hover:text-white"
          }`}
        >
          Overview
          {activeTab === "overview" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("subjects")}
          className={`pb-3 font-medium transition-colors relative ${
            activeTab === "subjects"
              ? "text-white font-semibold"
              : "text-[#948FA8] hover:text-white"
          }`}
        >
          Subject Analysis
          {activeTab === "subjects" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("weaknesses")}
          className={`pb-3 font-medium transition-colors relative ${
            activeTab === "weaknesses"
              ? "text-white font-semibold"
              : "text-[#948FA8] hover:text-white"
          }`}
        >
          Weaknesses
          {activeTab === "weaknesses" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("comparison")}
          className={`pb-3 font-medium transition-colors relative ${
            activeTab === "comparison"
              ? "text-white font-semibold"
              : "text-[#948FA8] hover:text-white"
          }`}
        >
          Comparison
          {activeTab === "comparison" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          )}
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Top Row: Performance Chart & Your Performance Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Performance Trend Chart */}
            <div className="lg:col-span-2 rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Score Trajectory</h3>
                  <p className="text-xs text-[#948FA8]">Score percentile across consecutive mock attempts</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  Full Syllabus Tests
                </span>
              </div>

              {/* SVG Chart Container */}
              <div className="relative pt-4 pb-2 w-full">
                <svg
                  viewBox="0 0 500 180"
                  className="w-full h-48 overflow-visible"
                >
                  <defs>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Horizontal Guide Lines */}
                  <line x1="40" y1="35" x2="470" y2="35" stroke="#241F48" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="40" y1="75" x2="470" y2="75" stroke="#241F48" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="40" y1="115" x2="470" y2="115" stroke="#241F48" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="40" y1="155" x2="470" y2="155" stroke="#241F48" strokeWidth="1" />

                  {/* Y Axis Labels */}
                  <text x="25" y="38" fill="#7B7593" fontSize="10" textAnchor="end">100%</text>
                  <text x="25" y="78" fill="#7B7593" fontSize="10" textAnchor="end">90%</text>
                  <text x="25" y="118" fill="#7B7593" fontSize="10" textAnchor="end">80%</text>
                  <text x="25" y="158" fill="#7B7593" fontSize="10" textAnchor="end">70%</text>

                  {/* Shaded Area Under Curve */}
                  <path d={areaPath} fill="url(#purpleGrad)" />

                  {/* Smooth Curved Line */}
                  <path
                    d={curvePath}
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />

                  {/* Glowing Data Points */}
                  {points.map((pt, i) => {
                    const isSelected = activePoint === i;
                    return (
                      <g
                        key={i}
                        className="cursor-pointer transition-all"
                        onClick={() => setActivePoint(i)}
                      >
                        {/* Outer pulsing ring for selected point */}
                        {isSelected && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="10"
                            fill="#8B5CF6"
                            fillOpacity="0.25"
                            className="animate-ping"
                          />
                        )}
                        {/* Dot circle */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? "6" : "4.5"}
                          fill="#8B5CF6"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        {/* Label Pill on top of point */}
                        {isSelected && (
                          <g>
                            <rect
                              x={pt.x - 22}
                              y={pt.y - 28}
                              width="44"
                              height="20"
                              rx="10"
                              fill="#1E1A3D"
                              stroke="#8B5CF6"
                              strokeWidth="1"
                            />
                            <text
                              x={pt.x}
                              y={pt.y - 14}
                              fill="#FFFFFF"
                              fontSize="10"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {pt.val}%
                            </text>
                          </g>
                        )}
                        {/* X-axis test label */}
                        <text
                          x={pt.x}
                          y="172"
                          fill={isSelected ? "#FFFFFF" : "#7B7593"}
                          fontSize="11"
                          fontWeight={isSelected ? "bold" : "normal"}
                          textAnchor="middle"
                        >
                          {pt.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Right 1 Col: "Your Performance" Card */}
            <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold tracking-wider text-[#948FA8]">
                    Your Performance
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    +5.2% ↑
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    92.4%
                  </div>
                  <p className="text-xs text-[#948FA8] mt-1">
                    Aggregate accuracy across your recent 4 mock exams
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-purple-900/20 mt-6">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#948FA8]">Physics</span>
                    <span className="text-white font-semibold">96%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[96%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#948FA8]">Chemistry</span>
                    <span className="text-white font-semibold">93%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[93%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#948FA8]">Mathematics</span>
                    <span className="text-white font-semibold">98%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[98%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 Detailed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-[#948FA8]">Mean Speed</div>
                  <div className="text-lg font-bold text-white">1m 24s / Question</div>
                </div>
              </div>
              <p className="text-xs text-[#7B7593]">
                Well within the NTA recommended pace of 2m 00s for JEE Main.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-[#948FA8]">Predicted JEE Rank</div>
                  <div className="text-lg font-bold text-white">AIR 420 - 780</div>
                </div>
              </div>
              <p className="text-xs text-[#7B7593]">
                Based on normalized national percentile algorithms from top rankers.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-[#948FA8]">Negative Marks Leak</div>
                  <div className="text-lg font-bold text-white">-3 Marks Avg</div>
                </div>
              </div>
              <p className="text-xs text-[#7B7593]">
                Excellent elimination accuracy with 94.2% confidence on chosen answers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subject Analysis Tab */}
      {activeTab === "subjects" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Physics Card */}
            <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Physics</h3>
                  <p className="text-xs text-[#948FA8]">25 Chapters • 96% Mastery</p>
                </div>
                <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  Top Subject
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[#948FA8] mb-1">
                    <span>Modern Physics</span>
                    <span className="text-white font-medium">98%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[98%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#948FA8] mb-1">
                    <span>Electrodynamics</span>
                    <span className="text-white font-medium">94%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[94%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#948FA8] mb-1">
                    <span>Mechanics</span>
                    <span className="text-white font-medium">89%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[89%]" />
                  </div>
                </div>
              </div>
              <Link href="/chapter-practice">
                <Button variant="purplePill" size="sm" className="w-full text-xs mt-2">
                  Practice Physics Chapters →
                </Button>
              </Link>
            </div>

            {/* Chemistry Card */}
            <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Chemistry</h3>
                  <p className="text-xs text-[#948FA8]">28 Chapters • 93% Mastery</p>
                </div>
                <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  Fastest Section
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[#948FA8] mb-1">
                    <span>Physical Chemistry</span>
                    <span className="text-white font-medium">96%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[96%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#948FA8] mb-1">
                    <span>Inorganic Chemistry</span>
                    <span className="text-white font-medium">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[92%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#948FA8] mb-1">
                    <span>Organic Chemistry</span>
                    <span className="text-white font-medium">88%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[88%]" />
                  </div>
                </div>
              </div>
              <Link href="/chapter-practice">
                <Button variant="purplePill" size="sm" className="w-full text-xs mt-2">
                  Practice Chemistry Chapters →
                </Button>
              </Link>
            </div>

            {/* Mathematics Card */}
            <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Mathematics</h3>
                  <p className="text-xs text-[#948FA8]">24 Chapters • 98% Mastery</p>
                </div>
                <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  Highest Accuracy
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[#948FA8] mb-1">
                    <span>Calculus (Diff & Int)</span>
                    <span className="text-white font-medium">99%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[99%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#948FA8] mb-1">
                    <span>Coordinate Geometry</span>
                    <span className="text-white font-medium">97%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[97%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#948FA8] mb-1">
                    <span>Algebra & Complex Numbers</span>
                    <span className="text-white font-medium">95%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[95%]" />
                  </div>
                </div>
              </div>
              <Link href="/chapter-practice">
                <Button variant="purplePill" size="sm" className="w-full text-xs mt-2">
                  Practice Math Chapters →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Weaknesses Tab */}
      {activeTab === "weaknesses" && (
        <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">High-Yield Revision Opportunities</h3>
            <p className="text-xs text-[#948FA8]">
              Targeting these specific subtopics will yield up to +24 marks in your next test attempt.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#17142F] border border-purple-900/30">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-lg">⚠️</span>
                <div>
                  <div className="text-sm font-semibold text-white">Rotational Dynamics - Moment of Inertia Integration</div>
                  <div className="text-xs text-[#948FA8]">Physics • 2 questions missed across 4 tests</div>
                </div>
              </div>
              <Link href="/chapter-practice">
                <Button variant="purplePill" size="sm" className="text-xs">
                  Review Concept
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[#17142F] border border-purple-900/30">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-lg">⚠️</span>
                <div>
                  <div className="text-sm font-semibold text-white">Electrophilic Aromatic Substitution - Reagent Conditions</div>
                  <div className="text-xs text-[#948FA8]">Chemistry • Negative marks recorded on 1 numerical question</div>
                </div>
              </div>
              <Link href="/chapter-practice">
                <Button variant="purplePill" size="sm" className="text-xs">
                  Review Concept
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[#17142F] border border-purple-900/30">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-lg">⚠️</span>
                <div>
                  <div className="text-sm font-semibold text-white">Probability - Bayes Theorem & Conditional Variables</div>
                  <div className="text-xs text-[#948FA8]">Mathematics • Time taken 3m 40s (Target: 2m 15s)</div>
                </div>
              </div>
              <Link href="/chapter-practice">
                <Button variant="purplePill" size="sm" className="text-xs">
                  Review Concept
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Tab */}
      {activeTab === "comparison" && (
        <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Benchmark vs Top 100 JEE Rankers</h3>
            <p className="text-xs text-[#948FA8]">
              Comparison between your metrics and students currently targeting IIT Bombay CS.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#17142F] border border-purple-900/30 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Question Accuracy</span>
                <span className="text-purple-300 font-mono">You: 92.4% vs Top 100: 94.8%</span>
              </div>
              <div className="h-2 w-full bg-[#100D20] rounded-full overflow-hidden flex">
                <div className="bg-purple-500 h-full w-[92.4%]" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#17142F] border border-purple-900/30 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">First-Pass Attempt Rate</span>
                <span className="text-purple-300 font-mono">You: 88.0% vs Top 100: 89.5%</span>
              </div>
              <div className="h-2 w-full bg-[#100D20] rounded-full overflow-hidden flex">
                <div className="bg-purple-500 h-full w-[88%]" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#17142F] border border-purple-900/30 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Speed per Correct Answer</span>
                <span className="text-purple-300 font-mono">You: 84s vs Top 100: 82s</span>
              </div>
              <div className="h-2 w-full bg-[#100D20] rounded-full overflow-hidden flex">
                <div className="bg-purple-500 h-full w-[95%]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}