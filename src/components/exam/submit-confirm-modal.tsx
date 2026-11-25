import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ExamQuestionState, SubjectId } from "@/lib/types/exam";

interface SubmitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  questions: ExamQuestionState[];
  isSubmitting?: boolean;
}

export function SubmitConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  questions,
  isSubmitting = false,
}: SubmitConfirmModalProps) {
  // Aggregate stats per subject
  const subjects: { id: SubjectId; name: string }[] = [
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "mathematics", name: "Mathematics" },
  ];

  const getSubjectStats = (subjectId: SubjectId) => {
    const list = questions.filter((q) => q.subjectId === subjectId);
    return {
      total: list.length,
      answered: list.filter((q) => q.status === "answered" || q.status === "answered_and_marked").length,
      notAnswered: list.filter((q) => q.status === "not_answered").length,
      markedReview: list.filter((q) => q.status === "marked_for_review" || q.status === "answered_and_marked").length,
      notVisited: list.filter((q) => q.status === "not_visited").length,
    };
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Examination Submission Summary"
      description="Please verify your responses before final submission. Once submitted, you cannot change your answers."
      className="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Summary Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#090D17] text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Section / Subject</th>
                <th className="p-3 text-center">Total</th>
                <th className="p-3 text-center text-emerald-400">Answered</th>
                <th className="p-3 text-center text-rose-400">Not Answered</th>
                <th className="p-3 text-center text-purple-400">Marked Review</th>
                <th className="p-3 text-center text-slate-400">Not Visited</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {subjects.map((sub) => {
                const stats = getSubjectStats(sub.id);
                return (
                  <tr key={sub.id} className="hover:bg-surface-elevated/40">
                    <td className="p-3 text-white font-semibold">{sub.name}</td>
                    <td className="p-3 text-center text-slate-300">{stats.total}</td>
                    <td className="p-3 text-center font-bold text-emerald-400">{stats.answered}</td>
                    <td className="p-3 text-center text-rose-400">{stats.notAnswered}</td>
                    <td className="p-3 text-center text-purple-400">{stats.markedReview}</td>
                    <td className="p-3 text-center text-slate-500">{stats.notVisited}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Warning Alert */}
        <div className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/10 text-xs text-amber-200 leading-relaxed">
          <strong>Important Note:</strong> Questions marked as <em>&quot;Answered &amp; Marked for Review&quot;</em> will be evaluated as per official NTA guidelines.
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-xs"
          >
            Return to Test
          </Button>

          <Button
            type="button"
            variant="default"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs"
          >
            {isSubmitting ? "Submitting Evaluation..." : "Yes, Submit Test"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
