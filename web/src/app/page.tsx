import { FocusTimer } from "@/components/focus-timer";
import { ResourceLibrary } from "@/components/resource-library";
import { ScheduleTimeline } from "@/components/schedule-timeline";
import { SectionCard } from "@/components/section-card";
import { StatsGrid } from "@/components/stats-grid";
import { StudyPlanner } from "@/components/study-planner";
import { TaskBoard } from "@/components/task-board";
import { resources, schedule, tasks } from "@/lib/data";

export default function Home() {
  const localTime = new Intl.DateTimeFormat("en", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-zinc-50 to-white pb-20 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <header className="rounded-4xl relative overflow-hidden border border-zinc-200 bg-white px-8 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_60%)]" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300">
                Campus Hub
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Your day, curated for momentum
              </h1>
              <p className="mt-3 max-w-xl text-base text-zinc-500 dark:text-zinc-400">
                Track tasks, plan focus sessions, and access the right
                resources—all in one place designed for students who want to
                learn intentionally.
              </p>
            </div>
            <div className="rounded-3xl border border-sky-200 bg-sky-50/80 px-6 py-4 text-right shadow-sm dark:border-sky-500/40 dark:bg-sky-500/10">
              <p className="text-sm text-sky-700 dark:text-sky-200">
                Right now
              </p>
              <p className="mt-1 text-xl font-semibold text-sky-900 dark:text-sky-100">
                {localTime}
              </p>
              <p className="mt-2 text-xs text-sky-600 dark:text-sky-300">
                Prime focus window starts in 25 minutes
              </p>
            </div>
          </div>
        </header>

        <StatsGrid />

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <SectionCard
            title="Tasks at a glance"
            subtitle="Everything due across your courses, organized by progress."
          >
            <TaskBoard tasks={tasks} />
          </SectionCard>

          <SectionCard
            title="Focus sprint"
            subtitle="Dial in for a 25 minute deep work session."
          >
            <FocusTimer />
          </SectionCard>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <SectionCard
            title="Today’s schedule"
            subtitle="Classes, labs, and study commitments mapped out."
          >
            <ScheduleTimeline items={schedule} />
          </SectionCard>

          <SectionCard
            title="Study planner"
            subtitle="Balance your focus time across core priorities."
          >
            <StudyPlanner />
          </SectionCard>
        </div>

        <SectionCard
          title="Resource library"
          subtitle="Hand-picked study aids, campus services, and inspiration."
        >
          <ResourceLibrary resources={resources} />
        </SectionCard>
      </main>
    </div>
  );
}
