"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCKS_DATA = [
  {
    id: "jee-mock-01",
    title: "JEE Advanced Level Mock #13",
    date: "28 Nov 2026 • 10:00 AM | 3 hrs",
    category: "full_syllabus",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400",
    questions: 75,
    marks: 300,
  },
  {
    id: "jee-mock-02",
    title: "JEE Main All India Open Mock 01",
    date: "02 Dec 2026 • 09:00 AM | 3 hrs",
    category: "all",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400",
    questions: 75,
    marks: 300,
  },
  {
    id: "pyq-2024-jan-27-s1",
    title: "JEE Main 2024 Jan 27 Shift 1 (Official)",
    date: "Official Paper • Jan 2024 | 3 hrs",
    category: "pyq",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
    questions: 75,
    marks: 300,
  },
  {
    id: "sub-physics-01",
    title: "Physics Sectional: Electrodynamics Sprint",
    date: "Sectional Practice | 60 mins",
    category: "subject_wise",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400",
    questions: 25,
    marks: 100,
  },
];

export default function MockTestsPage() {
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const filtered = MOCKS_DATA.filter((m) => {
    const matchesFilter = filter === "all" || m.category === filter;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-serif text-white tracking-tight">
          Mock Tests
        </h1>
        <p className="text-sm text-[#948FA8]">
          Take tests that match the real JEE exam.
        </p>
      </div>

      {/* Filter Tabs matching Screen 5 in the reference image */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Tests" },
            { id: "subject_wise", label: "Subject-wise" },
            { id: "pyq", label: "Previous Year" },
            { id: "full_syllabus", label: "Full Syllabus" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                filter === tab.id
                  ? "bg-[#7C3AED] text-white shadow-md shadow-purple-600/30"
                  : "bg-[#14122B] text-[#948FA8] hover:text-white border border-purple-900/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search mocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 rounded-full bg-[#131127] border border-purple-900/30 px-4 text-xs text-white placeholder-[#7B7593] focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* Mock Test Cards Grid */}
      <div className="space-y-4">
        {filtered.map((test) => (
          <div
            key={test.id}
            className="rounded-2xl border border-purple-900/25 bg-[#111022] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 prayas-card-hover group"
          >
            <div className="flex items-center gap-5">
              {/* Thumbnail image */}
              <div className="w-24 sm:w-32 h-20 rounded-xl overflow-hidden border border-purple-500/20 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={test.image}
                  alt={test.title}
                  className="w-full h-full object-cover brightness-95"
                />
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-purple-300 transition-colors">
                  {test.title}
                </h3>
                <div className="text-xs text-[#948FA8] flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-purple-400" />
                  <span>{test.date}</span>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="shrink-0">
              <Link href={`/exam/${test.id}/instructions`}>
                <Button
                  variant="purplePill"
                  className="w-full sm:w-auto text-xs px-6 font-bold gap-2 shadow-lg shadow-purple-600/30"
                >
                  Start Test <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
