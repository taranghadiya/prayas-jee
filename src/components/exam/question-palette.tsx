import { ExamQuestionState } from "@/lib/types/exam";
import { cn } from "@/lib/utils";

interface QuestionPaletteProps {
  questions: ExamQuestionState[];
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
}

export function QuestionPalette({
  questions,
  currentQuestionIndex,
  onSelectQuestion,
}: QuestionPaletteProps) {
  return (
    <div className="p-5 flex flex-col justify-between h-full space-y-6">
      <div>
        <div className="mb-4 flex items-center justify-between text-xs font-semibold text-[#A5A1B8]">
          <span className="text-white text-sm font-bold">Question Palette</span>
          <span>{questions.length} Questions</span>
        </div>

        {/* 5-column grid */}
        <div className="grid grid-cols-5 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const isAnswered = q.status === "answered" || q.status === "answered_and_marked";
            const isMarked = q.status === "marked_for_review";

            let styleClass = "bg-[#181530] text-[#948FA8] border-purple-900/30";

            if (isCurrent) {
              styleClass = "bg-[#7C3AED] text-white border-purple-400 purple-glow-sm font-extrabold scale-105 z-10";
            } else if (isAnswered) {
              styleClass = "bg-emerald-600/90 text-white border-emerald-500/50 font-bold";
            } else if (isMarked) {
              styleClass = "bg-purple-900/60 text-purple-300 border-purple-600/40 font-bold";
            }

            return (
              <button
                key={q.question.id || idx}
                onClick={() => onSelectQuestion(idx)}
                className={cn(
                  "h-10 w-full rounded-xl text-xs flex items-center justify-center transition-all duration-150 border",
                  styleClass
                )}
              >
                {q.orderNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Palette Legend */}
      <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-purple-900/20 text-[11px] text-[#A5A1B8]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500 shrink-0" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#7C3AED] shrink-0" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-purple-900 border border-purple-500 shrink-0" />
          <span>Marked</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#181530] border border-purple-900/40 shrink-0" />
          <span>Not Answered</span>
        </div>
      </div>
    </div>
  );
}
