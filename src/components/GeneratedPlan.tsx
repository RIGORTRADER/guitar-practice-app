import { type PlanItem } from "../data/tasks";

type GeneratedPlanProps = {
  plan: PlanItem[] | null;
  actualMinutes: number;
  minMinutes: number;
  maxMinutes: number;
  onActualMinutesChange: (value: string) => void;
  onSaveSession: () => void;
};

export function GeneratedPlan({
  plan,
  actualMinutes,
  minMinutes,
  maxMinutes,
  onActualMinutesChange,
  onSaveSession,
}: GeneratedPlanProps) {
  return (
    <section className="app-card rounded-[2rem] p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="app-text-muted text-[11px] uppercase tracking-[0.2em]">
            Plan
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Oluşturulan plan
          </h2>
        </div>
        <p className="app-text-muted text-sm">
          Blokları sırayla çal, sonra gerçekleşen süreyi kaydet.
        </p>
      </div>

      {!plan ? (
        <div className="app-surface-muted mt-5 rounded-[1.5rem] border-dashed p-5">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Henüz plan oluşturulmadı.
          </p>
          <p className="app-text-muted mt-2 max-w-xl text-sm leading-6">
            Soldaki çalışma alanından bir preset seçebilir ya da manuel ayarlarla
            kendi oturumunu kurabilirsin.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="app-pill-neutral rounded-full px-3 py-1">
              Choose
            </span>
            <span className="app-pill-neutral rounded-full px-3 py-1">
              Generate
            </span>
            <span className="app-pill-neutral rounded-full px-3 py-1">
              Practice
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {plan.map((item, index) => (
            <div
              key={item.id}
              className="app-surface-muted rounded-2xl p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="app-pill-cool flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="app-text-muted mt-2 text-sm leading-6">
                      {item.instructions}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="app-pill-neutral rounded-full px-2.5 py-1">
                    {item.category}
                  </span>
                  <span className="app-pill-neutral rounded-full px-2.5 py-1">
                    {item.minutes} dk
                  </span>
                  <span className="app-pill-neutral rounded-full px-2.5 py-1">
                    {item.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="app-surface-muted rounded-2xl p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)]">
                  Toplam çalıştığın süre
                </label>
                <p className="app-text-muted mt-1 text-sm">
                  Hedeften sapabilirsin; önemli olan gerçekleşen süreyi kaydetmek.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="number"
                  min={minMinutes}
                  max={maxMinutes}
                  value={actualMinutes}
                  onChange={(e) => onActualMinutesChange(e.target.value)}
                  className="app-input w-32 rounded-xl px-3 py-2 text-sm outline-none transition focus:border-[var(--border-strong)]"
                />
                <button
                  onClick={onSaveSession}
                  className="app-btn-primary rounded-2xl px-4 py-2.5 text-sm font-medium transition hover:brightness-105"
                >
                  Tamamlandı olarak kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
