"use client";

import { useEffect, useMemo, useState } from "react";
import { GeneratedPlan } from "../components/GeneratedPlan";
import {
  PracticeCompanion,
  type QuickStartPreset,
} from "../components/PracticeCompanion";
import { SelectionPanel } from "../components/SelectionPanel";
import { SessionHistory } from "../components/SessionHistory";
import { SessionSummary } from "../components/SessionSummary";
import { type Difficulty, type PlanItem } from "../data/tasks";
import { DURATIONS, PRIMARY_CATEGORIES } from "../lib/practice-options";
import { generatePlan } from "../lib/recommendation";
import {
  getWeeklyProgress,
  MAX_SESSION_MINUTES,
  MIN_SESSION_MINUTES,
  sanitizeMinutes,
  sanitizeSessionItem,
  type SessionItem,
} from "../lib/sessions";

export default function Home() {
  const [focus, setFocus] = useState("Kararsızım");
  const [duration, setDuration] = useState(20);
  const [difficulty, setDifficulty] = useState<Difficulty>("Orta");
  const [plan, setPlan] = useState<PlanItem[] | null>(null);
  const [actualMinutes, setActualMinutes] = useState(20);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const quickStartPresets: QuickStartPreset[] = [
    {
      label: "15 dk Isınma",
      description: "Tekniği aç, eli toparla ve kısa ama net bir giriş yap.",
      focus: "Teknik",
      duration: 15,
      difficulty: "Kolay",
    },
    {
      label: "20 dk Groove",
      description: "Comping ve ritim hissiyle oturumu hızlıca akışa sok.",
      focus: "Ritim",
      duration: 20,
      difficulty: "Orta",
    },
    {
      label: "30 dk Dengeli",
      description: "Kararsız modda daha dolu ve müzikal bir çalışma oturumu kur.",
      focus: "Kararsızım",
      duration: 30,
      difficulty: "Orta",
    },
  ];

  useEffect(() => {
    let nextSessions: SessionItem[] = [];

    const savedSessions = localStorage.getItem("guitar-practice-sessions");
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions);
        if (Array.isArray(parsedSessions)) {
          const fallbackBaseId = Date.now();
          nextSessions = parsedSessions
            .map((item, index) => sanitizeSessionItem(item, fallbackBaseId + index))
            .filter((item): item is SessionItem => item !== null);
        } else {
          localStorage.removeItem("guitar-practice-sessions");
        }
      } catch {
        localStorage.removeItem("guitar-practice-sessions");
      }
    }

    queueMicrotask(() => {
      setSessions(nextSessions);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("guitar-practice-sessions", JSON.stringify(sessions));
  }, [sessions, isLoaded]);

  function buildPlan(
    nextFocus: string,
    nextDuration: number,
    nextDifficulty: Difficulty
  ) {
    const nextPlan = generatePlan({
      focus: nextFocus,
      duration: nextDuration,
      difficulty: nextDifficulty,
      lastCategory: sessions[0]?.primaryCategory ?? null,
    });

    setFocus(nextFocus);
    setDuration(nextDuration);
    setDifficulty(nextDifficulty);
    setPlan(nextPlan);
    setActualMinutes(nextDuration);
  }

  function generateFakePlan() {
    buildPlan(focus, duration, difficulty);
  }

  function applyQuickStartPreset(preset: QuickStartPreset) {
    buildPlan(preset.focus, preset.duration, preset.difficulty);
  }

  function handleActualMinutesChange(value: string) {
    setActualMinutes(sanitizeMinutes(value, duration));
  }

  function saveSession() {
    if (!plan) return;

    const safeActualMinutes = sanitizeMinutes(actualMinutes, duration);
    const now = new Date();

    const newSession: SessionItem = {
      id: now.getTime(),
      focus,
      totalMinutes: safeActualMinutes,
      primaryCategory: plan[0]?.category ?? "Teknik",
      date: now.toLocaleDateString("tr-TR"),
      savedAt: now.toISOString(),
    };

    setSessions((prev) => [newSession, ...prev]);
    setActualMinutes(safeActualMinutes);
    setPlan(null);
  }

  const totalMinutes = useMemo(() => {
    return sessions.reduce((sum, session) => sum + session.totalMinutes, 0);
  }, [sessions]);

  const categoryTotals = useMemo(() => {
    const totals = Object.fromEntries(
      PRIMARY_CATEGORIES.map((category) => [category, 0])
    ) as Record<string, number>;

    sessions.forEach((session) => {
      if (totals[session.primaryCategory] !== undefined) {
        totals[session.primaryCategory] += session.totalMinutes;
      }
    });

    return totals;
  }, [sessions]);

  const weakestCategory = useMemo(() => {
    if (sessions.length === 0 || totalMinutes === 0) {
      return null;
    }

    return Object.entries(categoryTotals).sort((a, b) => a[1] - b[1])[0]?.[0];
  }, [categoryTotals, sessions.length, totalMinutes]);

  const weeklyProgress = useMemo(() => {
    return getWeeklyProgress(sessions);
  }, [sessions]);

  const lastSession = sessions[0] ?? null;
  const lastSessionLabel = lastSession
    ? `${lastSession.focus} • ${lastSession.totalMinutes} dk`
    : null;

  const todayLabel = useMemo(() => {
    return new Intl.DateTimeFormat("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date());
  }, []);

  const todaySummary = useMemo(() => {
    if (plan) {
      return "Planın hazır. İlk bloğu bitirince gerçekleşen süreyi kaydet ve akışı bozmadan devam et.";
    }

    if (weeklyProgress.sessionsLast7Days === 0) {
      return "Bugün kısa bir odak seçip başlaman yeter. Net bir 10-15 dakikalık oturum bile iyi bir açılış olur.";
    }

    if (weakestCategory) {
      return `Bu hafta en az ${weakestCategory} çalıştın. Bugün onu dengeleyecek kısa bir oturum iyi gider.`;
    }

    return "Bugün tek odaklı, sakin ve bitirilebilir bir plan seçmek en iyi başlangıç.";
  }, [plan, weeklyProgress.sessionsLast7Days, weakestCategory]);

  function continueLastSessionPlan() {
    if (!lastSession) return;

    const nearestDuration = DURATIONS.reduce((closest, candidate) => {
      return Math.abs(candidate - lastSession.totalMinutes) <
        Math.abs(closest - lastSession.totalMinutes)
        ? candidate
        : closest;
    }, DURATIONS[0]);

    buildPlan(lastSession.focus, nearestDuration, difficulty);
  }

  function clearAllSessions() {
    setSessions([]);
    localStorage.removeItem("guitar-practice-sessions");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-4 text-white sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <PracticeCompanion
          todayLabel={todayLabel}
          todaySummary={todaySummary}
          weeklyProgress={weeklyProgress}
          lastSession={lastSession}
          onContinueLast={continueLastSessionPlan}
        />

        <div className="grid gap-5 lg:grid-cols-[1.22fr_0.78fr]">
          <div className="space-y-5">
            <SelectionPanel
              focus={focus}
              duration={duration}
              difficulty={difficulty}
              presets={quickStartPresets}
              lastSessionLabel={lastSessionLabel}
              onFocusChange={setFocus}
              onDurationChange={setDuration}
              onDifficultyChange={setDifficulty}
              onGeneratePlan={generateFakePlan}
              onQuickStart={applyQuickStartPreset}
              onContinueLast={continueLastSessionPlan}
            />

            <GeneratedPlan
              plan={plan}
              actualMinutes={actualMinutes}
              minMinutes={MIN_SESSION_MINUTES}
              maxMinutes={MAX_SESSION_MINUTES}
              onActualMinutesChange={handleActualMinutesChange}
              onSaveSession={saveSession}
            />
          </div>

          <div className="space-y-5">
            <SessionSummary
              sessionsCount={sessions.length}
              totalMinutes={totalMinutes}
              weakestCategory={weakestCategory}
              categoryTotals={categoryTotals}
              weeklyProgress={weeklyProgress}
              onClearAllSessions={clearAllSessions}
            />

            <SessionHistory sessions={sessions} />
          </div>
        </div>
      </div>
    </main>
  );
}
