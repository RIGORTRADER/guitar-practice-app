import assert from "node:assert/strict";
import test from "node:test";
import {
  getWeeklyProgress,
  MAX_SESSION_MINUTES,
  MIN_SESSION_MINUTES,
  sanitizeMinutes,
  sanitizeSessionItem,
} from "./sessions";

test("sanitizeMinutes clamps and normalizes minute input safely", () => {
  assert.equal(sanitizeMinutes(""), MIN_SESSION_MINUTES);
  assert.equal(sanitizeMinutes(-10), MIN_SESSION_MINUTES);
  assert.equal(sanitizeMinutes(999999), MAX_SESSION_MINUTES);
  assert.equal(sanitizeMinutes("42"), 42);
  assert.equal(sanitizeMinutes("12.6"), 13);
  assert.equal(sanitizeMinutes("abc", 20), 20);
  assert.equal(sanitizeMinutes(undefined, 25), 25);
});

test("sanitizeSessionItem drops malformed values that are not usable session records", () => {
  assert.equal(sanitizeSessionItem(null, 123), null);
  assert.equal(sanitizeSessionItem([], 123), null);
  assert.equal(sanitizeSessionItem({}, 123), null);
  assert.equal(sanitizeSessionItem({ focus: "Teknik" }, 123), null);
  assert.equal(
    sanitizeSessionItem({ totalMinutes: "   ", focus: "Teknik" }, 123),
    null
  );
});

test("sanitizeSessionItem applies safe defaults for partial or legacy records", () => {
  const session = sanitizeSessionItem({ totalMinutes: "45", focus: "Teori" }, 98765);

  assert.ok(session);
  assert.equal(session.id, 98765);
  assert.equal(session.focus, "Teori");
  assert.equal(session.primaryCategory, "Teori");
  assert.equal(session.totalMinutes, 45);
  assert.equal(session.date, new Date(98765).toLocaleDateString("tr-TR"));
});

test("sanitizeSessionItem sanitizes invalid fields instead of crashing", () => {
  const session = sanitizeSessionItem(
    {
      id: -1,
      focus: "Metal",
      totalMinutes: 1000,
      primaryCategory: "Bilinmeyen",
      date: "",
    },
    555
  );

  assert.ok(session);
  assert.equal(session.id, 555);
  assert.equal(session.focus, "Kararsızım");
  assert.equal(session.primaryCategory, "Teknik");
  assert.equal(session.totalMinutes, MAX_SESSION_MINUTES);
  assert.equal(session.date, new Date(555).toLocaleDateString("tr-TR"));
});

test("sanitizeSessionItem clamps negative and decimal minute values", () => {
  const negativeMinutes = sanitizeSessionItem(
    { totalMinutes: -12, focus: "Ritim", primaryCategory: "Ritim" },
    100
  );
  const decimalMinutes = sanitizeSessionItem(
    { totalMinutes: "15.7", focus: "Doğaçlama", primaryCategory: "Doğaçlama" },
    101
  );

  assert.ok(negativeMinutes);
  assert.equal(negativeMinutes.totalMinutes, MIN_SESSION_MINUTES);

  assert.ok(decimalMinutes);
  assert.equal(decimalMinutes.totalMinutes, 16);
});

test("sanitizeSessionItem keeps a stable savedAt timestamp for new or legacy records", () => {
  const withSavedAt = sanitizeSessionItem(
    {
      totalMinutes: 30,
      focus: "Teknik",
      primaryCategory: "Teknik",
      savedAt: "2026-03-10T09:30:00.000Z",
    },
    100
  );
  const legacyDateOnly = sanitizeSessionItem(
    {
      totalMinutes: 20,
      focus: "Teori",
      primaryCategory: "Teori",
      date: "08.03.2026",
    },
    200
  );

  assert.ok(withSavedAt);
  assert.equal(withSavedAt.savedAt, "2026-03-10T09:30:00.000Z");

  assert.ok(legacyDateOnly);
  assert.equal(legacyDateOnly.savedAt, "2026-03-08T12:00:00.000Z");
});

test("getWeeklyProgress summarizes the last 7 days deterministically", () => {
  const weeklyProgress = getWeeklyProgress(
    [
      {
        id: 1,
        focus: "Teknik",
        totalMinutes: 40,
        primaryCategory: "Teknik",
        date: "10.03.2026",
        savedAt: "2026-03-10T08:00:00.000Z",
      },
      {
        id: 2,
        focus: "Teori",
        totalMinutes: 25,
        primaryCategory: "Teori",
        date: "09.03.2026",
        savedAt: "2026-03-09T12:00:00.000Z",
      },
      {
        id: 3,
        focus: "Ritim",
        totalMinutes: 30,
        primaryCategory: "Ritim",
        date: "01.03.2026",
        savedAt: "2026-03-01T12:00:00.000Z",
      },
    ],
    new Date("2026-03-11T18:00:00.000Z")
  );

  assert.equal(weeklyProgress.minutesLast7Days, 65);
  assert.equal(weeklyProgress.sessionsLast7Days, 2);
  assert.equal(weeklyProgress.mostPracticedCategory, "Teknik");
  assert.match(weeklyProgress.summary, /2 oturumda 65 dk/);
});

test("getWeeklyProgress returns an empty state when there are no recent sessions", () => {
  const weeklyProgress = getWeeklyProgress([], new Date("2026-03-11T18:00:00.000Z"));

  assert.equal(weeklyProgress.minutesLast7Days, 0);
  assert.equal(weeklyProgress.sessionsLast7Days, 0);
  assert.equal(weeklyProgress.mostPracticedCategory, null);
  assert.match(weeklyProgress.summary, /Son 7 günde kayıtlı bir çalışma yok/);
});
