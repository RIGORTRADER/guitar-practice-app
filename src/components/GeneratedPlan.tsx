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
    <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Plan
          </p>
          <h2 className="mt-2 text-xl font-medium text-white">
            Oluşturulan plan
          </h2>
        </div>
        <p className="text-sm text-zinc-400">
          Çalmaya başladığında blokları sırayla bitir, oturum sonunda süreyi
          kaydet.
        </p>
      </div>

      {!plan ? (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-zinc-800 bg-zinc-950/80 p-5">
          <p className="text-sm font-medium text-zinc-200">
            Henüz plan oluşturulmadı.
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Seçim panelinden bir preset seçebilir ya da manuel ayarlarla doğrudan
            kendi oturumunu kurabilirsin.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {plan.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-xs text-zinc-300">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {item.instructions}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                  <span className="rounded-full border border-zinc-700 px-2.5 py-1">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-zinc-700 px-2.5 py-1">
                    {item.minutes} dk
                  </span>
                  <span className="rounded-full border border-zinc-700 px-2.5 py-1">
                    {item.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Toplam çalıştığın süre
                </label>
                <p className="mt-1 text-sm text-zinc-500">
                  Plandaki hedefi birebir tutmak zorunda değilsin; gerçekleşen
                  süreyi kaydet.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="number"
                  min={minMinutes}
                  max={maxMinutes}
                  value={actualMinutes}
                  onChange={(e) => onActualMinutesChange(e.target.value)}
                  className="w-32 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-zinc-500"
                />
                <button
                  onClick={onSaveSession}
                  className="rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
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
