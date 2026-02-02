"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

type Stats = {
  userCount?: number;
  newUsersLast7Days?: number;
  totalThoughts?: number;
  totalNotes?: number;
  totalDocuments?: number;
  totalVoiceNotes?: number;
  totalReminders?: number;
  subscriptionCounts?: Record<string, number>;
  failedDocumentsCount?: number;
  timestamp?: string;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<Stats>("/admin/stats")
      .then((res) => {
        if (res.ok && res.data) setStats(res.data);
        else setError(res.error || "Failed to load stats");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const cards = [
    { label: "Total users", value: stats?.userCount ?? 0 },
    { label: "New users (7d)", value: stats?.newUsersLast7Days ?? 0 },
    { label: "Thoughts", value: stats?.totalThoughts ?? 0 },
    { label: "Notes", value: stats?.totalNotes ?? 0 },
    { label: "Documents", value: stats?.totalDocuments ?? 0 },
    { label: "Voice notes", value: stats?.totalVoiceNotes ?? 0 },
    { label: "Reminders", value: stats?.totalReminders ?? 0 },
    { label: "Failed documents", value: stats?.failedDocumentsCount ?? 0, alert: (stats?.failedDocumentsCount ?? 0) > 0 },
  ];

  const subs = stats?.subscriptionCounts ?? {};
  const free = subs.FREE ?? 0;
  const pro = subs.PRO ?? 0;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, alert }) => (
          <div
            key={label}
            className={`rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 ${
              alert ? "border-amber-500/50" : ""
            }`}
          >
            <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
            <p className={`text-2xl font-semibold mt-1 ${alert ? "text-amber-400" : "text-[var(--foreground)]"}`}>
              {value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 max-w-md">
        <h2 className="text-lg font-medium text-[var(--foreground)] mb-2">Subscriptions</h2>
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-[var(--muted-foreground)]">FREE</dt>
            <dd className="font-medium text-[var(--foreground)]">{free.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--muted-foreground)]">PRO</dt>
            <dd className="font-medium text-[var(--foreground)]">{pro.toLocaleString()}</dd>
          </div>
        </dl>
      </div>

      {stats?.timestamp && (
        <p className="mt-6 text-xs text-[var(--muted-foreground)]">
          Last updated: {new Date(stats.timestamp).toLocaleString()}
        </p>
      )}
    </div>
  );
}
