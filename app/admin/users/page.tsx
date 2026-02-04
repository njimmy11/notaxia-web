"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch, getApiUrl } from "@/lib/admin-api";

type UserRow = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  plan: string;
  emailVerified: boolean;
  banned?: boolean;
  _count: {
    thoughts: number;
    notes: number;
    documents: number;
    voiceNotes: number;
    reminders: number;
  };
};

type UsersRes = {
  users: UserRow[];
  totalCount: number;
  page: number;
  limit: number;
};

export default function AdminUsersPage() {
  const [data, setData] = useState<UsersRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  useEffect(() => {
    adminFetch<UsersRes>(`/admin/users?page=${page}&limit=${pageSize}`)
      .then((res) => {
        if (res.ok && res.data) setData(res.data);
        else setError(res.error || "Failed to load users");
      })
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  const users = data?.users ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleExportCsv() {
    const base = getApiUrl().replace(/\/$/, "");
    const token = typeof window !== "undefined" ? localStorage.getItem("notaxia_admin_token") : null;
    const res = await fetch(`${base}/api/admin/export/users`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading && !data) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading users…</p>
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
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Users</h1>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="search"
          placeholder="Search by email or name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
        />
        <button
          type="button"
          onClick={handleExportCsv}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)]"
        >
          Export CSV
        </button>
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
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Email</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Name</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Plan</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Verified</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Banned</th>
                <th className="text-right p-3 font-medium text-[var(--foreground)]">Thoughts</th>
                <th className="text-right p-3 font-medium text-[var(--foreground)]">Notes</th>
                <th className="text-right p-3 font-medium text-[var(--foreground)]">Docs</th>
                <th className="text-right p-3 font-medium text-[var(--foreground)]">Voice</th>
                <th className="text-right p-3 font-medium text-[var(--foreground)]">Reminders</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Created</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-[var(--border)] hover:bg-[var(--card-hover)]/50">
                  <td className="p-3 text-[var(--foreground)]">{u.email}</td>
                  <td className="p-3 text-[var(--foreground)]">{u.name}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">{u.plan}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">{u.emailVerified ? "Yes" : "No"}</td>
                  <td className="p-3">
                    {u.banned ? (
                      <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-xs font-medium text-red-600">Banned</span>
                    ) : (
                      <span className="text-[var(--muted-foreground)]">—</span>
                    )}
                  </td>
                  <td className="p-3 text-right text-[var(--muted-foreground)]">{u._count?.thoughts ?? 0}</td>
                  <td className="p-3 text-right text-[var(--muted-foreground)]">{u._count?.notes ?? 0}</td>
                  <td className="p-3 text-right text-[var(--muted-foreground)]">{u._count?.documents ?? 0}</td>
                  <td className="p-3 text-right text-[var(--muted-foreground)]">{u._count?.voiceNotes ?? 0}</td>
                  <td className="p-3 text-right text-[var(--muted-foreground)]">{u._count?.reminders ?? 0}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="text-[var(--primary)] hover:underline"
                    >
                      View
                    </Link>
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
    </div>
  );
}
