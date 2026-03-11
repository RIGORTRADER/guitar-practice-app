import assert from "node:assert/strict";
import test from "node:test";
import { TASKS_BY_FOCUS } from "../data/tasks";
import { generatePlan } from "./recommendation";

function withMockedRandom(value: number, run: () => void) {
  const originalRandom = Math.random;
  Math.random = () => value;

  try {
    run();
  } finally {
    Math.random = originalRandom;
  }
}

test("returns 2, 3, and 4 items for duration buckets", () => {
  withMockedRandom(0.42, () => {
    assert.equal(
      generatePlan({ focus: "Teknik", duration: 10, difficulty: "Orta" }).length,
      2
    );
    assert.equal(
      generatePlan({ focus: "Teknik", duration: 15, difficulty: "Orta" }).length,
      3
    );
    assert.equal(
      generatePlan({ focus: "Teknik", duration: 30, difficulty: "Orta" }).length,
      4
    );
  });
});

test("prioritizes requested difficulty and fills remaining slots from the same focus", () => {
  withMockedRandom(0, () => {
    const plan = generatePlan({
      focus: "Kararsızım",
      duration: 30,
      difficulty: "Zor",
    });

    assert.equal(plan.length, 4);
    assert.ok(plan.some((item) => item.difficulty === "Zor"));
  });
});

test("includes all available requested-difficulty items before falling back for an unknown focus", () => {
  const selectedPool = TASKS_BY_FOCUS["Kararsızım"];
  const sameDifficultyIds = selectedPool
    .filter((item) => item.difficulty === "Zor")
    .map((item) => item.id);

  withMockedRandom(0, () => {
    const plan = generatePlan({
      focus: "Bilinmeyen",
      duration: 30,
      difficulty: "Zor",
    });

    assert.deepEqual(
      [...plan.filter((item) => item.difficulty === "Zor").map((item) => item.id)].sort(
        (a, b) => a - b
      ),
      sameDifficultyIds.sort((a, b) => a - b)
    );
  });
});

test("avoids repeating the previous category for mixed plans when there are enough alternatives", () => {
  withMockedRandom(0.42, () => {
    const plan = generatePlan({
      focus: "Kararsızım",
      duration: 30,
      difficulty: "Kolay",
      lastCategory: "Teknik",
    });

    assert.equal(plan.length, 4);
    assert.ok(plan.every((item) => item.category !== "Teknik"));
  });
});

test("falls back to the mixed default pool for unknown focuses", () => {
  withMockedRandom(0.42, () => {
    const plan = generatePlan({
      focus: "Bilinmeyen",
      duration: 20,
      difficulty: "Orta",
    });

    assert.equal(plan.length, 3);
    assert.ok(
      plan.every((item) => TASKS_BY_FOCUS["Kararsızım"].some((task) => task.id === item.id))
    );
  });
});

test("handles null lastCategory without affecting mixed plan generation", () => {
  withMockedRandom(0.42, () => {
    const plan = generatePlan({
      focus: "Kararsızım",
      duration: 15,
      difficulty: "Orta",
      lastCategory: null,
    });

    assert.equal(plan.length, 3);
  });
});
