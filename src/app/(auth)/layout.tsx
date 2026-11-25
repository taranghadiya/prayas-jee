import Link from "next/link";
import { Target } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080C14] flex flex-col justify-center items-center p-4">
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="h-10 w-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:bg-brand-500 transition-colors">
          <Target className="h-6 w-6" />
        </div>
        <span className="font-bold text-xl text-white tracking-tight">
          JEE Practice
        </span>
      </Link>

      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
