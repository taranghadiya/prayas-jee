"use client";

import * as React from "react";
import Link from "next/link";
import { FlaskConical, Atom, Compass, Clock, Award, ArrowRight, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubjectPracticePage() {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
          Subject-Wise Sectional Tests
        </h1>
        <p className="text-sm text-[#948FA8] mt-1">
          Strengthen individual subject speed and confidence with 60-minute / 25-question sectional examinations.
        </p>
      </div>

      {/* 3 Core Subject Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Physics */}
        <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-6 flex flex-col justify-between shadow-xl hover:border-purple-600/50 transition-all duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-purple-950/60 text-purple-400 border border-purple-500/30">
                <Atom className="h-6 w-6" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30">
                1,540 Qs
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Physics</h2>
              <p className="text-xs text-[#948FA8] mt-1 leading-relaxed">
                Mechanics, Electrodynamics, Modern Physics, Wave Optics &amp; Thermal Physics.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-[#948FA8]">
                <span>Subject Mastery</span>
                <span className="font-mono font-bold text-purple-300">81.2%</span>
              </div>
              <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full w-[81.2%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#17142F] border border-purple-900/30 text-xs space-y-1.5">
              <div className="font-semibold text-white">Next Sectional Sprint:</div>
              <div className="text-[#948FA8] flex items-center justify-between">
                <span>Electrodynamics &amp; Optics</span>
                <span className="font-mono text-purple-300">25 Qs / 60m</span>
              </div>
            </div>
          </div>

          <Link href="/exam/sub-physics-01/instructions" className="w-full pt-2">
            <Button variant="purplePill" className="w-full text-xs font-semibold gap-1.5">
              <Zap className="h-4 w-4" /> Start Physics Test
            </Button>
          </Link>
        </div>

        {/* Chemistry */}
        <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-6 flex flex-col justify-between shadow-xl hover:border-purple-600/50 transition-all duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-purple-950/60 text-purple-400 border border-purple-500/30">
                <FlaskConical className="h-6 w-6" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30">
                1,620 Qs
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Chemistry</h2>
              <p className="text-xs text-[#948FA8] mt-1 leading-relaxed">
                Physical Chemistry, Organic Mechanisms, Coordination Compounds &amp; Inorganic Trends.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-[#948FA8]">
                <span>Subject Mastery</span>
                <span className="font-mono font-bold text-purple-300">84.5%</span>
              </div>
              <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full w-[84.5%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#17142F] border border-purple-900/30 text-xs space-y-1.5">
              <div className="font-semibold text-white">Next Sectional Sprint:</div>
              <div className="text-[#948FA8] flex items-center justify-between">
                <span>Coordination &amp; Carbonyls</span>
                <span className="font-mono text-purple-300">25 Qs / 60m</span>
              </div>
            </div>
          </div>

          <Link href="/exam/sub-chem-01/instructions" className="w-full pt-2">
            <Button variant="purplePill" className="w-full text-xs font-semibold gap-1.5">
              <Zap className="h-4 w-4" /> Start Chemistry Test
            </Button>
          </Link>
        </div>

        {/* Mathematics */}
        <div className="rounded-2xl border border-purple-900/30 bg-[#111022] p-6 space-y-6 flex flex-col justify-between shadow-xl hover:border-purple-600/50 transition-all duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-purple-950/60 text-purple-400 border border-purple-500/30">
                <Compass className="h-6 w-6" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30">
                1,810 Qs
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Mathematics</h2>
              <p className="text-xs text-[#948FA8] mt-1 leading-relaxed">
                Calculus, Vectors &amp; 3D, Coordinate Geometry, Matrices, Probability &amp; Complex Numbers.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-[#948FA8]">
                <span>Subject Mastery</span>
                <span className="font-mono font-bold text-purple-300">88.0%</span>
              </div>
              <div className="h-1.5 w-full bg-[#1C1738] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full w-[88%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#17142F] border border-purple-900/30 text-xs space-y-1.5">
              <div className="font-semibold text-white">Next Sectional Sprint:</div>
              <div className="text-[#948FA8] flex items-center justify-between">
                <span>Calculus &amp; Vectors Drill</span>
                <span className="font-mono text-purple-300">25 Qs / 60m</span>
              </div>
            </div>
          </div>

          <Link href="/exam/sub-math-01/instructions" className="w-full pt-2">
            <Button variant="purplePill" className="w-full text-xs font-semibold gap-1.5">
              <Zap className="h-4 w-4" /> Start Math Test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}