"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-api";

type UserRow = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  plan: string;
  emailVerified: boolean;
  _count: {
    thoughts: number;
    notes: number;
    documents: number;
    voiceNotes: number;
    reminders: number;
  };
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminFetch<UserRow[]>("/admin/users")
      .then((res) => {
        if (res.ok && Array.isArray(res.data)) setUsers(res.data);
        else setError(res.error || "Failed to load users");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading users…</p>
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Users</h1>
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search by email or name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
        />
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
      <p className="mt-4 text-sm text-[var(--muted-foreground)]">
        {filtered.length} user{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
