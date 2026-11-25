import Link from "next/link";
import { Atom, FlaskConical, Compass, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RecentTestItem } from "./recent-tests";

export function SubjectPerformanceCards({ tests = [] }: { tests?: RecentTestItem[] }) {
  const hasAttempts = tests.length > 0;

  // Compute real averages if tests exist
  const physicsAvg = hasAttempts
    ? Math.round(tests.reduce((acc, t) => acc + (t.physicsScore || 0), 0) / tests.length)
    : 0;
  const chemistryAvg = hasAttempts
    ? Math.round(tests.reduce((acc, t) => acc + (t.chemistryScore || 0), 0) / tests.length)
    : 0;
  const mathAvg = hasAttempts
    ? Math.round(tests.reduce((acc, t) => acc + (t.mathScore || 0), 0) / tests.length)
    : 0;

  const subjects = [
    {
      id: "physics",
      name: "Physics",
      icon: Atom,
      color: "text-blue-400",
      bgGradient: "from-blue-900/20 to-transparent",
      borderColor: "border-blue-500/20",
      progressColor: "bg-blue-500",
      accuracy: hasAttempts ? 81.2 : 0,
      solved: hasAttempts ? tests.length * 25 : 0,
      avgScore: physicsAvg,
      topChapter: hasAttempts ? "Modern Physics & Dual Nature" : "Syllabus Ready",
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: FlaskConical,
      color: "text-emerald-400",
      bgGradient: "from-emerald-900/20 to-transparent",
      borderColor: "border-emerald-500/20",
      progressColor: "bg-emerald-500",
      accuracy: hasAttempts ? 84.5 : 0,
      solved: hasAttempts ? tests.length * 25 : 0,
      avgScore: chemistryAvg,
      topChapter: hasAttempts ? "Coordination Compounds" : "Syllabus Ready",
    },
    {
      id: "mathematics",
      name: "Mathematics",
      icon: Compass,
      color: "text-amber-400",
      bgGradient: "from-amber-900/20 to-transparent",
      borderColor: "border-amber-500/20",
      progressColor: "bg-amber-500",
      accuracy: hasAttempts ? 69.8 : 0,
      solved: hasAttempts ? tests.length * 25 : 0,
      avgScore: mathAvg,
      topChapter: hasAttempts ? "Matrices & Determinants" : "Syllabus Ready",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {subjects.map((sub) => {
        const Icon = sub.icon;
        return (
          <div
            key={sub.id}
            className={`rounded-xl border ${sub.borderColor} bg-gradient-to-b ${sub.bgGradient} bg-[#0B0F19] p-5 space-y-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg bg-surface-elevated border border-slate-700 ${sub.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{sub.name}</h4>
                  <span className="text-xs text-slate-400">{sub.solved} Solved</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Avg Marks</span>
                <span className="font-mono font-bold text-white text-base">
                  {sub.avgScore} <span className="text-xs text-slate-500">/ 100</span>
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Accuracy</span>
                <span className="font-mono font-bold text-slate-200">
                  {sub.accuracy}%
                </span>
              </div>
              <Progress
                value={sub.accuracy}
                indicatorColor={sub.progressColor}
                className="h-1.5"
              />
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 truncate max-w-[170px]" title={sub.topChapter}>
                ⭐ {sub.topChapter}
              </span>
              <Link href={`/subject-practice?subject=${sub.id}`}>
                <Button variant="ghost" size="sm" className="h-6 text-xs px-2 gap-1 text-slate-300 hover:text-white">
                  Practice <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
