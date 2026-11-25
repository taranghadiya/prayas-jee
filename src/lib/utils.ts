import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function calculateMarks(correct: number, incorrect: number): number {
  return correct * 4 - incorrect * 1;
}

export function calculateAccuracy(correct: number, totalAnswered: number): number {
  if (totalAnswered <= 0) return 0;
  return Number(((correct / totalAnswered) * 100).toFixed(1));
}

export function estimatePercentile(score: number): number {
  // Approximate JEE Main 300 marks normal distribution curve
  if (score >= 280) return 99.98;
  if (score >= 250) return 99.85;
  if (score >= 220) return 99.40;
  if (score >= 190) return 98.75;
  if (score >= 160) return 97.20;
  if (score >= 130) return 94.50;
  if (score >= 100) return 89.00;
  if (score >= 80) return 82.00;
  if (score >= 50) return 68.00;
  if (score > 0) return Math.max(10, Number((score * 1.2).toFixed(1)));
  return 0.0;
}
