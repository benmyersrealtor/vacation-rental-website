"use client";

import { useState, useEffect } from "react";

interface CronJob {
  id: string;
  name: string;
  enabled: boolean;
  schedule: {
    expr: string;
    tz: string;
  };
  state: {
    nextRunAtMs: number;
    lastRunAtMs?: number;
    lastRunStatus?: string;
  };
}

function parseCronExpression(expr: string): string {
  const parts = expr.split(" ");
  if (parts.length !== 5) return expr;

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  // Simple parsing for common patterns
  if (dayOfWeek === "*" && dayOfMonth === "*") {
    if (hour !== "*" && minute !== "*") {
      const h = hour.padStart(2, "0");
      const m = minute.padStart(2, "0");
      return `Daily at ${h}:${m}`;
    }
  }

  if (dayOfWeek === "1,3,5" && dayOfMonth === "*") {
    const h = hour.padStart(2, "0");
    const m = minute.padStart(2, "0");
    return `Mon, Wed, Fri at ${h}:${m}`;
  }

  if (dayOfWeek !== "*" && dayOfMonth === "*") {
    const days = dayOfWeek.split(",").map((d) => {
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return dayNames[parseInt(d)] || d;
    }).join(", ");
    if (hour !== "*" && minute !== "*") {
      const h = hour.padStart(2, "0");
      const m = minute.padStart(2, "0");
      return `${days} at ${h}:${m}`;
    }
    return days;
  }

  if (dayOfMonth !== "*" && month !== "*") {
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month)]} ${dayOfMonth} at ${hour}:${minute.padStart(2, "0")}`;
  }

  return expr;
}

function formatNextRun(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff < 0) return "Past due";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days === 0) {
    return `Today at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  }
  if (days === 1) {
    return `Tomorrow at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  }
  if (days < 7) {
    return `${days} days at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  }

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + 
    ` at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
}

function getWeekDays(date: Date): Date[] {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

function getJobsForDay(jobs: CronJob[], day: Date): CronJob[] {
  return jobs.filter((job) => {
    if (!job.state.nextRunAtMs) return false;
    const nextRun = new Date(job.state.nextRunAtMs);
    return (
      nextRun.getDate() === day.getDate() &&
      nextRun.getMonth() === day.getMonth() &&
      nextRun.getFullYear() === day.getFullYear()
    );
  });
}

export default function CalendarPage() {
  const [jobs, setJobs] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetch("/api/cron")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const weekDays = getWeekDays(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const goToPrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  if (loading) {
    return (
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Calendar</h1>
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="p-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Calendar</h1>
            <p className="text-[var(--text-secondary)]">Scheduled cron jobs</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevWeek}
              className="px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm hover:bg-[var(--bg-hover)]"
            >
              ← Prev
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-2 bg-[var(--accent)] text-white rounded-lg text-sm hover:bg-[var(--accent-hover)]"
            >
              Today
            </button>
            <button
              onClick={goToNextWeek}
              className="px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm hover:bg-[var(--bg-hover)]"
            >
              Next →
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)]">Total Jobs</div>
          <div className="text-2xl font-semibold">{jobs.length}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)]">Active</div>
          <div className="text-2xl font-semibold text-[var(--success)]">
            {jobs.filter((j) => j.enabled).length}
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)]">Next Run</div>
          <div className="text-lg font-semibold">
            {jobs[0] ? formatNextRun(jobs[0].state.nextRunAtMs) : "None"}
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)]">This Week</div>
          <div className="text-2xl font-semibold text-[var(--accent)]">
            {jobs.filter((j) => {
              if (!j.state.nextRunAtMs) return false;
              const nextRun = new Date(j.state.nextRunAtMs);
              return weekDays.some(
                (d) =>
                  d.getDate() === nextRun.getDate() &&
                  d.getMonth() === nextRun.getMonth()
              );
            }).length}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg overflow-hidden">
        {/* Week header */}
        <div className="grid grid-cols-7 border-b border-[var(--border)]">
          {weekDays.map((day, i) => {
            const isToday =
              day.toDateString() === new Date().toDateString();
            return (
              <div
                key={i}
                className={`p-3 text-center border-r border-[var(--border)] last:border-r-0 ${
                  isToday ? "bg-[var(--accent)] bg-opacity-20" : ""
                }`}
              >
                <div className="text-xs text-[var(--text-tertiary)] uppercase">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className={`text-lg font-semibold ${isToday ? "text-[var(--accent)]" : ""}`}>
                  {day.getDate()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Week body */}
        <div className="grid grid-cols-7 min-h-[400px]">
          {weekDays.map((day, i) => {
            const dayJobs = getJobsForDay(jobs, day);
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div
                key={i}
                className={`p-2 border-r border-[var(--border)] last:border-r-0 ${
                  isToday ? "bg-[var(--accent)] bg-opacity-5" : ""
                }`}
              >
                {dayJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-[var(--bg-tertiary)] border border-[var(--border)] rounded p-2 mb-2 text-xs"
                  >
                    <div className="font-medium truncate">{job.name}</div>
                    <div className="text-[var(--text-tertiary)]">
                      {new Date(job.state.nextRunAtMs).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Job List */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">All Scheduled Jobs</h2>
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{job.name}</h3>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        job.enabled ? "bg-[var(--success)]" : "bg-[var(--text-tertiary)]"
                      }`}
                    />
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {parseCronExpression(job.schedule.expr)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {formatNextRun(job.state.nextRunAtMs)}
                  </div>
                  {job.state.lastRunStatus && (
                    <div
                      className={`text-xs ${
                        job.state.lastRunStatus === "ok"
                          ? "text-[var(--success)]"
                          : "text-[var(--error)]"
                      }`}
                    >
                      Last: {job.state.lastRunStatus}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
