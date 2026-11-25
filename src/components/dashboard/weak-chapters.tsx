import Link from "next/link";
import { AlertCircle, Target, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface WeakChapter {
  chapterId: string;
  chapterName: string;
  subject: string;
  accuracy: number;
  incorrectCount: number;
  recommendedAction: string;
}

export function WeakChaptersList({ chapters }: { chapters: WeakChapter[] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">Weak Chapters Detected</h3>
            <p className="text-xs text-slate-400">Chapters with lowest accuracy across recent tests</p>
          </div>
        </div>
        <Link href="/chapter-practice">
          <Button variant="ghost" size="sm" className="text-xs text-brand-400">
            All Chapters
          </Button>
        </Link>
      </div>

      {chapters.length === 0 ? (
        <div className="p-6 text-center space-y-3">
          <div className="h-10 w-10 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 mx-auto flex items-center justify-center">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-sm font-semibold text-white">Diagnostic Engine Inactive</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Take at least one mock test or chapter practice. The diagnostic engine will analyze your negative marking patterns and list your weak areas here with recommendations.
          </p>
          <Link href="/mock-tests">
            <Button variant="outline" size="sm" className="text-xs text-brand-400 border-slate-700">
              Start Test to Diagnose
            </Button>
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-800/60 mt-2">
          {chapters.map((ch) => (
            <div key={ch.chapterId} className="py-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-brand-400 mr-2">
                    [{ch.subject}]
                  </span>
                  <span className="text-sm font-medium text-slate-200">
                    {ch.chapterName}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-rose-400">
                  {ch.accuracy}% Accuracy
                </span>
              </div>

              <Progress
                value={ch.accuracy}
                indicatorColor="bg-rose-500"
                className="h-1.5 bg-slate-800"
              />

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-400 text-[11px] leading-tight">
                  💡 {ch.recommendedAction}
                </span>
                <Link href={`/chapter-practice?chapter=${ch.chapterId}`}>
                  <Button variant="outline" size="sm" className="h-6 text-[11px] px-2 gap-1 text-brand-400 border-slate-700">
                    Drill <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
