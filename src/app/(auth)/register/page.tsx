"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [targetYear, setTargetYear] = React.useState("2025");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const emailKey = email.trim().toLowerCase();

    const saveAccountSession = (userId?: string) => {
      const localProfile = {
        id: userId || "usr-" + Date.now(),
        full_name: fullName.trim() || "Aspirant",
        email: emailKey,
        target_year: parseInt(targetYear, 10) || 2025,
        dream_college: "IIT Bombay",
        preferred_language: "English",
        tests_attempted: 0,
        total_questions_solved: 0,
        average_score: 0,
        best_score: 0,
        overall_accuracy: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        // Set active user session
        localStorage.setItem("jee_active_user", emailKey);
        localStorage.setItem("jee_user_profile", JSON.stringify(localProfile));
        localStorage.setItem(`jee_profile_${emailKey}`, JSON.stringify(localProfile));

        // Initialize empty attempts for this specific account if not exists
        if (!localStorage.getItem(`jee_attempts_${emailKey}`)) {
          localStorage.setItem(`jee_attempts_${emailKey}`, JSON.stringify([]));
        }
      }
      router.push("/dashboard");
    };

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: emailKey,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            target_year: parseInt(targetYear, 10),
          },
        },
      });

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes("fetch") || msg.includes("network")) {
          // Offline fallback
          saveAccountSession();
          return;
        }
        setErrorMsg(error.message);
      } else {
        saveAccountSession(data?.user?.id);
      }
    } catch (err: any) {
      saveAccountSession();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-slate-800 bg-[#0B0F19]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">Create Aspirant Account</CardTitle>
        <CardDescription>
          Start your personalized preparation for JEE Main with real-time CBT mock tests.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleRegister}>
        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input
                type="text"
                placeholder="e.g. Aditya Sharma"
                className="pl-9 bg-[#080C14]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input
                type="email"
                placeholder="aspirant@example.com"
                className="pl-9 bg-[#080C14]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  type="password"
                  placeholder="Min 6 chars"
                  className="pl-9 bg-[#080C14]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Year</label>
              <select
                value={targetYear}
                onChange={(e) => setTargetYear(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-slate-700 bg-[#080C14] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <option value="2025">JEE Main 2025</option>
                <option value="2026">JEE Main 2026</option>
                <option value="2027">JEE Main 2027</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Creating Account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center text-xs text-slate-400 pt-0">
          <span>Already registered? </span>
          <Link href="/login" className="ml-1 text-brand-400 font-semibold hover:underline">
            Sign In here
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
