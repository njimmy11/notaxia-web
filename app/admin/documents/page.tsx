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

type DocumentsRes = {
  documents: DocRow[];
  totalCount: number;
  page: number;
  limit: number;
};

export default function AdminDocumentsPage() {
  const [data, setData] = useState<DocumentsRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [retrying, setRetrying] = useState<string | null>(null);

  function refetch() {
    adminFetch<DocumentsRes>(`/admin/documents?page=${page}&limit=${pageSize}`)
      .then((res) => {
        if (res.ok && res.data) setData(res.data);
      });
  }

  useEffect(() => {
    adminFetch<DocumentsRes>(`/admin/documents?page=${page}&limit=${pageSize}`)
      .then((res) => {
        if (res.ok && res.data) setData(res.data);
        else setError(res.error || "Failed to load documents");
      })
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  const docs = data?.documents ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const filtered =
    statusFilter === ""
      ? docs
      : docs.filter((d) => d.status.toLowerCase() === statusFilter.toLowerCase());

  async function handleRetry(docId: string) {
    setRetrying(docId);
    try {
      const res = await adminFetch(`/admin/documents/${docId}/retry`, { method: "POST" });
      if (res.ok) refetch();
    } finally {
      setRetrying(null);
    }
  }

  if (loading && !data) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading documents…</p>
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
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Documents</h1>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
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
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Title</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">User</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Status</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Type</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Created</th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">Error</th>
                <th className="p-3 font-medium text-[var(--foreground)]">Actions</th>
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
                  <td className="p-3">
                    {d.status === "FAILED" && (
                      <button
                        type="button"
                        onClick={() => handleRetry(d.id)}
                        disabled={retrying === d.id}
                        className="rounded border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] disabled:opacity-50"
                      >
                        {retrying === d.id ? "Retrying…" : "Retry"}
                      </button>
                    )}
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
          Page {page} of {totalPages} ({totalCount} documents)
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
