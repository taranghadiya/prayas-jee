import Link from "next/link";
import { Target } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-[#080C14] py-8 text-sm text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-brand-600 flex items-center justify-center text-white">
            <Target className="h-4 w-4" />
          </div>
          <span className="font-semibold text-slate-300">JEE Practice</span>
          <span>&copy; {new Date().getFullYear()} National CBT Simulation Engine.</span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <Link href="/mock-tests" className="hover:text-slate-300">
            Mock Tests
          </Link>
          <Link href="/pyq" className="hover:text-slate-300">
            PYQ Papers
          </Link>
          <Link href="/chapter-practice" className="hover:text-slate-300">
            Syllabus
          </Link>
          <Link href="/profile" className="hover:text-slate-300">
            Student Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
