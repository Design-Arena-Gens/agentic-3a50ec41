type Stat = {
  id: string;
  label: string;
  value: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
};

const stats: Stat[] = [
  {
    id: "progress",
    label: "Semester completion",
    value: "62%",
    trend: { value: "+4% vs last week", direction: "up" },
  },
  {
    id: "focus-time",
    label: "Focus time this week",
    value: "12h 45m",
    trend: { value: "+2h planned", direction: "up" },
  },
  {
    id: "tasks",
    label: "Open tasks",
    value: "7",
    trend: { value: "3 due soon", direction: "down" },
  },
  {
    id: "wellness",
    label: "Energy check-in",
    value: "Balanced",
    trend: { value: "Maintain routine", direction: "up" },
  },
];

export function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.id}
          className="rounded-3xl border border-zinc-200 bg-white/80 p-5 shadow-sm ring-1 ring-transparent transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80"
        >
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {stat.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {stat.value}
          </p>
          {stat.trend ? (
            <p
              className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                stat.trend.direction === "up"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
              }`}
            >
              {stat.trend.value}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
