import type { ScheduleItem } from "@/lib/data";

type ScheduleTimelineProps = {
  items: ScheduleItem[];
};

const typeStyles: Record<ScheduleItem["type"], string> = {
  Lecture:
    "bg-sky-100 text-sky-800 dark:bg-sky-500/10 dark:text-sky-200 border-sky-200 dark:border-sky-400/40",
  Lab: "bg-violet-100 text-violet-800 dark:bg-violet-500/10 dark:text-violet-200 border-violet-200 dark:border-violet-400/40",
  Study:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200 border-emerald-200 dark:border-emerald-400/40",
};

export function ScheduleTimeline({ items }: ScheduleTimelineProps) {
  return (
    <ol className="relative ml-2 border-l border-dashed border-zinc-300 dark:border-zinc-700">
      {items.map((item, index) => (
        <li key={item.id} className="ml-6 pb-6 last:pb-0">
          <span className="absolute -left-[9px] mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900" />
          <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.course}
                </p>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {item.type}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${typeStyles[item.type]}`}
              >
                {item.type}
              </span>
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
              {item.start} – {item.end}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {item.location}
            </p>
            {index === 0 ? (
              <p className="mt-3 rounded-2xl bg-zinc-50 p-3 text-xs font-medium text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400">
                Tip: capture key takeaways in Notion right after class while
                they&apos;re fresh.
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
