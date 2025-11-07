'use client';

import { useMemo, useState } from "react";
import type { Resource } from "@/lib/data";

type ResourceLibraryProps = {
  resources: Resource[];
};

export function ResourceLibrary({ resources }: ResourceLibraryProps) {
  const allTags = useMemo(() => {
    const unique = new Set<string>();
    resources.forEach((resource) => {
      resource.tags.forEach((tag) => unique.add(tag));
    });
    return ["All", ...Array.from(unique).sort()];
  }, [resources]);

  const [activeTag, setActiveTag] = useState<string>("All");
  const filtered = useMemo(() => {
    if (activeTag === "All") return resources;
    return resources.filter((resource) => resource.tags.includes(activeTag));
  }, [resources, activeTag]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-wide transition ${
              activeTag === tag
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((resource) => (
          <article
            key={resource.id}
            className="flex h-full flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {resource.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {resource.description}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-sky-600 transition hover:text-sky-500 dark:text-sky-300"
              >
                Open
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
