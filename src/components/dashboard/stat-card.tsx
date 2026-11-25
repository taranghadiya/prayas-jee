import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  accentColor?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive,
  accentColor = "text-brand-400 bg-brand-500/10 border-brand-500/20",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-5 shadow-sm transition-all hover:border-slate-700/80">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={cn("p-2 rounded-lg border", accentColor)}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-white font-mono">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "text-xs font-semibold",
              trendPositive ? "text-emerald-400" : "text-rose-400"
            )}
          >
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400 leading-normal">{subtitle}</p>
      )}
    </div>
  );
}
