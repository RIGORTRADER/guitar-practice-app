import { TASKS_BY_FOCUS, type Difficulty, type PlanItem } from "../data/tasks";

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function generatePlan(params: {
  focus: string;
  duration: number;
  difficulty: Difficulty;
  lastCategory?: string | null;
}): PlanItem[] {
  const { focus, duration, difficulty, lastCategory } = params;

  let itemCount = 2;
  if (duration >= 15) itemCount = 3;
  if (duration >= 30) itemCount = 4;

  if (focus === "Kararsızım") {
    const allMixedPool = [
      ...TASKS_BY_FOCUS["Teknik"],
      ...TASKS_BY_FOCUS["Teori"],
      ...TASKS_BY_FOCUS["Ritim"],
      ...TASKS_BY_FOCUS["Doğaçlama"],
    ];

    const sameDifficulty = allMixedPool.filter(
      (item) => item.difficulty === difficulty
    );

    let pool = sameDifficulty.length > 0 ? sameDifficulty : allMixedPool;

    if (lastCategory) {
      const withoutLastCategory = pool.filter(
        (item) => item.category !== lastCategory
      );

      if (withoutLastCategory.length >= itemCount) {
        pool = withoutLastCategory;
      }
    }

    return shuffleArray(pool).slice(0, itemCount);
  }

  const selectedPool = TASKS_BY_FOCUS[focus] ?? TASKS_BY_FOCUS["Kararsızım"];

  const sameDifficulty = selectedPool.filter(
    (item) => item.difficulty === difficulty
  );

  let pool: PlanItem[] = [];

  if (sameDifficulty.length >= itemCount) {
    pool = shuffleArray(sameDifficulty).slice(0, itemCount);
  } else {
    const remaining = selectedPool.filter(
      (item) => item.difficulty !== difficulty
    );
    pool = [
      ...shuffleArray(sameDifficulty),
      ...shuffleArray(remaining).slice(0, itemCount - sameDifficulty.length),
    ];
  }

  return shuffleArray(pool);
}
