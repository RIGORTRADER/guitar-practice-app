import { type Difficulty } from "../data/tasks";
import { type QuickStartPreset } from "./PracticeCompanion";
import { DIFFICULTIES, DURATIONS, FOCUSES } from "../lib/practice-options";

type SelectionPanelProps = {
  focus: string;
  duration: number;
  difficulty: Difficulty;
  presets: QuickStartPreset[];
  lastSessionLabel: string | null;
  onFocusChange: (focus: string) => void;
  onDurationChange: (duration: number) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onGeneratePlan: () => void;
  onQuickStart: (preset: QuickStartPreset) => void;
  onContinueLast: () => void;
};

export function SelectionPanel({
  focus,
  duration,
  difficulty,
  presets,
  lastSessionLabel,
  onFocusChange,
  onDurationChange,
  onDifficultyChange,
  onGeneratePlan,
  onQuickStart,
  onContinueLast,
}: SelectionPanelProps) {
  return (
    <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Plan ayarları
            </p>
            <h2 className="text-xl font-medium text-white">
              Bugünkü odağını seç
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-zinc-400">
              Hızlı başlama seçenekleriyle aynı akışın içindesin; ister preset
              seç ister ayarları elle kur.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm">
            <p className="text-zinc-500">Şu anki seçim</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-200">
              <span className="rounded-full border border-zinc-700 px-3 py-1">
                {focus}
              </span>
              <span className="rounded-full border border-zinc-700 px-3 py-1">
                {duration} dk
              </span>
              <span className="rounded-full border border-zinc-700 px-3 py-1">
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-white">Hızlı başla</p>
              <p className="mt-1 text-sm text-zinc-500">
                Uzun düşünmeden gir, istersen ardından seçimleri ince ayarla.
              </p>
            </div>

            {lastSessionLabel ? (
              <button
                onClick={onContinueLast}
                className="rounded-xl border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-200 transition hover:border-zinc-500 hover:text-white"
              >
                Son planı sürdür: {lastSessionLabel}
              </button>
            ) : null}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => onQuickStart(preset)}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-left transition hover:border-zinc-600 hover:bg-zinc-900"
              >
                <p className="text-sm font-medium text-white">{preset.label}</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  {preset.focus} • {preset.duration} dk • {preset.difficulty}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Manuel seçim
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Kendi odağını doğrudan kurmak istersen aşağıdaki seçimlerle devam et.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-zinc-300">Odak</p>
          <div className="flex flex-wrap gap-2">
            {FOCUSES.map((item) => (
              <button
                key={item}
                onClick={() => onFocusChange(item)}
                className={`rounded-2xl px-4 py-2.5 text-sm transition ${
                  focus === item
                    ? "border border-white bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)]"
                    : "border border-zinc-700 bg-zinc-950 text-zinc-200 hover:border-zinc-500 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-zinc-300">Süre</p>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => onDurationChange(item)}
                  className={`rounded-2xl px-4 py-2.5 text-sm transition ${
                    duration === item
                      ? "border border-white bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)]"
                      : "border border-zinc-700 bg-zinc-950 text-zinc-200 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {item} dk
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-zinc-300">Zorluk</p>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((item) => (
                <button
                  key={item}
                  onClick={() => onDifficultyChange(item)}
                  className={`rounded-2xl px-4 py-2.5 text-sm transition ${
                    difficulty === item
                      ? "border border-white bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)]"
                      : "border border-zinc-700 bg-zinc-950 text-zinc-200 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white">Mini plan oluştur</p>
          <p className="mt-1 text-sm text-zinc-400">
            Seçimlerini hemen çalınabilir bir oturuma dönüştür.
          </p>
        </div>

        <button
          onClick={onGeneratePlan}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Mini plan oluştur
        </button>
      </div>
    </section>
  );
}
