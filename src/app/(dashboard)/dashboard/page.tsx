"use client";

import * as React from "react";
import Link from "next/link";
import {
  Trophy,
  BarChart2,
  Clock,
  ArrowRight,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const [profile, setProfile] = React.useState({
    full_name: "Tarang",
  });
  const [recentTests, setRecentTests] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const activeUser = localStorage.getItem("jee_active_user") || "";
      const storedProfile = activeUser
        ? localStorage.getItem(`jee_profile_${activeUser}`) || localStorage.getItem("jee_user_profile")
        : localStorage.getItem("jee_user_profile");

      if (storedProfile) {
        try {
          const parsed = JSON.parse(storedProfile);
          if (parsed.full_name) {
            setProfile(parsed);
          }
        } catch {}
      }

      // Load attempts
      const userAttemptsStr = activeUser ? localStorage.getItem(`jee_attempts_${activeUser}`) : localStorage.getItem("jee_test_attempts");
      if (userAttemptsStr) {
        try {
          const parsed = JSON.parse(userAttemptsStr);
          if (Array.isArray(parsed)) setRecentTests(parsed);
        } catch {}
      }
    }
  }, []);

  const totalTests = recentTests.length;
  const highestScore = totalTests > 0 ? Math.max(...recentTests.map((t) => t.score || 0)) : 94.5;
  const progressPercent = totalTests > 0 ? Math.min(100, Math.round((totalTests / 15) * 100)) : 72;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Greeting Title */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Good Evening, {profile.full_name}!
        </h1>
        <p className="text-sm text-[#948FA8] flex items-center gap-1.5">
          <span>Keep going, your hard work is paying off.</span>
          <TrendingUp className="h-4 w-4 text-purple-400 inline" />
        </p>
      </div>

      {/* Top Row: Hero Next Mock + Your Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Next Mock Banner Card */}
        <div className="lg:col-span-8 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-[#171330] via-[#120F26] to-[#120F26] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl shadow-purple-950/30 overflow-hidden relative group">
          <div className="space-y-4 z-10 max-w-sm">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider block">
              Your Next Mock Test
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              JEE Advanced Level Mock
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#948FA8]">
              <Calendar className="h-3.5 w-3.5 text-purple-400" />
              <span>28 Nov 2026 • 10:00 AM</span>
            </div>
            <div className="pt-2">
              <Link href="/exam/jee-mock-01/instructions">
                <Button
                  variant="whitePill"
                  className="px-6 py-2.5 h-10 text-xs font-bold gap-2 text-[#080711] hover:bg-slate-100 shadow-md"
                >
                  Start Test <ArrowRight className="h-3.5 w-3.5 text-[#080711]" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Architectural Campus Building Thumbnail */}
          <div className="sm:w-64 h-36 rounded-xl overflow-hidden border border-purple-500/20 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600"
              alt="Campus Architecture"
              className="w-full h-full object-cover brightness-90 contrast-110"
            />
          </div>
        </div>

        {/* Your Progress Card */}
        <div className="lg:col-span-4 rounded-2xl border border-purple-900/30 bg-[#111022] p-6 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#948FA8]">Your Progress</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                +8% ↑
              </span>
            </div>

            <div className="text-4xl font-extrabold font-sans text-white tracking-tight">
              {progressPercent}%
            </div>

            <Progress
              value={progressPercent}
              indicatorColor="bg-gradient-to-r from-purple-500 to-indigo-500"
              className="h-2 bg-[#1C1838]"
            />
          </div>

          <p className="text-xs text-[#7B7593]">
            Compared to last month
          </p>
        </div>
      </div>

      {/* Middle Row: 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Stat 1 */}
        <div className="rounded-2xl border border-purple-900/25 bg-[#111022] p-6 space-y-2 prayas-card-hover">
          <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Trophy className="h-5 w-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-sans text-white pt-1">
            {totalTests > 0 ? totalTests : "12"}
          </div>
          <div className="text-xs text-[#948FA8]">Tests Attempted</div>
        </div>

        {/* Stat 2 */}
        <div className="rounded-2xl border border-purple-900/25 bg-[#111022] p-6 space-y-2 prayas-card-hover">
          <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <BarChart2 className="h-5 w-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-sans text-white pt-1">
            {highestScore}
          </div>
          <div className="text-xs text-[#948FA8]">Highest Score</div>
        </div>

        {/* Stat 3 */}
        <div className="rounded-2xl border border-purple-900/25 bg-[#111022] p-6 space-y-2 prayas-card-hover">
          <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Clock className="h-5 w-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-sans text-white pt-1">
            1h 24m
          </div>
          <div className="text-xs text-[#948FA8]">Avg Time</div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity & Top Rankers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Activity */}
        <div className="lg:col-span-8 rounded-2xl border border-purple-900/25 bg-[#111022] p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-purple-900/20">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              <h3 className="font-semibold text-white text-base">Recent Activity</h3>
            </div>
            <Link href="/analytics" className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentTests.length > 0 ? (
              recentTests.slice(0, 3).map((t, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-purple-900/20 bg-[#16132D]/70 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {t.title}
                      </div>
                      <div className="text-xs text-[#948FA8]">
                        Score: {t.score}/300 • {t.date}
                      </div>
                    </div>
                  </div>
                  <Link href={`/exam/${t.testId || "jee-mock-01"}/result/${t.id}`}>
                    <Button variant="outline" size="sm" className="text-xs h-8 border-purple-500/30">
                      Report
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl border border-purple-900/20 bg-[#16132D]/70 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    ✦
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      Mock Test Completed - JEE Advanced Pattern
                    </div>
                    <div className="text-xs text-[#948FA8]">
                      Score: 92/120 • 2 hours ago
                    </div>
                  </div>
                </div>
                <Link href="/mock-tests">
                  <Button variant="ghost" size="sm" className="text-xs text-purple-400 hover:text-white">
                    View
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Top Rankers Leaderboard */}
        <div className="lg:col-span-4 rounded-2xl border border-purple-900/25 bg-[#111022] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-purple-900/20">
            <Crown className="h-4 w-4 text-amber-400 fill-amber-400" />
            <h3 className="font-semibold text-white text-base">Top Rankers</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#15132B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-amber-400">1</span>
                <span className="text-white font-medium">Aryan Sharma</span>
              </div>
              <span className="font-mono font-bold text-purple-300">99.8%</span>
            </div>

            <div className="p-3 rounded-xl bg-[#15132B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-400">2</span>
                <span className="text-white font-medium">Diya Mehta</span>
              </div>
              <span className="font-mono font-bold text-purple-300">99.7%</span>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-purple-400">3</span>
                <span className="text-purple-200 font-bold">You ({profile.full_name})</span>
              </div>
              <span className="font-mono font-bold text-emerald-400">96.4%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
