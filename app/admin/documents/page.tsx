"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

type DocRow = {
  id: string;
  title: string | null;
  status: string;
  fileType: string;
  errorMessage: string | null;
  createdAt: string;
  uploadedBy: { id: string; email: string; name: string };
};

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    adminFetch<DocRow[]>("/admin/documents")
      .then((res) => {
        if (res.ok && Array.isArray(res.data)) setDocs(res.data);
        else setError(res.error || "Failed to load documents");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    statusFilter === ""
      ? docs
      : docs.filter((d) => d.status.toLowerCase() === statusFilter.toLowerCase());

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading documents…</p>
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
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Documents</h1>
      <div className="mb-4 flex gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
        >
          <option value="">All statuses</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--background)]/50">
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Title</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">User</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Status</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Type</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Created</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Error</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-[var(--border)] hover:bg-[var(--card-hover)]/50">
                  <td className="p-3 text-[var(--foreground)]">{d.title || "—"}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">
                    {d.uploadedBy?.email ?? d.uploadedBy?.name ?? "—"}
                  </td>
                  <td className="p-3">
                    <span
                      className={
                        d.status === "FAILED"
                          ? "text-red-400"
                          : d.status === "PROCESSING"
                            ? "text-amber-400"
                            : "text-[var(--muted-foreground)]"
                      }
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--muted-foreground)]">{d.fileType}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">
                    {new Date(d.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 text-red-400 max-w-xs truncate" title={d.errorMessage ?? undefined}>
                    {d.status === "FAILED" ? (d.errorMessage || "—") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-sm text-[var(--muted-foreground)]">
        {filtered.length} document{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
