import { NextResponse } from "next/server";

// Embedded cron job data (synced from OpenClaw gateway)
const cronJobs = [
  {
    id: "daily-tip-001",
    name: "Daily Growth Tip",
    enabled: true,
    schedule: { expr: "45 8 * * *", tz: "America/New_York" },
    state: {
      nextRunAtMs: 1773146700000,
      lastRunAtMs: 1773060300007,
      lastRunStatus: "ok",
    },
  },
  {
    id: "2aa0cbb0-2908-4161-a463-fe23b49aaf48",
    name: "Real Estate Briefing",
    enabled: true,
    schedule: { expr: "0 8 * * 1,3,5", tz: "America/New_York" },
    state: {
      nextRunAtMs: 1773230400000,
      lastRunAtMs: 1773057600012,
      lastRunStatus: "ok",
    },
  },
  {
    id: "01984aad-295c-4a89-9ec0-d395ce738ff6",
    name: "Weekly Project Check-in",
    enabled: true,
    schedule: { expr: "0 10 * * 3", tz: "America/New_York" },
    state: {
      nextRunAtMs: 1773237600000,
      lastRunAtMs: 1772636400011,
      lastRunStatus: "ok",
    },
  },
  {
    id: "38040375-b3ec-4ff4-8076-f177c62f7ad0",
    name: "Attorney Follow-up Week 1",
    enabled: true,
    schedule: { expr: "0 9 16 3 *", tz: "America/New_York" },
    state: {
      nextRunAtMs: 1773666000000,
    },
  },
  {
    id: "e38c7e58-d79e-4ff7-b8cf-27d3ba205c8a",
    name: "Attorney Follow-up Week 2",
    enabled: true,
    schedule: { expr: "0 9 23 3 *", tz: "America/New_York" },
    state: {
      nextRunAtMs: 1774270800000,
    },
  },
  {
    id: "04e69553-8817-4c2e-b663-48b0ec676c4a",
    name: "Attorney Follow-up Week 3",
    enabled: true,
    schedule: { expr: "0 9 30 3 *", tz: "America/New_York" },
    state: {
      nextRunAtMs: 1774875600000,
    },
  },
];

export async function GET() {
  return NextResponse.json({
    jobs: cronJobs,
    total: cronJobs.length,
  });
}
