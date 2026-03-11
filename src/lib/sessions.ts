import { FOCUSES, PRIMARY_CATEGORIES } from "./practice-options";

export type SessionItem = {
  id: number;
  focus: string;
  totalMinutes: number;
  primaryCategory: string;
  date: string;
  savedAt: string;
};

export type WeeklyProgress = {
  minutesLast7Days: number;
  sessionsLast7Days: number;
  mostPracticedCategory: string | null;
  summary: string;
};

export const MIN_SESSION_MINUTES = 1;
export const MAX_SESSION_MINUTES = 600;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isAllowedValue<T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number] {
  return typeof value === "string" && allowedValues.includes(value as T[number]);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseTrDate(dateValue: string) {
  const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(dateValue.trim());
  if (!match) return null;

  const [, day, month, year] = match;
  const parsedDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day), 12, 0, 0, 0)
  );

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function resolveSessionDate(value: Record<string, unknown>, id: number) {
  if (typeof value.savedAt === "string" && value.savedAt.trim() !== "") {
    const parsedSavedAt = new Date(value.savedAt);
    if (!Number.isNaN(parsedSavedAt.getTime())) {
      return parsedSavedAt;
    }
  }

  if (typeof value.date === "string" && value.date.trim() !== "") {
    const parsedDate = parseTrDate(value.date);
    if (parsedDate) {
      return parsedDate;
    }
  }

  return new Date(id);
}

export function sanitizeMinutes(value: unknown, fallback = MIN_SESSION_MINUTES) {
  const parsedValue =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : Number.NaN;

  if (!Number.isFinite(parsedValue)) {
    return clamp(fallback, MIN_SESSION_MINUTES, MAX_SESSION_MINUTES);
  }

  return clamp(
    Math.round(parsedValue),
    MIN_SESSION_MINUTES,
    MAX_SESSION_MINUTES
  );
}

export function sanitizeSessionItem(
  value: unknown,
  fallbackId: number
): SessionItem | null {
  if (!isRecord(value)) return null;

  const rawMinutes = value.totalMinutes;
  const hasMinutes =
    typeof rawMinutes === "number" ||
    (typeof rawMinutes === "string" && rawMinutes.trim() !== "");

  if (!hasMinutes) return null;

  const focus = isAllowedValue(value.focus, FOCUSES) ? value.focus : "Kararsızım";
  const primaryCategory = isAllowedValue(value.primaryCategory, PRIMARY_CATEGORIES)
    ? value.primaryCategory
    : isAllowedValue(focus, PRIMARY_CATEGORIES)
      ? focus
      : "Teknik";
  const id =
    typeof value.id === "number" && Number.isSafeInteger(value.id) && value.id > 0
      ? value.id
      : fallbackId;
  const resolvedSessionDate = resolveSessionDate(value, id);
  const date =
    typeof value.date === "string" && value.date.trim() !== ""
      ? value.date
      : resolvedSessionDate.toLocaleDateString("tr-TR");

  return {
    id,
    focus,
    totalMinutes: sanitizeMinutes(rawMinutes),
    primaryCategory,
    date,
    savedAt: resolvedSessionDate.toISOString(),
  };
}

export function getWeeklyProgress(
  sessions: SessionItem[],
  now = new Date()
): WeeklyProgress {
  const last7DaysThreshold = new Date(now);
  last7DaysThreshold.setHours(0, 0, 0, 0);
  last7DaysThreshold.setDate(last7DaysThreshold.getDate() - 6);

  const recentSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.savedAt);
    return !Number.isNaN(sessionDate.getTime()) && sessionDate >= last7DaysThreshold;
  });

  const minutesLast7Days = recentSessions.reduce(
    (sum, session) => sum + session.totalMinutes,
    0
  );

  const categoryMinutes = recentSessions.reduce<Record<string, number>>(
    (totals, session) => {
      totals[session.primaryCategory] =
        (totals[session.primaryCategory] ?? 0) + session.totalMinutes;
      return totals;
    },
    {}
  );

  const mostPracticedCategory =
    Object.entries(categoryMinutes).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  if (recentSessions.length === 0) {
    return {
      minutesLast7Days: 0,
      sessionsLast7Days: 0,
      mostPracticedCategory: null,
      summary: "Son 7 günde kayıtlı bir çalışma yok.",
    };
  }

  return {
    minutesLast7Days,
    sessionsLast7Days: recentSessions.length,
    mostPracticedCategory,
    summary: `Son 7 günde ${recentSessions.length} oturumda ${minutesLast7Days} dk çalıştın.${mostPracticedCategory ? ` En çok ${mostPracticedCategory} alanına zaman ayırdın.` : ""}`,
  };
}
