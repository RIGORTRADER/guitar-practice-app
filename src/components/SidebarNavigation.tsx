import { ThemeToggle, type ThemeMode } from "./ThemeToggle";

type AppSection =
  | "plan"
  | "today"
  | "progress"
  | "history"
  | "theory"
  | "fretboard"
  | "chords";

type SidebarNavigationProps = {
  activeSection: AppSection;
  todayLabel: string;
  sessionsCount: number;
  totalMinutes: number;
  theme: ThemeMode;
  onSectionChange: (section: AppSection) => void;
  onThemeChange: (theme: ThemeMode) => void;
};

const PRIMARY_ITEMS: { id: AppSection; label: string }[] = [
  { id: "plan", label: "Plan" },
];

const SUPPORT_ITEMS: { id: AppSection; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "progress", label: "Progress" },
  { id: "history", label: "History" },
];

const FUTURE_ITEMS: { id: AppSection; label: string }[] = [
  { id: "theory", label: "Theory" },
  { id: "fretboard", label: "Fretboard" },
  { id: "chords", label: "Chords" },
];

function NavGroup({
  label,
  items,
  activeSection,
  onSectionChange,
}: {
  label: string;
  items: { id: AppSection; label: string }[];
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
}) {
  return (
    <div>
      <p className="app-text-muted px-2 text-[11px] font-medium uppercase tracking-[0.2em]">
        {label}
      </p>
      <div className="mt-2 space-y-1">
        {items.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition ${
                isActive
                  ? "app-sidebar-item-active"
                  : "app-sidebar-item"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive ? "bg-[var(--accent-warm-text)]" : "bg-[var(--text-soft)]"
                  }`}
                />
                {item.label}
              </span>
              {isActive ? (
                <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--button-primary-text)] opacity-80">
                  Now
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SidebarNavigation({
  activeSection,
  todayLabel,
  sessionsCount,
  totalMinutes,
  theme,
  onSectionChange,
  onThemeChange,
}: SidebarNavigationProps) {
  return (
    <aside className="app-card-soft rounded-[2rem] p-4 backdrop-blur md:sticky md:top-6">
      <div className="mb-5 border-b border-[var(--border-soft)] pb-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] app-text-muted">
          Guitar Practice
        </p>
        <h1 className="mt-2 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
          Workspace
        </h1>
        <p className="mt-1 text-sm app-text-muted">{todayLabel}</p>
        <div className="mt-4">
          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </div>
      </div>

      <div className="space-y-5">
        <NavGroup
          label="Main"
          items={PRIMARY_ITEMS}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />

        <NavGroup
          label="Support"
          items={SUPPORT_ITEMS}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />

        <NavGroup
          label="Next"
          items={FUTURE_ITEMS}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      </div>

      <div className="app-surface-muted mt-5 rounded-[1.5rem] p-3">
        <p className="text-xs uppercase tracking-[0.16em] app-text-muted">
          Saved sessions
        </p>
        <p className="mt-1 text-base font-medium text-[var(--text-primary)]">
          {sessionsCount} oturum
        </p>
        <p className="mt-1 text-sm app-text-soft">{totalMinutes} dk toplam</p>
      </div>
    </aside>
  );
}

export type { AppSection };
