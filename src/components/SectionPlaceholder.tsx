type SectionPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  accentLabel: string;
  plannedTools: string[];
  practiceAngles: string[];
};

export function SectionPlaceholder({
  eyebrow,
  title,
  description,
  accentLabel,
  plannedTools,
  practiceAngles,
}: SectionPlaceholderProps) {
  return (
    <section className="app-card rounded-[2rem] p-6">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="app-text-muted text-[11px] font-medium uppercase tracking-[0.2em]">
              {eyebrow}
            </p>
            <span className="app-pill-warm rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em]">
              {accentLabel}
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
              {title}
            </h2>
            <p className="app-text-muted mt-3 max-w-2xl text-sm leading-6">
              {description}
            </p>
          </div>

          <div className="app-surface-muted rounded-[1.5rem] p-4">
            <p className="app-text-muted text-xs uppercase tracking-[0.18em]">
              Planned tools
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {plannedTools.map((item) => (
                <div
                  key={item}
                  className="app-card-soft rounded-2xl px-3 py-3 text-sm text-[var(--text-secondary)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="app-surface-muted rounded-[1.5rem] p-4">
          <p className="app-text-muted text-xs uppercase tracking-[0.18em]">
            Coming next
          </p>
          <div className="mt-4 space-y-3">
            {practiceAngles.map((item, index) => (
              <div
                key={item}
                className="app-card-soft flex items-start gap-3 rounded-2xl px-4 py-3"
              >
                <span className="app-btn-primary flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-[var(--text-secondary)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
