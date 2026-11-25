"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Trophy,
  ArrowRight,
  Download,
  RotateCcw,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MOCK_TESTS_LIST } from "@/lib/constants/mock-data";

export default function TestResultPage() {
  const params = useParams();
  const testId = params.testId as string;
  const attemptId = params.attemptId as string;
  const test = MOCK_TESTS_LIST.find((t) => t.id === testId) || MOCK_TESTS_LIST[0];

  const [result, setResult] = React.useState({
    totalScore: 95,
    maxScore: 120,
    physicsScore: 96,
    chemistryScore: 93,
    mathScore: 98,
    percentile: 98.6,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`jee_attempt_${attemptId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.attempt) {
            setResult({
              totalScore: parsed.attempt.score,
              maxScore: parsed.attempt.maxScore,
              physicsScore: Math.round(((parsed.attempt.physicsScore || 0) / 100) * 100) || 96,
              chemistryScore: Math.round(((parsed.attempt.chemistryScore || 0) / 100) * 100) || 93,
              mathScore: Math.round(((parsed.attempt.mathScore || 0) / 100) * 100) || 98,
              percentile: parsed.attempt.percentile || 98.6,
            });
          }
        } catch {}
      }
    }
  }, [attemptId]);

  return (
    <div className="min-h-screen bg-[#080711] text-slate-100 p-6 sm:p-10 flex flex-col justify-between selection:bg-purple-500">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-purple-900/20 pb-5">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <span className="text-xl text-purple-400 group-hover:rotate-12 transition-transform">
              ✦
            </span>
            <span className="font-bold text-xl text-white tracking-tight">
              Prayas
            </span>
          </Link>

          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-xs text-[#948FA8] hover:text-white gap-2">
              <LayoutDashboard className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Main Grid: Left Hero Performance Card + Right Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Classical Golden Trophy with Violet Glowing Aura */}
          <div className="lg:col-span-7 rounded-3xl border border-purple-500/25 bg-gradient-to-b from-[#181238] via-[#100D26] to-[#0A0914] p-8 sm:p-12 text-center flex flex-col items-center justify-between shadow-2xl shadow-purple-950/50 relative overflow-hidden">
            {/* Celestial background aura */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />

            {/* Glowing Golden Trophy & Violet Ring */}
            <div className="relative z-10 pt-4 pb-2">
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                {/* Glowing violet halo */}
                <div className="absolute inset-0 rounded-full border border-purple-400/50 purple-glow animate-pulse" />
                <div className="absolute inset-2 rounded-full border border-indigo-400/30" />
                
                {/* Golden Trophy Icon */}
                <div className="h-20 w-20 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-[#1E1202] shadow-2xl trophy-glow">
                  <Trophy className="h-11 w-11 fill-amber-200 stroke-amber-800 stroke-[1.5]" />
                </div>
              </div>
            </div>

            {/* Performance Titles */}
            <div className="space-y-3 z-10">
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                Excellent Performance!
              </h2>
              <p className="text-xs sm:text-sm text-[#A5A1B8] max-w-sm mx-auto">
                You&apos;ve scored better than 96% of aspirants this year.
              </p>
            </div>

            {/* Score Numbers */}
            <div className="py-6 z-10 space-y-1">
              <div className="text-5xl sm:text-6xl font-extrabold font-sans text-white tracking-tight">
                {result.totalScore} <span className="text-3xl text-purple-400 font-light">/ {result.maxScore}</span>
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Percentile {result.percentile}%
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 z-10 w-full pt-2">
              <Link href={`/exam/${testId}/analysis/${attemptId}`} className="w-full sm:w-auto">
                <Button
                  variant="purplePill"
                  className="w-full sm:w-auto h-11 px-8 text-xs font-bold gap-2 shadow-xl shadow-purple-600/40"
                >
                  View Detailed Analysis <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full sm:w-auto h-11 rounded-full px-6 text-xs border-purple-900/40 bg-[#121124] text-[#A5A1B8] hover:text-white gap-2"
              >
                <Download className="h-3.5 w-3.5" /> Download Scorecard
              </Button>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Subject-Wise Analysis */}
            <div className="rounded-3xl border border-purple-900/25 bg-[#111022] p-6 space-y-5 shadow-xl">
              <h3 className="font-semibold text-white text-base">
                Subject-wise Analysis
              </h3>

              <div className="space-y-4 text-xs">
                {/* Physics */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-[#A5A1B8]">Physics</span>
                    <span className="font-bold text-white font-mono">{result.physicsScore}%</span>
                  </div>
                  <Progress
                    value={result.physicsScore}
                    indicatorColor="bg-gradient-to-r from-purple-500 to-indigo-500"
                    className="h-2 bg-[#1C1838]"
                  />
                </div>

                {/* Chemistry */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-[#A5A1B8]">Chemistry</span>
                    <span className="font-bold text-white font-mono">{result.chemistryScore}%</span>
                  </div>
                  <Progress
                    value={result.chemistryScore}
                    indicatorColor="bg-gradient-to-r from-purple-500 to-indigo-500"
                    className="h-2 bg-[#1C1838]"
                  />
                </div>

                {/* Mathematics */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-[#A5A1B8]">Mathematics</span>
                    <span className="font-bold text-white font-mono">{result.mathScore}%</span>
                  </div>
                  <Progress
                    value={result.mathScore}
                    indicatorColor="bg-gradient-to-r from-purple-500 to-indigo-500"
                    className="h-2 bg-[#1C1838]"
                  />
                </div>
              </div>
            </div>

            {/* Performance Trend Chart */}
            <div className="rounded-3xl border border-purple-900/25 bg-[#111022] p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white text-base">
                  Performance Trend
                </h3>
                <span className="text-xs font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                  95%
                </span>
              </div>

              {/* Curved Purple Trend Line */}
              <div className="pt-2">
                <svg className="w-full h-28" viewBox="0 0 320 90" fill="none">
                  {/* Subtle Gridlines */}
                  <line x1="0" y1="20" x2="320" y2="20" stroke="#1D193B" strokeDasharray="3 3" />
                  <line x1="0" y1="55" x2="320" y2="55" stroke="#1D193B" strokeDasharray="3 3" />

                  {/* Gradient Area Fill */}
                  <defs>
                    <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 20 65 Q 100 45 160 55 T 260 25 T 300 20 L 300 90 L 20 90 Z"
                    fill="url(#purpleArea)"
                  />

                  {/* Glowing Trend Line */}
                  <path
                    d="M 20 65 Q 100 45 160 55 T 260 25 T 300 20"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Nodes */}
                  <circle cx="20" cy="65" r="4" fill="#C4B5FD" />
                  <circle cx="110" cy="48" r="4" fill="#C4B5FD" />
                  <circle cx="200" cy="46" r="4" fill="#C4B5FD" />
                  <circle cx="280" cy="22" r="5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2.5" />
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between text-[11px] text-[#7B7593] pt-2 font-medium px-2">
                  <span>Test 1</span>
                  <span>Test 2</span>
                  <span>Test 3</span>
                  <span>Test 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
