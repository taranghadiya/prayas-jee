"use client";

import * as React from "react";
import {
  User,
  Sliders,
  Bell,
  Palette,
  Check,
  CheckCircle2,
  Save,
  Moon,
  Sun,
  Laptop,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SAMPLE_USER_PROFILE } from "@/lib/constants/mock-data";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = React.useState<
    "appearance" | "profile" | "preferences" | "notifications"
  >("appearance");

  const [selectedTheme, setSelectedTheme] = React.useState<"dark" | "light" | "auto">("dark");
  const [selectedAccent, setSelectedAccent] = React.useState("violet");
  const [profile, setProfile] = React.useState(SAMPLE_USER_PROFILE);
  const [isSaved, setIsSaved] = React.useState(false);

  // Preference switches
  const [autoAdvance, setAutoAdvance] = React.useState(true);
  const [ntaPalette, setNtaPalette] = React.useState(true);
  const [soundEffects, setSoundEffects] = React.useState(true);
  const [timerWarning, setTimerWarning] = React.useState(true);

  // Notification switches
  const [emailResults, setEmailResults] = React.useState(true);
  const [weeklyDigest, setWeeklyDigest] = React.useState(true);
  const [scheduleReminders, setScheduleReminders] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const activeUser = localStorage.getItem("jee_active_user") || "";
      let foundProfile: any = null;

      // 1. Try account-scoped profile: jee_profile_${email}
      if (activeUser) {
        const scopedProfileStr = localStorage.getItem(`jee_profile_${activeUser}`);
        if (scopedProfileStr) {
          try {
            foundProfile = JSON.parse(scopedProfileStr);
          } catch {}
        }
      }

      // 2. Try global jee_user_profile
      if (!foundProfile) {
        const storedProfile = localStorage.getItem("jee_user_profile");
        if (storedProfile) {
          try {
            foundProfile = JSON.parse(storedProfile);
          } catch {}
        }
      }

      if (foundProfile) {
        setProfile((prev) => ({
          ...prev,
          ...foundProfile,
          email: activeUser || foundProfile.email || "aspirant@prayas.app",
        }));
      } else if (activeUser) {
        const namePart = activeUser.includes("@")
          ? activeUser.split("@")[0].replace(/[._-]/g, " ")
          : activeUser;
        const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        setProfile((prev) => ({
          ...prev,
          full_name: capitalized,
          email: activeUser,
        }));
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const activeUser = localStorage.getItem("jee_active_user") || profile.email;
      localStorage.setItem("jee_user_profile", JSON.stringify(profile));
      if (activeUser) {
        localStorage.setItem(`jee_profile_${activeUser}`, JSON.stringify(profile));
      }
      window.dispatchEvent(new Event("jee_profile_updated"));
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200 max-w-5xl mx-auto">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-[#948FA8] mt-1">
          Personalize your Prayas experience, appearance, and examination preferences.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Your preferences have been successfully updated.</span>
        </div>
      )}

      {/* Main Settings Container */}
      <div className="rounded-2xl border border-purple-900/30 bg-[#111022] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
        {/* Left Secondary Navigation */}
        <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-purple-900/25 p-5 space-y-1.5 bg-[#0C0B18]">
          <button
            onClick={() => setActiveSection("profile")}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSection === "profile"
                ? "bg-[#1E1A3D] text-purple-300 border border-purple-500/25 shadow-inner"
                : "text-[#948FA8] hover:bg-[#15132B] hover:text-white"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveSection("preferences")}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSection === "preferences"
                ? "bg-[#1E1A3D] text-purple-300 border border-purple-500/25 shadow-inner"
                : "text-[#948FA8] hover:bg-[#15132B] hover:text-white"
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>Preferences</span>
          </button>

          <button
            onClick={() => setActiveSection("notifications")}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSection === "notifications"
                ? "bg-[#1E1A3D] text-purple-300 border border-purple-500/25 shadow-inner"
                : "text-[#948FA8] hover:bg-[#15132B] hover:text-white"
            }`}
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveSection("appearance")}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSection === "appearance"
                ? "bg-[#1E1A3D] text-purple-300 border border-purple-500/25 shadow-inner"
                : "text-[#948FA8] hover:bg-[#15132B] hover:text-white"
            }`}
          >
            <Palette className="h-4 w-4 text-purple-400" />
            <span>Appearance</span>
          </button>
        </div>

        {/* Right Content Area */}
        <div className="md:col-span-8 p-6 sm:p-8 space-y-8">
          {/* Appearance Section (Shown in Reference Design) */}
          {activeSection === "appearance" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-bold text-white">Choose Theme</h3>
                <p className="text-xs text-[#948FA8] mt-0.5">
                  Customize the interface theme for practice sessions and dashboard.
                </p>
              </div>

              {/* 3 Theme Preview Cards Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Dark Theme Card (Active in Reference) */}
                <div
                  onClick={() => setSelectedTheme("dark")}
                  className={`group cursor-pointer rounded-2xl p-3 border transition-all ${
                    selectedTheme === "dark"
                      ? "border-purple-500 bg-[#1A1637] shadow-[0_0_20px_rgba(139,92,246,0.3)] ring-1 ring-purple-500"
                      : "border-purple-900/30 bg-[#0E0D1C] hover:border-purple-700/50"
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-[#080711] via-[#141029] to-[#0A0914] border border-purple-900/40 p-2.5 flex flex-col justify-between">
                    {/* Mini UI Header Preview */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-purple-400">✦</span>
                        <div className="h-1.5 w-8 bg-purple-400/40 rounded-full" />
                      </div>
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                    </div>

                    {/* Mini Sculpture / Glow Silhouette */}
                    <div className="relative flex justify-center items-center my-auto">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-600/40 to-indigo-500/20 border border-purple-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.5)]">
                        <Moon className="h-4 w-4 text-purple-300" />
                      </div>
                    </div>

                    {/* Mini UI Bar */}
                    <div className="flex gap-1.5">
                      <div className="h-1.5 w-6 bg-purple-500 rounded-full" />
                      <div className="h-1.5 w-10 bg-[#251E4E] rounded-full" />
                    </div>

                    {selectedTheme === "dark" && (
                      <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-sm">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs font-semibold text-white">Dark</span>
                  </div>
                </div>

                {/* Light Theme Card */}
                <div
                  onClick={() => setSelectedTheme("light")}
                  className={`group cursor-pointer rounded-2xl p-3 border transition-all ${
                    selectedTheme === "light"
                      ? "border-purple-500 bg-[#1A1637] shadow-[0_0_20px_rgba(139,92,246,0.3)] ring-1 ring-purple-500"
                      : "border-purple-900/30 bg-[#0E0D1C] hover:border-purple-700/50"
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#F1F5F9] border border-purple-200/40 p-2.5 flex flex-col justify-between">
                    {/* Mini UI Header Preview */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-purple-600">✦</span>
                        <div className="h-1.5 w-8 bg-purple-300 rounded-full" />
                      </div>
                      <div className="h-2 w-2 rounded-full bg-purple-400" />
                    </div>

                    <div className="relative flex justify-center items-center my-auto">
                      <div className="h-9 w-9 rounded-full bg-white border border-purple-300 flex items-center justify-center shadow-sm">
                        <Sun className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <div className="h-1.5 w-6 bg-purple-600 rounded-full" />
                      <div className="h-1.5 w-10 bg-purple-200 rounded-full" />
                    </div>

                    {selectedTheme === "light" && (
                      <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-sm">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs font-semibold text-[#948FA8] group-hover:text-white transition-colors">
                      Light
                    </span>
                  </div>
                </div>

                {/* Auto / Cosmic Theme Card */}
                <div
                  onClick={() => setSelectedTheme("auto")}
                  className={`group cursor-pointer rounded-2xl p-3 border transition-all ${
                    selectedTheme === "auto"
                      ? "border-purple-500 bg-[#1A1637] shadow-[0_0_20px_rgba(139,92,246,0.3)] ring-1 ring-purple-500"
                      : "border-purple-900/30 bg-[#0E0D1C] hover:border-purple-700/50"
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#1E293B] border border-indigo-900/40 p-2.5 flex flex-col justify-between">
                    {/* Mini UI Header Preview */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-indigo-400">✦</span>
                        <div className="h-1.5 w-8 bg-indigo-400/40 rounded-full" />
                      </div>
                      <div className="h-2 w-2 rounded-full bg-indigo-500" />
                    </div>

                    <div className="relative flex justify-center items-center my-auto">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-600/40 to-blue-500/20 border border-indigo-500/40 flex items-center justify-center shadow-sm">
                        <Laptop className="h-4 w-4 text-indigo-300" />
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <div className="h-1.5 w-6 bg-indigo-500 rounded-full" />
                      <div className="h-1.5 w-10 bg-indigo-950 rounded-full" />
                    </div>

                    {selectedTheme === "auto" && (
                      <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-sm">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs font-semibold text-[#948FA8] group-hover:text-white transition-colors">
                      Auto
                    </span>
                  </div>
                </div>
              </div>

              {/* Accent Color Selection */}
              <div className="pt-6 border-t border-purple-900/20 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white">Accent Glow Palette</h4>
                  <p className="text-xs text-[#948FA8]">Choose the primary highlight color for buttons, timers, and graphs.</p>
                </div>

                <div className="flex items-center gap-3">
                  {[
                    { id: "violet", color: "bg-purple-600", label: "Electric Violet" },
                    { id: "blue", color: "bg-blue-600", label: "Cobalt Blue" },
                    { id: "emerald", color: "bg-emerald-600", label: "Emerald" },
                    { id: "amber", color: "bg-amber-600", label: "Amber Gold" },
                  ].map((accent) => (
                    <button
                      key={accent.id}
                      onClick={() => setSelectedAccent(accent.id)}
                      className={`h-8 w-8 rounded-full ${accent.color} flex items-center justify-center transition-transform ${
                        selectedAccent === accent.id
                          ? "ring-2 ring-white ring-offset-2 ring-offset-[#111022] scale-110"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      title={accent.label}
                    >
                      {selectedAccent === accent.id && (
                        <Check className="h-4 w-4 text-white stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === "profile" && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Aspirant Profile</h3>
                <p className="text-xs text-[#948FA8] mt-0.5">
                  Used for estimating your All-India JEE Main percentiles and ranks.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#948FA8]">Full Name</label>
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="w-full h-10 rounded-xl bg-[#17142F] border border-purple-900/30 px-3.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#948FA8]">Email Address</label>
                  <input
                    type="text"
                    value={profile.email}
                    disabled
                    className="w-full h-10 rounded-xl bg-[#0E0D1C] border border-purple-900/20 px-3.5 text-xs text-[#7B7593] cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#948FA8]">Target Examination Year</label>
                    <select
                      value={profile.target_year}
                      onChange={(e) => setProfile({ ...profile, target_year: parseInt(e.target.value, 10) })}
                      className="w-full h-10 rounded-xl bg-[#17142F] border border-purple-900/30 px-3.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value={2025}>JEE Main 2025</option>
                      <option value={2026}>JEE Main 2026</option>
                      <option value={2027}>JEE Main 2027</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#948FA8]">Dream College & Branch</label>
                    <input
                      type="text"
                      value={profile.dream_college}
                      onChange={(e) => setProfile({ ...profile, dream_college: e.target.value })}
                      className="w-full h-10 rounded-xl bg-[#17142F] border border-purple-900/30 px-3.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="purplePill" type="submit" className="text-xs px-6">
                  <Save className="h-3.5 w-3.5 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* Preferences Section */}
          {activeSection === "preferences" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">CBT Exam Preferences</h3>
                <p className="text-xs text-[#948FA8] mt-0.5">
                  Fine-tune the live examination simulator behavior.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#17142F] border border-purple-900/30">
                  <div>
                    <div className="text-xs font-semibold text-white">Auto-advance on Save & Next</div>
                    <div className="text-[11px] text-[#948FA8]">
                      Automatically move to next question after response selection.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                    className="h-4 w-4 accent-purple-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#17142F] border border-purple-900/30">
                  <div>
                    <div className="text-xs font-semibold text-white">Official NTA Palette Colors</div>
                    <div className="text-[11px] text-[#948FA8]">
                      Standard Green (Answered), Orange (Not Answered), Purple (Marked).
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={ntaPalette}
                    onChange={(e) => setNtaPalette(e.target.checked)}
                    className="h-4 w-4 accent-purple-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#17142F] border border-purple-900/30">
                  <div>
                    <div className="text-xs font-semibold text-white">Audio Sound Cues</div>
                    <div className="text-[11px] text-[#948FA8]">
                      Play subtle click on question navigation and timer chime at 15 mins remaining.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={(e) => setSoundEffects(e.target.checked)}
                    className="h-4 w-4 accent-purple-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Notifications & Alerts</h3>
                <p className="text-xs text-[#948FA8] mt-0.5">
                  Manage email alerts and mock test schedule reminders.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#17142F] border border-purple-900/30">
                  <div>
                    <div className="text-xs font-semibold text-white">Mock Test Result Breakdown</div>
                    <div className="text-[11px] text-[#948FA8]">
                      Receive automated analysis report upon test completion.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailResults}
                    onChange={(e) => setEmailResults(e.target.checked)}
                    className="h-4 w-4 accent-purple-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#17142F] border border-purple-900/30">
                  <div>
                    <div className="text-xs font-semibold text-white">Weekly Performance Digest</div>
                    <div className="text-[11px] text-[#948FA8]">
                      Summary of solved questions, accuracy progress, and rank projection.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={weeklyDigest}
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                    className="h-4 w-4 accent-purple-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#17142F] border border-purple-900/30">
                  <div>
                    <div className="text-xs font-semibold text-white">Live All-India Test Reminders</div>
                    <div className="text-[11px] text-[#948FA8]">
                      Get notified 30 minutes before nationwide mock tests begin.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={scheduleReminders}
                    onChange={(e) => setScheduleReminders(e.target.checked)}
                    className="h-4 w-4 accent-purple-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}