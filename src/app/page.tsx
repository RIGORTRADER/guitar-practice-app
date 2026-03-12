"use client";

import { useEffect, useMemo, useState } from "react";
import { ChordFinder } from "../components/ChordFinder";
import { GeneratedPlan } from "../components/GeneratedPlan";
import { FretboardScaleViewer } from "../components/FretboardScaleViewer";
import {
  PracticeCompanion,
  type QuickStartPreset,
} from "../components/PracticeCompanion";
import { SectionPlaceholder } from "../components/SectionPlaceholder";
import { SelectionPanel } from "../components/SelectionPanel";
import { SessionHistory } from "../components/SessionHistory";
import { SessionSummary } from "../components/SessionSummary";
import {
  SidebarNavigation,
  type AppSection,
} from "../components/SidebarNavigation";
import { type ThemeMode } from "../components/ThemeToggle";
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

function getInitialTheme(): ThemeMode {
  if (typeof document !== "undefined") {
    const documentTheme = document.documentElement.dataset.theme;
    if (documentTheme === "light" || documentTheme === "dark") {
      return documentTheme;
    }
  }

  if (typeof window !== "undefined") {
    try {
      const storedTheme = window.localStorage.getItem("guitar-practice-theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
    } catch {
      return "dark";
    }
  }

  return "dark";
}

export default function Home() {
  const [focus, setFocus] = useState("Kararsızım");
  const [duration, setDuration] = useState(20);
  const [difficulty, setDifficulty] = useState<Difficulty>("Orta");
  const [plan, setPlan] = useState<PlanItem[] | null>(null);
  const [actualMinutes, setActualMinutes] = useState(20);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<AppSection>("plan");
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

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

  useEffect(() => {
    try {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("guitar-practice-theme", theme);
    } catch {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

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
    setActiveSection("plan");
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

  function renderActiveSection() {
    if (activeSection === "plan") {
      return (
        <div className="space-y-5">
          <section className="app-card rounded-[2rem] p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="app-text-muted text-[11px] uppercase tracking-[0.2em]">
                  Main workspace
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                  Practice launcher
                </h2>
                <p className="app-text-muted mt-3 max-w-2xl text-sm leading-6">
                  Quick Start ve plan üretme aynı yerde. Bir yön seç, planı kur
                  ve çalmaya başla.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <span className="app-pill-neutral rounded-full px-3 py-1.5">
                  {todayLabel}
                </span>
                <span className="app-pill-warm rounded-full px-3 py-1.5">
                  {sessions.length} oturum
                </span>
                <span className="app-pill-cool rounded-full px-3 py-1.5">
                  {totalMinutes} dk toplam
                </span>
              </div>
            </div>
          </section>

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
      );
    }

    if (activeSection === "today") {
      return (
        <PracticeCompanion
          todayLabel={todayLabel}
          todaySummary={todaySummary}
          weeklyProgress={weeklyProgress}
          lastSession={lastSession}
          onContinueLast={continueLastSessionPlan}
        />
      );
    }

    if (activeSection === "progress") {
      return (
        <div className="space-y-5">
          <section className="app-card rounded-[2rem] p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="app-text-muted text-[11px] uppercase tracking-[0.2em]">
                  Support
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                  Progress
                </h2>
                <p className="app-text-muted mt-3 text-sm leading-6">
                  Haftalık akışı ve çalışma dengesini burada net biçimde gör.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="app-pill-warm rounded-full px-3 py-1.5">
                  En az alan: {weakestCategory ?? "-"}
                </span>
                <span className="app-pill-cool rounded-full px-3 py-1.5">
                  7 gün: {weeklyProgress.minutesLast7Days} dk
                </span>
              </div>
            </div>
          </section>

          <SessionSummary
            sessionsCount={sessions.length}
            totalMinutes={totalMinutes}
            weakestCategory={weakestCategory}
            categoryTotals={categoryTotals}
            weeklyProgress={weeklyProgress}
            onClearAllSessions={clearAllSessions}
          />
        </div>
      );
    }

    if (activeSection === "history") {
      return (
        <div className="space-y-5">
          <section className="app-card rounded-[2rem] p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="app-text-muted text-[11px] uppercase tracking-[0.2em]">
                  Support
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                  History
                </h2>
                <p className="app-text-muted mt-3 text-sm leading-6">
                  Son oturumları kısa bir çalışma günlüğü gibi burada tut.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="app-pill-neutral rounded-full px-3 py-1.5">
                  {sessions.length} kayıt
                </span>
                {lastSession ? (
                  <span className="app-pill-cool rounded-full px-3 py-1.5">
                    Son: {lastSession.focus}
                  </span>
                ) : null}
              </div>
            </div>
          </section>

          <SessionHistory sessions={sessions} />
        </div>
      );
    }

    if (activeSection === "theory") {
      return (
        <SectionPlaceholder
          eyebrow="Next section"
          title="Theory"
          description="Bu alan ileride scale function, interval awareness ve sap üzerindeki ilişkiyi daha odaklı çalıştıran içerikler için ayrıldı."
          accentLabel="Intervals & function"
          plannedTools={[
            "Interval recognition mini-drills",
            "Degree function prompts",
            "Chord-tone targeting cues",
            "Key-center awareness",
          ]}
          practiceAngles={[
            "Kısa ama düzenli theory check-in’leriyle doğrudan çalım kararını desteklemek.",
            "Soyut anlatım yerine sap üstünde duyup uygulamaya dökülen mini görevler kurmak.",
            "Plan ekranıyla uyumlu, kısa süreli ama tekrar edilebilir theory companions eklemek.",
          ]}
        />
      );
    }

    if (activeSection === "fretboard") {
      return <FretboardScaleViewer />;
    }

    return <ChordFinder />;
  }

  return (
    <main className="min-h-screen bg-[var(--app-bg)] px-4 py-4 text-[var(--text-primary)] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <SidebarNavigation
            activeSection={activeSection}
            todayLabel={todayLabel}
            sessionsCount={sessions.length}
            totalMinutes={totalMinutes}
            theme={theme}
            onSectionChange={setActiveSection}
            onThemeChange={setTheme}
          />

          <div className="space-y-5">
            <section className="app-toolbar rounded-[2rem] px-5 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="app-text-muted text-[11px] uppercase tracking-[0.2em]">
                    Guitar practice companion
                  </p>
                  <p className="app-text-muted mt-1 text-sm">
                    Hızlı başla, planı gör, sonra destek alanlarına geç.
                  </p>
                </div>
                <button
                  onClick={() => setActiveSection("plan")}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                    activeSection === "plan"
                      ? "app-btn-primary"
                      : "app-btn-secondary"
                  }`}
                >
                  Plan görünümüne dön
                </button>
              </div>
            </section>

            {renderActiveSection()}
          </div>
        </div>
      </div>
    </main>
  );
}
