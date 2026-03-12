import { type SessionItem } from "../lib/sessions";

type SessionHistoryProps = {
  sessions: SessionItem[];
};

export function SessionHistory({ sessions }: SessionHistoryProps) {
  return (
    <div className="app-card rounded-[2rem] p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="app-text-muted text-[11px] uppercase tracking-[0.2em]">
            Kayıtlar
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            History
          </h2>
        </div>
        <p className="app-text-muted text-sm">
          Son oturumları burada tut.
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="app-surface-muted mt-5 rounded-2xl border-dashed p-5">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Henüz kayıt yok.
          </p>
          <p className="app-text-muted mt-2 text-sm leading-6">
            Bir planı tamamladığında burada son oturumlarının kısa geçmişi
            görünecek.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="app-surface-muted rounded-2xl p-4 text-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {session.focus}
                  </p>
                  <p className="app-text-muted mt-1">
                    {session.totalMinutes} dk • {session.primaryCategory}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="app-pill-neutral rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]">
                    {session.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
