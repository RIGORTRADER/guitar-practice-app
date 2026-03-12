import { type WeeklyProgress } from "../lib/sessions";

type SessionSummaryProps = {
  sessionsCount: number;
  totalMinutes: number;
  weakestCategory: string | null;
  categoryTotals: Record<string, number>;
  weeklyProgress: WeeklyProgress;
  onClearAllSessions: () => void;
};

export function SessionSummary({
  sessionsCount,
  totalMinutes,
  weakestCategory,
  categoryTotals,
  weeklyProgress,
  onClearAllSessions,
}: SessionSummaryProps) {
  return (
    <>
      <div className="app-card rounded-[2rem] p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="app-text-muted text-[11px] uppercase tracking-[0.2em]">
              Genel görünüm
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              Progress
            </h2>
          </div>
          <button
            onClick={onClearAllSessions}
            className="app-btn-secondary rounded-xl px-3 py-2 text-xs transition hover:border-[var(--border-strong)]"
          >
            Kayıtları temizle
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="app-surface-muted rounded-2xl p-4">
            <p className="app-text-muted text-xs">Toplam oturum</p>
            <p className="mt-2 text-2xl font-medium text-[var(--text-primary)]">
              {sessionsCount}
            </p>
          </div>
          <div className="app-surface-muted rounded-2xl p-4">
            <p className="app-text-muted text-xs">Toplam süre</p>
            <p className="mt-2 text-2xl font-medium text-[var(--text-primary)]">
              {totalMinutes} dk
            </p>
          </div>
          <div className="app-surface-muted rounded-2xl p-4">
            <p className="app-text-muted text-xs">Denge ihtiyacı</p>
            <p className="mt-2 text-lg font-medium text-[var(--text-primary)]">
              {weakestCategory ?? "-"}
            </p>
          </div>
        </div>

        <div className="app-surface-muted mt-5 rounded-[1.5rem] p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium text-[var(--text-primary)]">
              Haftalık ilerleme
            </h3>
            <p className="app-text-muted text-xs">Son 7 gün</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="app-card-soft rounded-2xl p-4">
              <p className="app-text-muted text-xs">Son 7 günde süre</p>
              <p className="mt-2 text-2xl font-medium text-[var(--text-primary)]">
                {weeklyProgress.minutesLast7Days} dk
              </p>
            </div>
            <div className="app-card-soft rounded-2xl p-4">
              <p className="app-text-muted text-xs">Son 7 günde oturum</p>
              <p className="mt-2 text-2xl font-medium text-[var(--text-primary)]">
                {weeklyProgress.sessionsLast7Days}
              </p>
            </div>
            <div className="app-card-soft rounded-2xl p-4">
              <p className="app-text-muted text-xs">En çok çalışılan alan</p>
              <p className="mt-2 text-lg font-medium text-[var(--text-primary)]">
                {weeklyProgress.mostPracticedCategory ?? "-"}
              </p>
            </div>
          </div>

          <div className="app-card-soft mt-4 rounded-2xl p-4">
            <p className="app-text-muted text-sm leading-6">
              {weeklyProgress.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="app-card rounded-[2rem] p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-medium text-[var(--text-primary)]">
            Kategori dengesi
          </h2>
          <p className="app-text-muted text-xs">Dağılım</p>
        </div>

        <div className="mt-4 space-y-4">
          {Object.entries(categoryTotals).map(([category, minutes]) => {
            const ratio =
              totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0;

            return (
              <div key={category}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">{category}</span>
                  <span className="app-text-muted">
                    {minutes} dk • {ratio}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--surface-panel)]">
                  <div
                    className="h-1.5 rounded-full bg-[linear-gradient(90deg,var(--button-primary-start),#9d8a52,#4e6558)]"
                    style={{ width: `${ratio}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
