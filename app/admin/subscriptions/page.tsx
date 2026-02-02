"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

type Stats = { subscriptionCounts?: Record<string, number> };

export default function AdminSubscriptionsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<Stats>("/admin/stats")
      .then((res) => {
        if (res.ok && res.data) setStats(res.data);
        else setError(res.error || "Failed to load");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading…</p>
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

  const counts = stats?.subscriptionCounts ?? {};
  const free = counts.FREE ?? 0;
  const pro = counts.PRO ?? 0;
  const total = free + pro;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-6">Subscriptions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="text-sm text-[var(--muted-foreground)]">FREE</p>
          <p className="text-2xl font-semibold text-[var(--foreground)] mt-1">{free.toLocaleString()}</p>
          {total > 0 && (
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              {((free / total) * 100).toFixed(1)}%
            </p>
          )}
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="text-sm text-[var(--muted-foreground)]">PRO</p>
          <p className="text-2xl font-semibold text-[var(--foreground)] mt-1">{pro.toLocaleString()}</p>
          {total > 0 && (
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              {((pro / total) * 100).toFixed(1)}%
            </p>
          )}
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="text-sm text-[var(--muted-foreground)]">Total users</p>
          <p className="text-2xl font-semibold text-[var(--foreground)] mt-1">{total.toLocaleString()}</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-[var(--muted-foreground)]">
        Users near/over limits can be added in a future update (GET /admin/subscriptions).
      </p>
    </div>
  );
}
