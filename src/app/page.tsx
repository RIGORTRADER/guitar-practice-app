"use client";

import { useEffect, useMemo, useState } from "react";
import { TASKS_BY_FOCUS, type Difficulty, type PlanItem } from "../data/tasks";
import { generatePlan } from "../lib/recommendation";

type SessionItem = {
  id: number;
  focus: string;
  totalMinutes: number;
  primaryCategory: string;
  date: string;
};

export default function Home() {
  const [focus, setFocus] = useState("Kararsızım");
  const [duration, setDuration] = useState(20);
  const [difficulty, setDifficulty] = useState<Difficulty>("Orta");
  const [plan, setPlan] = useState<PlanItem[] | null>(null);
  const [actualMinutes, setActualMinutes] = useState(20);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const focuses = ["Teknik", "Teori", "Ritim", "Doğaçlama", "Kararsızım"];
  const durations = [10, 15, 20, 30];
  const difficulties: Difficulty[] = ["Kolay", "Orta", "Zor"];

  useEffect(() => {
    const savedSessions = localStorage.getItem("guitar-practice-sessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("guitar-practice-sessions", JSON.stringify(sessions));
  }, [sessions, isLoaded]);
  function generateFakePlan() {
    const nextPlan = generatePlan({
      focus,
      duration,
      difficulty,
    });
  
    setPlan(nextPlan);
    setActualMinutes(duration);
  }

  function saveSession() {
    if (!plan) return;

    const newSession: SessionItem = {
      id: Date.now(),
      focus,
      totalMinutes: Number(actualMinutes),
      primaryCategory: plan[0]?.category ?? "Teknik",
      date: new Date().toLocaleDateString("tr-TR"),
    };

    setSessions((prev) => [newSession, ...prev]);
    setPlan(null);
  }

  const totalMinutes = useMemo(() => {
    return sessions.reduce((sum, session) => sum + session.totalMinutes, 0);
  }, [sessions]);

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {
      Teknik: 0,
      Teori: 0,
      Ritim: 0,
      Doğaçlama: 0,
    };

    sessions.forEach((session) => {
      if (totals[session.primaryCategory] !== undefined) {
        totals[session.primaryCategory] += session.totalMinutes;
      }
    });

    return totals;
  }, [sessions]);

  const weakestCategory = useMemo(() => {
    return Object.entries(categoryTotals).sort((a, b) => a[1] - b[1])[0]?.[0];
  }, [categoryTotals]);

  function clearAllSessions() {
    setSessions([]);
    localStorage.removeItem("guitar-practice-sessions");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h1 className="text-3xl font-semibold">
              Bugün gitarda ne çalışsam?
            </h1>
            <p className="mt-3 text-sm text-zinc-400">
              Modern elektro gitar için mini çalışma planı üreten MVP.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 space-y-6">
            <div>
              <p className="text-sm text-zinc-400 mb-2">Odak</p>
              <div className="flex flex-wrap gap-2">
                {focuses.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFocus(item)}
                    className={`rounded-2xl px-4 py-2 text-sm border ${
                      focus === item
                        ? "bg-white text-black border-white"
                        : "bg-zinc-950 text-white border-zinc-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-zinc-400 mb-2">Süre</p>
              <div className="flex flex-wrap gap-2">
                {durations.map((item) => (
                  <button
                    key={item}
                    onClick={() => setDuration(item)}
                    className={`rounded-2xl px-4 py-2 text-sm border ${
                      duration === item
                        ? "bg-white text-black border-white"
                        : "bg-zinc-950 text-white border-zinc-700"
                    }`}
                  >
                    {item} dk
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-zinc-400 mb-2">Zorluk</p>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((item) => (
                  <button
                    key={item}
                    onClick={() => setDifficulty(item)}
                    className={`rounded-2xl px-4 py-2 text-sm border ${
                      difficulty === item
                        ? "bg-white text-black border-white"
                        : "bg-zinc-950 text-white border-zinc-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateFakePlan}
              className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-medium"
            >
              Mini plan oluştur
            </button>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Seçilenler</p>
              <div className="mt-3 space-y-2 text-sm">
                <p>Odak: {focus}</p>
                <p>Süre: {duration} dk</p>
                <p>Zorluk: {difficulty}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-medium">Oluşturulan plan</h2>

            {!plan ? (
              <p className="mt-4 text-sm text-zinc-500">
                Henüz plan oluşturulmadı.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {plan.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">#{index + 1}</span>
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">
                      {item.instructions}
                    </p>
                    <div className="mt-3 text-xs text-zinc-500">
                      {item.category} • {item.minutes} dk • {item.difficulty}
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
                  <label className="block text-sm text-zinc-400">
                    Toplam çalıştığın süre
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={actualMinutes}
                    onChange={(e) => setActualMinutes(Number(e.target.value))}
                    className="w-32 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
                  />
                  <div>
                    <button
                      onClick={saveSession}
                      className="rounded-2xl bg-white text-black px-4 py-2 text-sm font-medium"
                    >
                      Tamamlandı olarak kaydet
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-medium">Özet</h2>
              <button
                onClick={clearAllSessions}
                className="rounded-xl border border-zinc-700 px-3 py-2 text-xs text-zinc-300"
              >
                Kayıtları temizle
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <p className="text-zinc-300">
                Toplam oturum: <span className="text-white">{sessions.length}</span>
              </p>
              <p className="text-zinc-300">
                Toplam süre: <span className="text-white">{totalMinutes} dk</span>
              </p>
              <p className="text-zinc-300">
                En az çalışılan alan:{" "}
                <span className="text-white">{weakestCategory ?? "-"}</span>
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-medium">Kategori dengesi</h2>

            <div className="mt-4 space-y-4">
              {Object.entries(categoryTotals).map(([category, minutes]) => {
                const ratio =
                  totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0;

                return (
                  <div key={category}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>{category}</span>
                      <span className="text-zinc-400">{minutes} dk</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800">
                      <div
                        className="h-2 rounded-full bg-white"
                        style={{ width: `${ratio}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-medium">Son oturumlar</h2>

            {sessions.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">Henüz kayıt yok.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm"
                  >
                    <p>{session.focus}</p>
                    <p className="mt-1 text-zinc-400">
                      {session.totalMinutes} dk • {session.primaryCategory}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">{session.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}