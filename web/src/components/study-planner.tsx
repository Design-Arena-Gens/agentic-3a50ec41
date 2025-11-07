'use client';

import { useMemo, useState } from "react";

type StudyBlock = {
  id: string;
  course: string;
  topic: string;
  minutes: number;
  materials: string[];
};

const suggestedBlocks: StudyBlock[] = [
  {
    id: "calc-review",
    course: "Calculus II",
    topic: "Series convergence drills",
    minutes: 50,
    materials: ["Lecture notes wk7", "Anki deck", "Practice set #3"],
  },
  {
    id: "hci-sketch",
    course: "Human-Computer Interaction",
    topic: "Wireframe iteration",
    minutes: 40,
    materials: ["Figma board", "Usability feedback log"],
  },
  {
    id: "chem-quiz",
    course: "Organic Chemistry",
    topic: "Mechanisms quiz prep",
    minutes: 45,
    materials: ["Mechanism map", "Flashcards", "Past quizzes"],
  },
  {
    id: "methods-draft",
    course: "Research Methods",
    topic: "Polish discussion section",
    minutes: 35,
    materials: ["Draft doc", "Rubric checklist"],
  },
];

export function StudyPlanner() {
  const [dailyFocusMinutes, setDailyFocusMinutes] = useState(180);

  const totalMinutes = useMemo(
    () => suggestedBlocks.reduce((sum, block) => sum + block.minutes, 0),
    [],
  );

  const balance = dailyFocusMinutes - totalMinutes;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Plan today&apos;s focus window
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Ideal mix is {totalMinutes} min across core courses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={120}
            max={300}
            step={15}
            value={dailyFocusMinutes}
            onChange={(event) =>
              setDailyFocusMinutes(Number.parseInt(event.target.value, 10))
            }
            className="h-1 w-40 appearance-none rounded-full bg-zinc-200 accent-sky-500 dark:bg-zinc-700"
          />
          <span className="w-20 text-right text-sm font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
            {Math.round(dailyFocusMinutes / 60)}h{" "}
            {(dailyFocusMinutes % 60).toString().padStart(2, "0")}m
          </span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {suggestedBlocks.map((block) => (
          <article
            key={block.id}
            className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
                  {block.course}
                </h3>
                <p className="mt-1 text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {block.topic}
                </p>
              </div>
              <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-200">
                {block.minutes} min
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              {block.materials.map((material) => (
                <li key={material} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                  <span>{material}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p
        className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
          balance >= 0
            ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
            : "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200"
        }`}
      >
        {balance >= 0
          ? `You still have ${Math.floor(balance / 60)}h ${Math.abs(balance % 60)
              .toString()
              .padStart(2, "0")}m available. Consider a quick review session or a break.`
          : `You are overbooked by ${Math.floor(Math.abs(balance) / 60)}h ${(Math.abs(balance) % 60)
              .toString()
              .padStart(2, "0")}m. Rebalance before committing.`}
      </p>
    </div>
  );
}
