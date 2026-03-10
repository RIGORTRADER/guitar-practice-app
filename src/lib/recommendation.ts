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
}): PlanItem[] {
  const { focus, duration, difficulty } = params;

  const selectedPool = TASKS_BY_FOCUS[focus] ?? TASKS_BY_FOCUS["Kararsızım"];

  const filteredPool = selectedPool.filter(
    (item) => item.difficulty === difficulty
  );

  const finalPool = filteredPool.length > 0 ? filteredPool : selectedPool;

  let itemCount = 2;
  if (duration >= 15) itemCount = 3;
  if (duration >= 30) itemCount = 4;

  const shuffled = shuffleArray(finalPool);

  return shuffled.slice(0, itemCount);
}