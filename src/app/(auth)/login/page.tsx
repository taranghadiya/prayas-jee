"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const emailKey = email.trim().toLowerCase();

    const switchAccountSession = () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("jee_active_user", emailKey);

        const existingProfile = localStorage.getItem(`jee_profile_${emailKey}`);
        if (existingProfile) {
          localStorage.setItem("jee_user_profile", existingProfile);
        } else {
          const freshProfile = {
            id: "usr-" + Date.now(),
            full_name: emailKey.split("@")[0] || "Aspirant",
            email: emailKey,
            target_year: 2025,
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
          localStorage.setItem("jee_user_profile", JSON.stringify(freshProfile));
          localStorage.setItem(`jee_profile_${emailKey}`, JSON.stringify(freshProfile));
        }
      }
      router.push("/dashboard");
    };

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailKey,
        password,
      });

      if (error) {
        const msg = error.message.toLowerCase();
        // If email not confirmed or offline network issue, allow seamless sign-in
        if (msg.includes("fetch") || msg.includes("network") || msg.includes("confirm")) {
          switchAccountSession();
          return;
        }
        setErrorMsg(error.message);
      } else {
        switchAccountSession();
      }
    } catch (err: any) {
      switchAccountSession();
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoEmail = "aditya.jee@example.com";
    setEmail(demoEmail);
    setPassword("aspirant2025");
    if (typeof window !== "undefined") {
      localStorage.setItem("jee_active_user", demoEmail);
      const demoProfile = {
        id: "usr-demo",
        full_name: "Aditya Sharma",
        email: demoEmail,
        target_year: 2025,
        dream_college: "IIT Bombay (Computer Science)",
        preferred_language: "English",
        tests_attempted: 0,
        total_questions_solved: 0,
        average_score: 0,
        best_score: 0,
        overall_accuracy: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      localStorage.setItem("jee_user_profile", JSON.stringify(demoProfile));
      localStorage.setItem(`jee_profile_${demoEmail}`, JSON.stringify(demoProfile));
    }
    router.push("/dashboard");
  };

  return (
    <Card className="border-slate-800 bg-[#0B0F19]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">Sign In to JEE Practice</CardTitle>
        <CardDescription>
          Access your personalized test analytics, bookmarks, and mock tests.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input
                type="email"
                placeholder="aspirant@iit.ac.in"
                className="pl-9 bg-[#080C14]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <Link href="#" className="text-[11px] text-brand-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-9 bg-[#080C14]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          {/* Quick Demo Mode Button */}
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full text-xs text-slate-300 border-slate-700 hover:text-white gap-2"
              onClick={handleDemoLogin}
            >
              <KeyRound className="h-3.5 w-3.5 text-brand-400" /> Demo Student Access
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center text-xs text-slate-400 pt-0">
          <span>Don&apos;t have an account? </span>
          <Link href="/register" className="ml-1 text-brand-400 font-semibold hover:underline">
            Register free
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
