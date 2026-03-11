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
    <section className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,244,245,0.12),transparent_38%),linear-gradient(135deg,rgba(39,39,42,0.92),rgba(24,24,27,0.98))]" />
      <div className="relative grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
            <span className="rounded-full border border-zinc-700 bg-zinc-950/60 px-3 py-1">
              Practice Companion
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">
              {todayLabel}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Bugün gitarda ne çalışsam?
            </h1>
            <p className="max-w-xl text-sm leading-6 text-zinc-300">
              Hızlı karar vermek, oturum boyunca yönünü korumak ve son günlerde
              nereye ağırlık verdiğini sakin biçimde görmek için.
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-800/80 bg-zinc-950/60 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Bugün
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {todaySummary}
              </p>
            </div>

            {lastSession ? (
              <button
                onClick={onContinueLast}
                className="rounded-xl border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-200 transition hover:border-zinc-500 hover:text-white"
              >
                Son oturumdan başla
              </button>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm text-zinc-300">
            <span className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5">
              Son 7 gün: {weeklyProgress.minutesLast7Days} dk
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5">
              Oturum: {weeklyProgress.sessionsLast7Days}
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5">
              Öne çıkan: {weeklyProgress.mostPracticedCategory ?? "-"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
