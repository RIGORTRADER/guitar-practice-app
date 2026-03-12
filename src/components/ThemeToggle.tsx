export type ThemeMode = "dark" | "light";

type ThemeToggleProps = {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
};

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  return (
    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-muted)] p-1">
      <div className="grid grid-cols-2 gap-1">
        <button
          type="button"
          aria-pressed={theme === "dark"}
          onClick={() => onThemeChange("dark")}
          className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
            theme === "dark"
              ? "app-btn-primary"
              : "app-btn-secondary"
          }`}
        >
          Dark
        </button>
        <button
          type="button"
          aria-pressed={theme === "light"}
          onClick={() => onThemeChange("light")}
          className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
            theme === "light"
              ? "app-btn-primary"
              : "app-btn-secondary"
          }`}
        >
          Light
        </button>
      </div>
    </div>
  );
}
