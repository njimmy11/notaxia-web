"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-api";

type ThoughtRow = {
  id: string;
  userId: string;
  status: string;
  category: string | null;
  createdAt: string;
  user: { email: string; name: string };
};

type ThoughtsRes = {
  thoughts: ThoughtRow[];
  totalCount: number;
  page: number;
  limit: number;
};

export default function AdminThoughtsPage() {
  const [data, setData] = useState<ThoughtsRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [statusFilter, setStatusFilter] = useState("");
  const [userIdFilter, setUserIdFilter] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(pageSize));
    if (statusFilter) params.set("status", statusFilter);
    if (userIdFilter) params.set("userId", userIdFilter);
    adminFetch<ThoughtsRes>(`/admin/thoughts?${params.toString()}`)
      .then((res) => {
        if (res.ok && res.data) setData(res.data);
        else setError(res.error || "Failed to load thoughts");
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, statusFilter, userIdFilter]);

  const thoughts = data?.thoughts ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  if (loading && !data) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading thoughts…</p>
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Thoughts</h1>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)]"
        >
          <option value="">All statuses</option>
          <option value="RAW">RAW</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="PROCESSED">PROCESSED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>
        <input
          type="text"
          placeholder="User ID filter"
          value={userIdFilter}
          onChange={(e) => { setUserIdFilter(e.target.value); setPage(1); }}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] w-48"
        />
        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <span>Page size:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="rounded border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-[var(--foreground)]"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--background)]/50">
                <th className="text-left p-3 font-medium text-[var(--foreground)]">ID</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">User</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Status</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Category</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Created</th>
              </tr>
            </thead>
            <tbody>
              {thoughts.map((t) => (
                <tr key={t.id} className="border-b border-[var(--border)] hover:bg-[var(--card-hover)]/50">
                  <td className="p-3 font-mono text-xs text-[var(--foreground)]">{t.id.slice(0, 12)}…</td>
                  <td className="p-3">
                    <Link href={`/admin/users/${t.userId}`} className="text-[var(--primary)] hover:underline">
                      {t.user?.email ?? t.userId}
                    </Link>
                  </td>
                  <td className="p-3 text-[var(--muted-foreground)]">{t.status}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">{t.category ?? "—"}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">
                    {new Date(t.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
          Page {page} of {totalPages} ({totalCount} thoughts)
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
    </div>
  );
}
