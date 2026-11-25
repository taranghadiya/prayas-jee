import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/status-states";

export interface RecentTestItem {
  id: string;
  testId: string;
  title: string;
  date: string;
  score: number;
  maxScore: number;
  physicsScore: number;
  chemistryScore: number;
  mathScore: number;
  accuracy: number;
  percentile: number;
  timeTaken: number;
  status: string;
}

export function RecentTestsTable({ tests }: { tests: RecentTestItem[] }) {
  if (tests.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-[#0B0F19] overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h3 className="font-semibold text-white text-base">Recent Test History</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Detailed performance breakdown from your completed mock tests
            </p>
          </div>
          <Link href="/mock-tests">
            <Button size="sm" className="bg-brand-600 hover:bg-brand-500 text-xs">
              Take Mock Test
            </Button>
          </Link>
        </div>

        <div className="p-6">
          <EmptyState
            title="No Tests Attempted Yet"
            description="You haven't attempted any mock tests or previous year papers yet. Start your first mock test to unlock your score analysis, accuracy breakdown, and All-India percentile prediction."
            actionLabel="Start Full Mock Test"
            onAction={() => {
              window.location.href = "/mock-tests";
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0B0F19] overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-slate-800">
        <div>
          <h3 className="font-semibold text-white text-base">Recent Test History</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Detailed performance breakdown from your completed mock tests
          </p>
        </div>
        <Link href="/analytics">
          <Button variant="ghost" size="sm" className="text-xs text-brand-400 gap-1">
            Full Analytics <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#090D17] text-slate-400 border-b border-slate-800 font-semibold">
            <tr>
              <th className="p-4">Test Title</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Score</th>
              <th className="p-4 text-center hidden md:table-cell">Subject Split (P / C / M)</th>
              <th className="p-4 text-center">Accuracy</th>
              <th className="p-4 text-center">Percentile</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {tests.map((t) => (
              <tr key={t.id} className="hover:bg-surface-elevated/30 transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-white text-sm">{t.title}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Completed</span>
                  </div>
                </td>
                <td className="p-4 text-center text-slate-400 font-mono">{t.date}</td>
                <td className="p-4 text-center">
                  <span className="font-mono font-bold text-white text-sm">
                    {t.score}
                  </span>
                  <span className="text-slate-500 text-[11px]"> / {t.maxScore}</span>
                </td>
                <td className="p-4 text-center hidden md:table-cell">
                  <div className="inline-flex items-center gap-2 font-mono text-xs">
                    <span className="text-blue-400 font-medium">P: {t.physicsScore}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-emerald-400 font-medium">C: {t.chemistryScore}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-amber-400 font-medium">M: {t.mathScore}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <Badge variant={t.accuracy >= 80 ? "success" : "warning"}>
                    {t.accuracy}%
                  </Badge>
                </td>
                <td className="p-4 text-center font-mono font-bold text-brand-400">
                  {t.percentile} %ile
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/exam/${t.testId}/result/${t.id}`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">
                        Report
                      </Button>
                    </Link>
                    <Link href={`/exam/${t.testId}/analysis/${t.id}`}>
                      <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5">
                        Solutions
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
