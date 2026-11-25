"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Search, ArrowRight, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHAPTERS } from "@/lib/constants/syllabus";
import { EmptyState } from "@/components/ui/status-states";

export default function ChapterPracticePage() {
  const [selectedSubject, setSelectedSubject] = React.useState<string>("all");
  const [selectedClass, setSelectedClass] = React.useState<number | "all">("all");
  const [search, setSearch] = React.useState("");

  const filteredChapters = CHAPTERS.filter((ch) => {
    const matchesSubject = selectedSubject === "all" || ch.subject_id === selectedSubject;
    const matchesClass = selectedClass === "all" || ch.class_level === selectedClass;
    const matchesSearch = ch.name.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesClass && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
            Chapter Practice &amp; Drills
          </h1>
          <p className="text-sm text-[#948FA8] mt-1">
            Master high-weightage chapters with targeted question banks curated from NTA trends.
          </p>
        </div>

        {/* Quick subject badges */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 font-medium">
            8 Physics
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 font-medium">
            7 Chemistry
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 font-medium">
            7 Math
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#7B7593]" />
          <input
            type="text"
            placeholder="Search chapters (e.g. Calculus)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 rounded-full bg-[#131127] border border-purple-900/30 pl-10 pr-4 text-xs text-white placeholder-[#7B7593] focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Subject Pills */}
          <div className="inline-flex rounded-full bg-[#111022] p-1 border border-purple-900/30 text-xs">
            {["all", "physics", "chemistry", "mathematics"].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3.5 py-1.5 rounded-full capitalize font-medium transition-all ${
                  selectedSubject === sub
                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                    : "text-[#948FA8] hover:text-white"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Class Pills */}
          <div className="inline-flex rounded-full bg-[#111022] p-1 border border-purple-900/30 text-xs">
            {[
              { id: "all", label: "All" },
              { id: 11, label: "Class 11" },
              { id: 12, label: "Class 12" },
            ].map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id as any)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  selectedClass === cls.id
                    ? "bg-[#1E1A3D] text-purple-300 border border-purple-500/30 font-semibold"
                    : "text-[#948FA8] hover:text-white"
                }`}
              >
                {cls.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      {filteredChapters.length === 0 ? (
        <EmptyState
          title="No chapters found"
          description="Try broadening your subject or class filters."
          actionLabel="Reset Filters"
          onAction={() => {
            setSelectedSubject("all");
            setSelectedClass("all");
            setSearch("");
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChapters.map((ch) => {
            return (
              <div
                key={ch.id}
                className="group rounded-2xl border border-purple-900/30 bg-[#111022] p-5 flex flex-col justify-between hover:border-purple-600/50 transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase bg-purple-950/60 border-purple-500/30 text-purple-300">
                      {ch.subject_id}
                    </span>
                    <span className="text-xs font-semibold text-[#948FA8]">
                      Class {ch.class_level}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-purple-300 transition-colors">
                    {ch.name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-purple-900/20 mt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#948FA8]">
                    <span>JEE Weightage:</span>
                    <span className="font-mono font-bold text-purple-400">
                      ~{ch.weightage_percent}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#948FA8]">
                    <span>Questions Available:</span>
                    <span className="font-mono text-slate-200">
                      {ch.total_questions} Questions
                    </span>
                  </div>

                  <Link href="/exam/jee-mock-01/instructions" className="block pt-1">
                    <Button
                      variant="purplePill"
                      size="sm"
                      className="w-full text-xs font-semibold gap-1.5"
                    >
                      <Zap className="h-3.5 w-3.5 text-white" /> Start Practice Drill
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}