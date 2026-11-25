import * as React from "react";
import { Loader2, AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import { Button } from "./button";

export function LoadingState({
  title = "Loading data...",
  description = "Fetching the latest JEE Main questions and analytics.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-slate-800/80 bg-surface/50">
      <Loader2 className="h-10 w-10 animate-spin text-brand-500 mb-4" />
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-sm">{description}</p>
    </div>
  );
}

export function EmptyState({
  title = "No tests found",
  description = "No items match your selected filters. Try choosing a different subject or class.",
  actionLabel,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-slate-700/80 bg-surface/30">
      <div className="h-12 w-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mb-4">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm" className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "Failed to load examination data. Please check your internet connection and retry.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-rose-900/40 bg-rose-950/10">
      <div className="h-12 w-12 rounded-full bg-rose-900/30 flex items-center justify-center text-rose-400 mb-4">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-sm">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" size="sm" className="mt-5 gap-2">
          <RefreshCw className="h-4 w-4" /> Retry
        </Button>
      )}
    </div>
  );
}
