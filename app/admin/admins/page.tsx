"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

type AdminRow = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revoking, setRevoking] = useState<string | null>(null);

  function refetch() {
    adminFetch<AdminRow[]>("/admin/admins")
      .then((res) => {
        if (res.ok && Array.isArray(res.data)) setAdmins(res.data);
      });
  }

  useEffect(() => {
    adminFetch<AdminRow[]>("/admin/admins")
      .then((res) => {
        if (res.ok && Array.isArray(res.data)) setAdmins(res.data);
        else setError(res.error || "Failed to load admins");
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleRevoke(id: string, email: string) {
    if (!confirm(`Revoke admin access for ${email}? They will no longer be able to log in to the admin dashboard.`)) return;
    setRevoking(id);
    try {
      const res = await adminFetch(`/admin/users/${id}/revoke-admin`, { method: "POST" });
      if (res.ok) refetch();
    } finally {
      setRevoking(null);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading admins…</p>
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
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Admins</h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-4">
        Users with admin access can log in via OTP and access the admin dashboard. Revoking removes their access.
      </p>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--background)]/50">
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Email</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Name</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Created</th>
                <th className="p-3 font-medium text-[var(--foreground)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} className="border-b border-[var(--border)] hover:bg-[var(--card-hover)]/50">
                  <td className="p-3 text-[var(--foreground)]">{a.email}</td>
                  <td className="p-3 text-[var(--foreground)]">{a.name}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">
                    {new Date(a.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => handleRevoke(a.id, a.email)}
                      disabled={revoking === a.id}
                      className="rounded border border-red-500/50 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-500/20 disabled:opacity-50"
                    >
                      {revoking === a.id ? "Revoking…" : "Revoke admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {admins.length === 0 && (
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">No admins found.</p>
      )}
    </div>
  );
}
