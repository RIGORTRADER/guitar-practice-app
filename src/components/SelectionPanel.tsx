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
    <section className="app-card rounded-[2rem] p-6">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="app-text-muted text-[11px] uppercase tracking-[0.2em]">
              Plan ayarları
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              Practice workspace
            </h2>
            <p className="app-text-muted max-w-2xl text-sm leading-6">
              Bir preset seç ya da ayarları elle kur. Amaç hızlıca plan üretip
              çalmaya başlamak.
            </p>
          </div>

          <div className="app-surface-muted rounded-2xl px-4 py-3 text-sm">
            <p className="app-text-muted">Şu anki seçim</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="app-pill-neutral rounded-full px-3 py-1">
                {focus}
              </span>
              <span className="app-pill-neutral rounded-full px-3 py-1">
                {duration} dk
              </span>
              <span className="app-pill-neutral rounded-full px-3 py-1">
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="app-surface-muted rounded-[1.5rem] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Quick Start
              </p>
              <p className="app-text-muted mt-1 text-sm">
                En kısa yol. İstersen sonra elle ince ayar yap.
              </p>
            </div>

            {lastSessionLabel ? (
              <button
                onClick={onContinueLast}
                className="app-btn-secondary rounded-xl px-3 py-2 text-xs font-medium transition hover:border-[var(--border-strong)]"
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
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-panel)] px-4 py-3 text-left transition hover:border-[var(--border-strong)]"
              >
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {preset.label}
                </p>
                <p className="app-text-muted mt-1 text-xs leading-5">
                  {preset.focus} • {preset.duration} dk • {preset.difficulty}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <p className="app-text-muted text-[11px] uppercase tracking-[0.2em]">
            Manuel seçim
          </p>
          <p className="app-text-muted mt-2 text-sm leading-6">
            Kendi odağını doğrudan kurmak istersen aşağıdaki seçimlerle devam et.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-[var(--text-secondary)]">
            Odak
          </p>
          <div className="flex flex-wrap gap-2">
            {FOCUSES.map((item) => (
              <button
                key={item}
                onClick={() => onFocusChange(item)}
                className={`rounded-2xl px-4 py-2.5 text-sm transition ${
                  focus === item
                    ? "border border-[var(--accent-cool-border)] bg-[var(--accent-cool-bg)] text-[var(--accent-cool-text)] shadow-[var(--shadow-soft)]"
                    : "app-btn-secondary hover:border-[var(--border-strong)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-[var(--text-secondary)]">
              Süre
            </p>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => onDurationChange(item)}
                  className={`rounded-2xl px-4 py-2.5 text-sm transition ${
                    duration === item
                      ? "border border-[var(--accent-warm-border)] bg-[var(--accent-warm-bg)] text-[var(--accent-warm-text)] shadow-[var(--shadow-soft)]"
                      : "app-btn-secondary hover:border-[var(--border-strong)]"
                  }`}
                >
                  {item} dk
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-[var(--text-secondary)]">
              Zorluk
            </p>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((item) => (
                <button
                  key={item}
                  onClick={() => onDifficultyChange(item)}
                  className={`rounded-2xl px-4 py-2.5 text-sm transition ${
                    difficulty === item
                      ? "border border-[var(--accent-plum-border)] bg-[var(--accent-plum-bg)] text-[var(--accent-plum-text)] shadow-[var(--shadow-soft)]"
                      : "app-btn-secondary hover:border-[var(--border-strong)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="app-surface-muted mt-6 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Mini plan oluştur
          </p>
          <p className="app-text-muted mt-1 text-sm">
            Seçimlerini hemen çalınabilir bir oturuma dönüştür.
          </p>
        </div>

        <button
          onClick={onGeneratePlan}
          className="app-btn-primary rounded-2xl px-5 py-3 text-sm font-medium transition hover:brightness-105"
        >
          Mini plan oluştur
        </button>
      </div>
    </section>
  );
}
