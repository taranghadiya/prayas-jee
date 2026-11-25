"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const pathname = usePathname();
  const isExamLive = pathname.includes("/live");

  const [userName, setUserName] = React.useState<string>("Tarang");
  const [initial, setInitial] = React.useState<string>("T");
  const [showPhoto, setShowPhoto] = React.useState<boolean>(true);

  React.useEffect(() => {
    const syncUser = () => {
      if (typeof window !== "undefined") {
        const activeUser = localStorage.getItem("jee_active_user") || "";
        let profile: any = null;

        if (activeUser) {
          const scopedStr = localStorage.getItem(`jee_profile_${activeUser}`);
          if (scopedStr) {
            try {
              profile = JSON.parse(scopedStr);
            } catch {}
          }
        }

        if (!profile) {
          const globalStr = localStorage.getItem("jee_user_profile");
          if (globalStr) {
            try {
              profile = JSON.parse(globalStr);
            } catch {}
          }
        }

        const name = profile?.full_name || (activeUser ? activeUser.split("@")[0] : "Tarang");
        const formatted = name.charAt(0).toUpperCase() + name.slice(1);
        setUserName(formatted);
        setInitial(formatted.charAt(0).toUpperCase());

        // Only show hero photo if user is Tarang or default, otherwise show clean letter avatar
        const isTarang =
          !activeUser ||
          activeUser.toLowerCase().includes("tarang") ||
          name.toLowerCase().includes("tarang");
        setShowPhoto(isTarang);
      }
    };

    syncUser();
    window.addEventListener("jee_profile_updated", syncUser);
    return () => window.removeEventListener("jee_profile_updated", syncUser);
  }, []);

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

          <Link href="/profile" className="flex items-center gap-2 group" title={`Profile: ${userName}`}>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-purple-900/40 group-hover:scale-105 transition-transform overflow-hidden border border-purple-500/30">
              {showPhoto ? (
                <img
                  src="/images/hero-artwork.jpg"
                  alt={userName}
                  className="w-full h-full object-cover"
                  onError={() => setShowPhoto(false)}
                />
              ) : (
                <span>{initial}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
