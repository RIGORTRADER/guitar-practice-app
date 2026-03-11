import { type SessionItem } from "../lib/sessions";

type SessionHistoryProps = {
  sessions: SessionItem[];
};

export function SessionHistory({ sessions }: SessionHistoryProps) {
  return (
    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Kayıtlar
          </p>
          <h2 className="mt-2 text-xl font-medium text-white">Son oturumlar</h2>
        </div>
        <p className="text-sm text-zinc-500">
          Kısa bir geriye bakış için son kayıtları burada tut.
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/80 p-5">
          <p className="text-sm font-medium text-zinc-200">Henüz kayıt yok.</p>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Bir planı tamamladığında burada son oturumlarının kısa geçmişi
            görünecek.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-white">{session.focus}</p>
                  <p className="mt-1 text-zinc-400">
                    {session.totalMinutes} dk • {session.primaryCategory}
                  </p>
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  {session.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
