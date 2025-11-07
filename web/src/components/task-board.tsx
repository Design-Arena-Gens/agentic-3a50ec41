'use client';

import { useMemo, useState } from "react";
import type { Task } from "@/lib/data";

const statusLabels: Record<Task["status"], string> = {
  todo: "To do",
  progress: "In progress",
  done: "Completed",
};

const statusColors: Record<Task["status"], string> = {
  todo:
    "border-sky-200 bg-sky-50/60 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200",
  progress:
    "border-violet-200 bg-violet-50/60 text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200",
  done:
    "border-emerald-200 bg-emerald-50/60 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200",
};

type TaskBoardProps = {
  tasks: Task[];
};

type FilterOption = "all" | Task["status"];

export function TaskBoard({ tasks }: TaskBoardProps) {
  const [filter, setFilter] = useState<FilterOption>("all");

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const grouped = useMemo(() => {
    return filteredTasks.reduce<Record<Task["status"], Task[]>>(
      (acc, task) => {
        acc[task.status] = [...(acc[task.status] ?? []), task];
        return acc;
      },
      { todo: [], progress: [], done: [] },
    );
  }, [filteredTasks]);

  const emptyState =
    filter !== "all" && grouped[filter as Task["status"]]?.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {(["all", "todo", "progress", "done"] as FilterOption[]).map(
          (option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`rounded-full border px-4 py-1 text-sm font-medium transition ${
                option === filter
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                  : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
              }`}
            >
              {option === "all" ? "All" : statusLabels[option]}
            </button>
          ),
        )}
      </div>

      {emptyState ? (
        <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
          Nothing here right now. Time to get ahead on another course or take a
          well-deserved break.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {(Object.keys(grouped) as Task["status"][]).map((status) => (
            <div
              key={status}
              className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {statusLabels[status]}
                </h3>
                <span className="text-xs text-zinc-400">
                  {grouped[status]?.length ?? 0}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {grouped[status]?.length ? (
                  grouped[status].map((task) => (
                    <article
                      key={task.id}
                      className={`rounded-2xl border bg-white p-4 text-sm shadow-sm dark:bg-zinc-950/80 ${statusColors[task.status]}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                            {task.title}
                          </h4>
                          <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            {task.course}
                          </p>
                        </div>
                        <span className="rounded-full border border-current px-3 py-1 text-xs font-medium">
                          {task.status === "done"
                            ? "Ready to submit"
                            : task.status === "progress"
                              ? "In motion"
                              : "Start next"}
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-300">
                        Due {task.due}
                      </p>
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-zinc-300 bg-white/60 p-4 text-xs text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/40">
                    No tasks to display.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
