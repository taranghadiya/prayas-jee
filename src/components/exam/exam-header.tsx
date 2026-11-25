import { Clock, Pause, Sparkles } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ExamHeaderProps {
  testTitle: string;
  timeRemainingSeconds: number;
  currentNumber?: number;
  totalQuestions?: number;
  isMarkedForReview?: boolean;
  onToggleMarkForReview?: () => void;
  onSubmitClick: () => void;
}

export function ExamHeader({
  testTitle,
  timeRemainingSeconds,
  currentNumber = 12,
  totalQuestions = 90,
  isMarkedForReview = false,
  onToggleMarkForReview,
  onSubmitClick,
}: ExamHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-900/20 bg-[#080711]/95 backdrop-blur-md px-6 py-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand & Test Name */}
        <div className="flex items-center gap-3">
          <span className="text-xl text-purple-400">✦</span>
          <span className="font-bold text-base text-white tracking-tight">
            Prayas
          </span>
          <span className="text-slate-600 font-light">|</span>
          <span className="text-xs sm:text-sm font-medium text-[#A5A1B8]">
            {testTitle}
          </span>
        </div>

        {/* Center: Timer Capsule & Pause */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-purple-500/30 bg-[#141029] font-mono text-sm sm:text-base font-bold text-purple-200 shadow-sm shadow-purple-900/40">
            <Clock className="h-4 w-4 text-purple-400" />
            <span>{formatTime(timeRemainingSeconds)}</span>
          </div>

          <button
            onClick={() => {}}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-900/30 bg-[#121124] text-xs font-medium text-[#A5A1B8] hover:text-white hover:border-purple-500/40 transition-colors"
          >
            <Pause className="h-3.5 w-3.5" />
            <span>Pause</span>
          </button>
        </div>

        {/* Right: Question Counter & Mark for Review toggle */}
        <div className="flex items-center gap-4">
          <span className="text-xs sm:text-sm font-bold text-white">
            Question {currentNumber} / {totalQuestions}
          </span>

          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#A5A1B8] hover:text-white">
            <input
              type="checkbox"
              checked={isMarkedForReview}
              onChange={onToggleMarkForReview}
              className="h-3.5 w-3.5 rounded border-purple-500/40 bg-[#121124] text-purple-600 focus:ring-purple-500"
            />
            <span>Mark for Review</span>
          </label>

          <Button
            onClick={onSubmitClick}
            variant="purplePill"
            size="pillSm"
            className="text-xs"
          >
            Submit
          </Button>
        </div>
      </div>
    </header>
  );
}
