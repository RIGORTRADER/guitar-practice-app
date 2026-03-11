import { type Difficulty } from "../data/tasks";

export const PRIMARY_CATEGORIES = [
  "Teknik",
  "Teori",
  "Ritim",
  "Doğaçlama",
] as const;

export const FOCUSES = [...PRIMARY_CATEGORIES, "Kararsızım"] as const;
export const DURATIONS = [10, 15, 20, 30] as const;
export const DIFFICULTIES: Difficulty[] = ["Kolay", "Orta", "Zor"];
