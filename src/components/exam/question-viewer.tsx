import * as React from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Bookmark, BookmarkCheck } from "lucide-react";
import { ExamQuestionState } from "@/lib/types/exam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuestionViewerProps {
  questionState: ExamQuestionState;
  onOptionSelect: (optionIndex: number) => void;
  onNumericalChange: (val: string) => void;
  onClearResponse: () => void;
  onSaveAndNext: () => void;
  onPrevious?: () => void;
  onSaveAndMarkForReview?: () => void;
  onMarkForReviewAndNext: () => void;
  onToggleBookmark: () => void;
}

export function QuestionViewer({
  questionState,
  onOptionSelect,
  onNumericalChange,
  onClearResponse,
  onSaveAndNext,
  onPrevious,
  onSaveAndMarkForReview,
  onMarkForReviewAndNext,
  onToggleBookmark,
}: QuestionViewerProps) {
  const { question, orderNumber, selectedOption, numericalAnswer, isBookmarked } = questionState;
  const isMcq = question.question_type === "single_choice";

  return (
    <div className="flex flex-col h-full justify-between bg-[#111022] rounded-3xl border border-purple-900/25 p-6 shadow-xl">
      {/* Top Question Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-900/20">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-white">Question</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-600/15 border border-purple-500/30 text-purple-300 capitalize">
            {questionState.subjectId}
          </span>
        </div>

        <button
          onClick={onToggleBookmark}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
            isBookmarked
              ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
              : "border-purple-900/30 text-[#948FA8] hover:text-white"
          }`}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-3.5 w-3.5" />
          ) : (
            <Bookmark className="h-3.5 w-3.5" />
          )}
          <span>{isBookmarked ? "Saved" : "Save"}</span>
        </button>
      </div>

      {/* Main Question Content */}
      <div className="flex-1 overflow-y-auto py-5 space-y-6">
        <div className="text-base sm:text-lg text-slate-100 leading-relaxed font-sans question-formula whitespace-pre-line">
          {question.question_text}
        </div>

        {/* Mathematical Graph / Coordinate Box Preview */}
        <div className="my-4 p-4 rounded-2xl border border-purple-900/30 bg-[#0A0915] max-w-md mx-auto flex items-center justify-center">
          <svg className="w-64 h-32" viewBox="0 0 250 120" fill="none">
            {/* Coordinate Axes */}
            <line x1="125" y1="10" x2="125" y2="110" stroke="#332F52" strokeWidth="1.5" />
            <line x1="10" y1="60" x2="240" y2="60" stroke="#332F52" strokeWidth="1.5" />
            {/* Parabolic / Curve Plot in Purple */}
            <path
              d="M 40 100 Q 125 15 210 100"
              stroke="#8B5CF6"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Focal Point Indicator */}
            <circle cx="125" cy="57" r="3.5" fill="#C084FC" />
          </svg>
        </div>

        {/* Options for MCQ */}
        {isMcq && question.options && (
          <div className="space-y-3 pt-2">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const optionLetter = String.fromCharCode(65 + idx);

              return (
                <button
                  key={idx}
                  onClick={() => onOptionSelect(idx)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl border text-left transition-all duration-150 ${
                    isSelected
                      ? "bg-[#1C1738] border-purple-500 text-white purple-glow-sm ring-1 ring-purple-500"
                      : "bg-[#0A0914] border-purple-900/25 text-[#A5A1B8] hover:border-purple-600/40 hover:bg-[#15122B] hover:text-white"
                  }`}
                >
                  <span
                    className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-[#181530] text-[#7B7593] border border-purple-900/30"
                    }`}
                  >
                    {optionLetter}
                  </span>
                  <span className="text-sm font-medium pt-0.5 question-formula">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Numerical Input */}
        {!isMcq && (
          <div className="pt-2 max-w-sm space-y-3">
            <label className="text-xs font-semibold text-[#948FA8] uppercase tracking-wider block">
              Enter Numerical Answer:
            </label>
            <Input
              type="number"
              step="any"
              placeholder="e.g. 42 or 3.14"
              value={numericalAnswer}
              onChange={(e) => onNumericalChange(e.target.value)}
              className="h-12 bg-[#0A0914] border-purple-900/40 text-white font-mono text-base rounded-2xl focus:border-purple-500"
            />
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="border-t border-purple-900/20 pt-4 flex flex-wrap items-center justify-between gap-3">
        {/* Left Actions */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="pillSm"
            onClick={onClearResponse}
            className="text-xs border-purple-900/30 text-[#948FA8] hover:text-white"
          >
            Clear Response
          </Button>

          <Button
            type="button"
            variant="outline"
            size="pillSm"
            onClick={onMarkForReviewAndNext}
            className="text-xs border-purple-900/30 text-[#948FA8] hover:text-white"
          >
            Mark for Review
          </Button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {onPrevious && (
            <Button
              type="button"
              variant="outline"
              size="pillSm"
              onClick={onPrevious}
              className="text-xs border-purple-900/30 text-[#948FA8] hover:text-white gap-1"
            >
              <ArrowLeft className="h-3 w-3" /> Previous
            </Button>
          )}

          <Button
            type="button"
            variant="purplePill"
            size="pillSm"
            onClick={onSaveAndNext}
            className="text-xs px-6 font-bold gap-1 shadow-lg shadow-purple-600/30"
          >
            Next <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
