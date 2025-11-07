'use client';

import { useEffect, useRef, useState } from "react";

const DEFAULT_MINUTES = 25;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function FocusTimer() {
  const [secondsRemaining, setSecondsRemaining] = useState(DEFAULT_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    if (secondsRemaining === 0) {
      setSecondsRemaining(DEFAULT_MINUTES * 60);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(DEFAULT_MINUTES * 60);
  };

  const progress =
    1 - secondsRemaining / (DEFAULT_MINUTES * 60 || DEFAULT_MINUTES * 60);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex h-48 w-48 items-center justify-center">
        <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="fill-none stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            className="fill-none stroke-sky-500 dark:stroke-sky-300"
            strokeWidth="6"
            strokeDasharray={Math.PI * 2 * 45}
            strokeDashoffset={(1 - progress) * Math.PI * 2 * 45}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
          {formatTime(secondsRemaining)}
        </span>
      </div>
      <div className="flex gap-3">
        {isRunning ? (
          <button
            type="button"
            onClick={handlePause}
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStart}
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
          >
            {secondsRemaining === 0 ? "Restart" : "Start"}
          </button>
        )}
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          Reset
        </button>
      </div>
      <p className="max-w-sm text-center text-xs text-zinc-500 dark:text-zinc-400">
        Use focused 25 minute sprints with a 5 minute break. Stack four rounds
        for a deep work block.
      </p>
    </div>
  );
}
