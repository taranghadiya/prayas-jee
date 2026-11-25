"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Play,
  FileCheck,
  BarChart2,
  Zap,
  LineChart,
  Mouse,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080711] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Background Cosmic Violet Glows */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="border-b border-purple-900/20 bg-[#080711]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl text-purple-400 group-hover:rotate-12 transition-transform duration-200">
              ✦
            </span>
            <span className="font-bold text-xl text-white tracking-tight">
              Prayas
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 text-sm text-[#A5A1B8] font-medium">
            <Link href="/mock-tests" className="hover:text-white transition-colors">
              Mock Tests
            </Link>
            <Link href="/analytics" className="hover:text-white transition-colors">
              Analytics
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link href="#features" className="hover:text-white transition-colors">
              About
            </Link>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                size="pillSm"
                className="border-purple-500/25 bg-[#121124] text-slate-200 hover:text-white hover:border-purple-400/40 text-xs px-5"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="purplePill"
                size="pillSm"
                className="gap-1.5 text-xs px-5 shadow-lg shadow-purple-600/30"
              >
                Get Started <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 py-12 lg:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Dream IIT. <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-300">
                  Prepare Better.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#948FA8] max-w-xl font-normal leading-relaxed pt-2">
                India&apos;s most advanced JEE mock test platform with real exam experience, detailed analytics and personalised insights.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/mock-tests">
                <Button
                  variant="purplePill"
                  className="h-12 px-8 text-sm gap-2 shadow-xl shadow-purple-600/40 hover:shadow-purple-600/60 transition-all"
                >
                  Start Free Mock Test <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="h-12 rounded-full px-6 text-sm border-purple-500/30 bg-[#121124]/80 text-slate-200 hover:text-white gap-2"
                >
                  <div className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* 4 Bottom Feature Badges */}
            <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl border border-purple-900/30 bg-[#121124]/90 backdrop-blur flex items-center gap-3 prayas-card-hover">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <FileCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-slate-300 leading-tight">
                  Real JEE Pattern &amp; Difficulty
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border border-purple-900/30 bg-[#121124]/90 backdrop-blur flex items-center gap-3 prayas-card-hover">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-slate-300 leading-tight">
                  Instant Results &amp; Analysis
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border border-purple-900/30 bg-[#121124]/90 backdrop-blur flex items-center gap-3 prayas-card-hover">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <BarChart2 className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-slate-300 leading-tight">
                  AI-Powered Insights
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border border-purple-900/30 bg-[#121124]/90 backdrop-blur flex items-center gap-3 prayas-card-hover">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <LineChart className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-slate-300 leading-tight">
                  Track Your Progress
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Artwork: Ethereal Classical Sculpture & Cosmic Violet Aura */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Glowing Ring Effect */}
            <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border border-purple-500/40 purple-glow pointer-events-none" />
            <div className="absolute w-[380px] h-[380px] sm:w-[470px] sm:h-[470px] rounded-full border border-indigo-500/20 pointer-events-none animate-pulse" />

            {/* Sculpture / Aspirant Container */}
            <div className="relative z-10 w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-[#1E193F] via-[#100E26] to-[#0A0914] shadow-2xl shadow-purple-900/50 flex items-center justify-center group">
              <img
                src="/images/hero-artwork.jpg"
                alt="Prayas Aspirant"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Violet atmospheric gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080711] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-purple-600/10 to-transparent pointer-events-none" />

              {/* Sparkle badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 backdrop-blur-md text-[11px] font-semibold text-purple-300 flex items-center gap-1.5 shadow-lg">
                <span>✦</span> Prayas CBT Engine
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-12 pb-4 flex items-center justify-center gap-2 text-xs text-[#948FA8]">
          <div className="h-6 w-3.5 rounded-full border border-purple-500/40 flex items-start justify-center p-0.5">
            <div className="h-1.5 w-1 rounded-full bg-purple-400 animate-bounce" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </main>
    </div>
  );
}
