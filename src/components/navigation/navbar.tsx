"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const pathname = usePathname();
  const isExamLive = pathname.includes("/live");

  if (isExamLive) {
    return null; // Exam has dedicated CBT header
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-purple-900/20 bg-[#080711]/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="rounded-xl p-2 text-[#948FA8] hover:bg-[#1A1735] hover:text-white"
              aria-label="Toggle Navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Link href="/dashboard" className="flex items-center gap-1.5">
            <span className="text-purple-400 font-bold text-lg">✦</span>
            <span className="font-bold text-base text-white">Prayas</span>
          </Link>
        </div>

        {/* Center Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#7B7593]" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full h-9 rounded-full bg-[#131127] border border-purple-900/30 pl-10 pr-4 text-xs text-white placeholder-[#7B7593] focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Right Actions: Notifications & Avatar */}
        <div className="flex items-center gap-4">
          <button
            className="relative rounded-full p-2 text-[#948FA8] hover:bg-[#1A1735] hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/80" />
          </button>

          <Link href="/profile" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-purple-900/40 group-hover:scale-105 transition-transform overflow-hidden border border-purple-500/30">
              <img
                src="/images/hero-artwork.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
