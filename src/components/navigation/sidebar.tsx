"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Trophy,
  CalendarDays,
  Settings,
  Crown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mock Tests", href: "/mock-tests", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Leaderboard", href: "/dashboard", icon: Trophy },
  { name: "Study Plan", href: "/chapter-practice", icon: CalendarDays },
  { name: "Settings", href: "/profile", icon: Settings },
];

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-purple-900/20 bg-[#0A0914] transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto flex flex-col justify-between p-5",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-8">
          {/* Brand Logo in Sidebar */}
          <Link href="/dashboard" className="flex items-center gap-2 px-2 pt-2 group">
            <span className="text-xl text-purple-400 group-hover:rotate-12 transition-transform duration-200">
              ✦
            </span>
            <span className="font-bold text-xl text-white tracking-tight">
              Prayas
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#1E1A3D] text-purple-300 font-semibold shadow-inner border border-purple-500/20"
                      : "text-[#948FA8] hover:bg-[#15132B] hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-purple-400" : "text-[#7B7593]"
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pro Plan Bottom Card */}
        <div className="rounded-2xl border border-purple-500/25 bg-gradient-to-b from-[#1C1738] to-[#120F26] p-4 text-xs space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Crown className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-white">You&apos;re on Pro Plan</span>
          </div>
          <p className="text-[11px] text-[#948FA8] leading-tight">
            Valid till 31 Dec 2026
          </p>
          <Button
            variant="purplePill"
            size="sm"
            className="w-full text-xs h-8 shadow-md"
          >
            Upgrade
          </Button>
        </div>
      </aside>
    </>
  );
}
