"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-api";

type SubscriptionRow = {
  id: string;
  email: string;
  name: string;
  plan: string;
  subscriptionExpiresAt: string | null;
  thoughtsProcessedThisPeriod: number;
  thoughtsLimit: number;
  voiceMinutesThisPeriod: number;
  voiceMinutesLimit: number;
  documentsProcessedThisPeriod: number;
  documentsLimit: number;
  usageResetAt: string;
  nearOrOverLimit: boolean;
};

type SubscriptionsRes = {
  subscriptionCounts?: Record<string, number>;
  freeTierLimits?: { thoughtsPerMonth: number; voiceMinutesPerMonth: number; documentsPerMonth: number };
  users: SubscriptionRow[];
  totalCount: number;
  page: number;
  limit: number;
};

export default function AdminSubscriptionsPage() {
  const [data, setData] = useState<SubscriptionsRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 50;

  useEffect(() => {
    setLoading(true);
    adminFetch<SubscriptionsRes>(`/admin/subscriptions?page=${page}&limit=${limit}`)
      .then((res) => {
        if (res.ok && res.data) setData(res.data);
        else setError(res.error || "Failed to load");
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (loading && !data) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading…</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-8">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const counts = data?.subscriptionCounts ?? {};
  const free = counts.FREE ?? 0;
  const pro = counts.PRO ?? 0;
  const total = free + pro;
  const users = data?.users ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const limits = data?.freeTierLimits;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-6">Subscriptions</h1>
      {limits && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 max-w-2xl mb-6">
          <h2 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Free tier limits (read-only)</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <div>
              <dt className="text-[var(--muted-foreground)]">Thoughts per month</dt>
              <dd className="font-medium text-[var(--foreground)]">{limits.thoughtsPerMonth}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Voice minutes per month</dt>
              <dd className="font-medium text-[var(--foreground)]">{limits.voiceMinutesPerMonth}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Documents per month</dt>
              <dd className="font-medium text-[var(--foreground)]">{limits.documentsPerMonth}</dd>
            </div>
          </dl>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mb-8">
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

      <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Usage by user</h2>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--background)]/50">
                <th className="text-left p-3 font-medium text-[var(--foreground)]">User</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Plan</th>
                <th className="text-right p-3 font-medium text-[var(--foreground)]">Thoughts</th>
                <th className="text-right p-3 font-medium text-[var(--foreground)]">Voice min</th>
                <th className="text-right p-3 font-medium text-[var(--foreground)]">Docs</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Near/over limit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className={`border-b border-[var(--border)] hover:bg-[var(--card-hover)]/50 ${
                    u.nearOrOverLimit ? "bg-amber-500/5" : ""
                  }`}
                >
                  <td className="p-3">
                    <Link href={`/admin/users/${u.id}`} className="text-[var(--primary)] hover:underline">
                      {u.email}
                    </Link>
                    {u.name && (
                      <span className="text-[var(--muted-foreground)] ml-1">({u.name})</span>
                    )}
                  </td>
                  <td className="p-3 text-[var(--foreground)]">{u.plan}</td>
                  <td className="p-3 text-right text-[var(--muted-foreground)]">
                    {u.thoughtsProcessedThisPeriod} / {u.thoughtsLimit === 999999 ? "∞" : u.thoughtsLimit}
                  </td>
                  <td className="p-3 text-right text-[var(--muted-foreground)]">
                    {u.voiceMinutesThisPeriod} / {u.voiceMinutesLimit === 999999 ? "∞" : u.voiceMinutesLimit}
                  </td>
                  <td className="p-3 text-right text-[var(--muted-foreground)]">
                    {u.documentsProcessedThisPeriod} / {u.documentsLimit === 999999 ? "∞" : u.documentsLimit}
                  </td>
                  <td className="p-3">
                    {u.nearOrOverLimit ? (
                      <span className="text-amber-500 font-medium">Yes</span>
                    ) : (
                      <span className="text-[var(--muted-foreground)]">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm disabled:opacity-50 hover:bg-[var(--card-hover)]"
          >
            Previous
          </button>
          <span className="text-sm text-[var(--muted-foreground)]">
            Page {page} of {totalPages} ({totalCount} users)
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm disabled:opacity-50 hover:bg-[var(--card-hover)]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
