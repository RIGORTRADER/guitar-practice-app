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
      <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Genel görünüm
            </p>
            <h2 className="mt-2 text-xl font-medium text-white">Özet</h2>
          </div>
          <button
            onClick={onClearAllSessions}
            className="rounded-xl border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-white"
          >
            Kayıtları temizle
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <p className="text-xs text-zinc-500">Toplam oturum</p>
            <p className="mt-2 text-2xl font-medium text-white">{sessionsCount}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <p className="text-xs text-zinc-500">Toplam süre</p>
            <p className="mt-2 text-2xl font-medium text-white">
              {totalMinutes} dk
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <p className="text-xs text-zinc-500">Denge ihtiyacı</p>
            <p className="mt-2 text-lg font-medium text-white">
              {weakestCategory ?? "-"}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium text-white">Haftalık ilerleme</h3>
            <p className="text-xs text-zinc-500">İkincil görünüm</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-xs text-zinc-500">Son 7 günde süre</p>
            <p className="mt-2 text-2xl font-medium text-white">
              {weeklyProgress.minutesLast7Days} dk
            </p>
          </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-xs text-zinc-500">Son 7 günde oturum</p>
            <p className="mt-2 text-2xl font-medium text-white">
              {weeklyProgress.sessionsLast7Days}
            </p>
          </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-xs text-zinc-500">En çok çalışılan alan</p>
            <p className="mt-2 text-lg font-medium text-white">
              {weeklyProgress.mostPracticedCategory ?? "-"}
            </p>
          </div>
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm leading-6 text-zinc-400">
              {weeklyProgress.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-medium text-white">Kategori dengesi</h2>
          <p className="text-xs text-zinc-500">Arka plan görünümü</p>
        </div>

        <div className="mt-4 space-y-4">
          {Object.entries(categoryTotals).map(([category, minutes]) => {
            const ratio =
              totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0;

            return (
              <div key={category}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-300">{category}</span>
                  <span className="text-zinc-400">
                    {minutes} dk • {ratio}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800">
                  <div
                    className="h-1.5 rounded-full bg-zinc-300"
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
