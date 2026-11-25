"use client";

import * as React from "react";
import Link from "next/link";
import { History, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const PYQ_PAPERS = [
  {
    id: "pyq-2024-jan-27-s1",
    year: 2024,
    session: "January Session 1",
    shift: "Jan 27, Shift 1",
    difficulty: "Moderate",
    solvedCount: 14200,
    isAttempted: true,
    userScore: 204,
  },
  {
    id: "pyq-2024-jan-27-s2",
    year: 2024,
    session: "January Session 1",
    shift: "Jan 27, Shift 2",
    difficulty: "Moderate to Hard",
    solvedCount: 11800,
    isAttempted: false,
  },
  {
    id: "pyq-2024-jan-29-s1",
    year: 2024,
    session: "January Session 1",
    shift: "Jan 29, Shift 1",
    difficulty: "Moderate",
    solvedCount: 13500,
    isAttempted: false,
  },
  {
    id: "pyq-2024-jan-29-s2",
    year: 2024,
    session: "January Session 1",
    shift: "Jan 29, Shift 2",
    difficulty: "Hard (High Calc)",
    solvedCount: 12900,
    isAttempted: false,
  },
  {
    id: "pyq-2024-apr-04-s1",
    year: 2024,
    session: "April Session 2",
    shift: "Apr 04, Shift 1",
    difficulty: "Moderate",
    solvedCount: 15100,
    isAttempted: false,
  },
  {
    id: "pyq-2023-jan-24-s1",
    year: 2023,
    session: "January Session 1",
    shift: "Jan 24, Shift 1",
    difficulty: "Moderate to Easy",
    solvedCount: 22400,
    isAttempted: false,
  },
];

export default function PYQPage() {
  const [selectedYear, setSelectedYear] = React.useState<number | "all">("all");
  const [search, setSearch] = React.useState("");

  const filtered = PYQ_PAPERS.filter((paper) => {
    const matchesYear = selectedYear === "all" || paper.year === selectedYear;
    const matchesSearch =
      paper.shift.toLowerCase().includes(search.toLowerCase()) ||
      paper.session.toLowerCase().includes(search.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
            Previous Year Question Papers (PYQs)
          </h1>
          <p className="text-sm text-[#948FA8] mt-1">
            Real official JEE Main question papers with step-by-step verified explanations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-500/30">
          <ShieldCheck className="h-4 w-4 text-purple-400" />
          <span>Official NTA Master Answer Keys</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#7B7593]" />
          <input
            type="text"
            placeholder="Search shift (e.g. Jan 27)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 rounded-full bg-[#131127] border border-purple-900/30 pl-10 pr-4 text-xs text-white placeholder-[#7B7593] focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        {/* Year Pills */}
        <div className="inline-flex rounded-full bg-[#111022] p-1 border border-purple-900/30 text-xs">
          {[
            { id: "all", label: "All Years" },
            { id: 2024, label: "2024 Papers" },
            { id: 2023, label: "2023 Papers" },
          ].map((yr) => (
            <button
              key={yr.id}
              onClick={() => setSelectedYear(yr.id as any)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                selectedYear === yr.id
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                  : "text-[#948FA8] hover:text-white"
              }`}
            >
              {yr.label}
            </button>
          ))}
        </div>
      </div>

      {/* PYQ Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((paper) => (
          <div
            key={paper.id}
            className="group rounded-2xl border border-purple-900/30 bg-[#111022] p-5 flex flex-col justify-between hover:border-purple-600/50 transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-purple-950/60 border-purple-500/30 text-purple-300">
                  JEE Main {paper.year}
                </span>
                <span className="text-xs text-[#948FA8]">{paper.session}</span>
              </div>

              <h3 className="font-bold text-white text-base leading-snug group-hover:text-purple-300 transition-colors">
                {paper.shift}
              </h3>
            </div>

            <div className="pt-4 border-t border-purple-900/20 mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#948FA8]">
                <span>Difficulty:</span>
                <span className="font-medium text-white">{paper.difficulty}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#948FA8]">
                <span>Aspirants Solved:</span>
                <span className="font-mono text-slate-300">
                  {paper.solvedCount.toLocaleString()}
                </span>
              </div>

              <Link href="/exam/jee-mock-01/instructions" className="block pt-1">
                <Button
                  variant="purplePill"
                  size="sm"
                  className="w-full text-xs font-semibold gap-1.5"
                >
                  Attempt Official Paper →
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}