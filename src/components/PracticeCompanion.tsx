import { type Difficulty } from "../data/tasks";
import { type SessionItem, type WeeklyProgress } from "../lib/sessions";

export type QuickStartPreset = {
  label: string;
  description: string;
  focus: string;
  duration: number;
  difficulty: Difficulty;
};

type PracticeCompanionProps = {
  todayLabel: string;
  todaySummary: string;
  weeklyProgress: WeeklyProgress;
  lastSession: SessionItem | null;
  onContinueLast: () => void;
};

export function PracticeCompanion({
  todayLabel,
  todaySummary,
  weeklyProgress,
  lastSession,
  onContinueLast,
}: PracticeCompanionProps) {
  return (
    <section className="app-card rounded-[2rem] p-6">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="app-pill-neutral rounded-full px-3 py-1">
              Today
            </span>
            <span className="app-pill-warm rounded-full px-3 py-1">
              {todayLabel}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              Çalışmaya başlamadan önce kısa bir yön
            </h2>
            <p className="app-text-muted max-w-xl text-sm leading-6">
              Hangi alana gireceğini hızlıca netleştir ve oturum boyunca rotanı
              koru.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="app-pill-neutral rounded-full px-3 py-1.5">
              Son 7 gün: {weeklyProgress.minutesLast7Days} dk
            </span>
            <span className="app-pill-neutral rounded-full px-3 py-1.5">
              Oturum: {weeklyProgress.sessionsLast7Days}
            </span>
            <span className="app-pill-neutral rounded-full px-3 py-1.5">
              Öne çıkan: {weeklyProgress.mostPracticedCategory ?? "-"}
            </span>
          </div>
        </div>

        <div className="app-surface-muted rounded-[1.5rem] p-4">
          <p className="app-text-muted text-[11px] font-medium uppercase tracking-[0.2em]">
            Focus note
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            {todaySummary}
          </p>

          {lastSession ? (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="app-text-muted text-xs">Son oturum</p>
                <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                  {lastSession.focus} • {lastSession.totalMinutes} dk
                </p>
              </div>
              <button
                onClick={onContinueLast}
                className="app-btn-secondary rounded-xl px-3 py-2 text-xs font-medium transition hover:border-[var(--border-strong)]"
              >
                Son oturumdan başla
              </button>
            </div>
          ) : (
            <div className="app-surface-muted app-text-muted mt-4 rounded-2xl border-dashed px-4 py-3 text-sm">
              İlk kayıttan sonra burada hızlı bir devam kısayolu görünecek.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
