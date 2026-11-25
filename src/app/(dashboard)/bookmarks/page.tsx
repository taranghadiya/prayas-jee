"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/status-states";
import { SAMPLE_EXAM_QUESTIONS } from "@/lib/constants/mock-data";

export default function BookmarksPage() {
  const [selectedSubject, setSelectedSubject] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [expandedId, setExpandedId] = React.useState<string | null>("q-p-01");
  const [bookmarks, setBookmarks] = React.useState(SAMPLE_EXAM_QUESTIONS);

  const filtered = bookmarks.filter((b) => {
    const matchesSubject = selectedSubject === "all" || b.subject_id === selectedSubject;
    const matchesSearch = b.question_text.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
            Bookmarked Questions Library
          </h1>
          <p className="text-sm text-[#948FA8] mt-1">
            Review critical questions and tricky concepts saved during tests for quick revision before exams.
          </p>
        </div>

        <div className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30">
          {bookmarks.length} Saved Questions
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#7B7593]" />
          <input
            type="text"
            placeholder="Search saved questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 rounded-full bg-[#131127] border border-purple-900/30 pl-10 pr-4 text-xs text-white placeholder-[#7B7593] focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        <div className="inline-flex rounded-full bg-[#111022] p-1 border border-purple-900/30 text-xs">
          {["all", "physics", "chemistry", "mathematics"].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3.5 py-1.5 rounded-full font-semibold capitalize transition-all ${
                selectedSubject === sub
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                  : "text-[#948FA8] hover:text-white"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks List */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No bookmarked questions"
          description="You haven't bookmarked any questions for this subject yet. You can bookmark questions while taking tests or reviewing solutions."
          actionLabel="View Mock Tests"
          onAction={() => setSelectedSubject("all")}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((item, idx) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-purple-900/30 bg-[#111022] overflow-hidden transition-all duration-150 shadow-xl"
              >
                {/* Collapsible header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#16132D] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-full bg-purple-950/80 border border-purple-500/30 flex items-center justify-center font-bold text-xs text-purple-300">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300">
                          {item.subject_id}
                        </span>
                        <span className="text-xs text-[#948FA8]">
                          {item.question_type === "single_choice" ? "MCQ" : "Numerical"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-white line-clamp-1 mt-1">
                        {item.question_text}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBookmark(item.id);
                      }}
                      className="p-1.5 rounded-full hover:bg-rose-500/15 text-[#7B7593] hover:text-rose-400 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-purple-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#7B7593]" />
                    )}
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t border-purple-900/20 bg-[#0E0D1C] space-y-4 text-xs sm:text-sm">
                    <div className="text-white leading-relaxed whitespace-pre-line">
                      {item.question_text}
                    </div>

                    {item.options && (
                      <div className="space-y-2 pt-2">
                        {item.options.map((opt: string, optIdx: number) => {
                          const isCorrect = optIdx === item.correct_option_index;
                          return (
                            <div
                              key={optIdx}
                              className={`flex items-start gap-3 p-3 rounded-xl border text-xs ${
                                isCorrect
                                  ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-200"
                                  : "border-purple-900/20 bg-[#16132D] text-slate-300"
                              }`}
                            >
                              <span className="h-5 w-5 rounded-full bg-black/40 flex items-center justify-center font-bold text-[10px]">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="flex-1 pt-0.5">{opt}</span>
                              {isCorrect && (
                                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                  Correct Key
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 text-xs space-y-1.5">
                      <div className="font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                        <span>Explanation &amp; Formula:</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {item.solution_text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}