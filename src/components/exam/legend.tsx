import { ExamSummary } from "@/lib/types/exam";

interface LegendProps {
  summary: ExamSummary;
}

export function ExamLegend({ summary }: LegendProps) {
  const items = [
    {
      count: summary.answered,
      label: "Answered",
      badgeStyle: "bg-emerald-600 text-white",
    },
    {
      count: summary.notAnswered,
      label: "Not Answered",
      badgeStyle: "bg-rose-600 text-white",
    },
    {
      count: summary.notVisited,
      label: "Not Visited",
      badgeStyle: "bg-slate-700 text-slate-200 border border-slate-600",
    },
    {
      count: summary.markedForReview,
      label: "Marked for Review",
      badgeStyle: "bg-purple-600 text-white",
    },
    {
      count: summary.answeredAndMarkedForReview,
      label: "Ans & Marked for Review (Evaluated)",
      badgeStyle:
        "bg-purple-600 text-white relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:bg-emerald-400 after:rounded-full",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 p-3 text-xs border-b border-slate-800 bg-[#0B0F19]">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-2 ${
            idx === 4 ? "col-span-2 pt-1 border-t border-slate-800/60" : ""
          }`}
        >
          <span
            className={`h-6 w-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${item.badgeStyle}`}
          >
            {item.count}
          </span>
          <span className="text-[11px] text-slate-300 font-medium leading-tight">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
