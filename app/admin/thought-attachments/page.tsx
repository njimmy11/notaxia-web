"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-api";

type AttachmentRow = {
  thoughtId: string;
  userId: string;
  userEmail: string;
  userName: string | null;
  thoughtCreatedAt: string;
  type: "image" | "document" | "audio";
  url: string;
  filename?: string;
  durationSeconds?: number;
};

type ThoughtAttachmentsRes = {
  attachments: AttachmentRow[];
  totalThoughtsWithAttachments: number;
  page: number;
  limit: number;
};

export default function AdminThoughtAttachmentsPage() {
  const [data, setData] = useState<ThoughtAttachmentsRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [typeFilter, setTypeFilter] = useState<string>("");

  useEffect(() => {
    adminFetch<ThoughtAttachmentsRes>(
      `/admin/thought-attachments?page=${page}&limit=${pageSize}`
    )
      .then((res) => {
        if (res.ok && res.data) setData(res.data);
        else setError(res.error || "Failed to load thought attachments");
      })
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  const attachments = data?.attachments ?? [];
  const totalThoughts = data?.totalThoughtsWithAttachments ?? 0;
  const totalPages = Math.ceil(totalThoughts / pageSize) || 1;

  const filtered =
    typeFilter === ""
      ? attachments
      : attachments.filter((a) => a.type === typeFilter);

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
        Thought attachments
      </h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-4">
        Files and media stored <strong>inside thought records</strong> (
        <code>Thought.imageUrls</code>, <code>Thought.documents</code>,{" "}
        <code>Thought.audios</code>). These are the attachments users add when
        capturing a thought (images, documents, voice). This is separate from
        the standalone Document table.
      </p>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)]"
        >
          <option value="">All types</option>
          <option value="image">Image</option>
          <option value="document">Document</option>
          <option value="audio">Audio</option>
        </select>
        <div className="text-sm text-[var(--muted-foreground)]">
          {filtered.length} attachment(s) from {totalThoughts} thought(s) on
          this page
        </div>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--background)]/50">
                <th className="text-left p-3 font-medium text-[var(--foreground)]">
                  Type
                </th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">
                  Thought
                </th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">
                  User
                </th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">
                  Created
                </th>
                <th className="text-left p-3 font-medium text-[var(--foreground)]">
                  File / URL
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, idx) => (
                <tr
                  key={`${a.thoughtId}-${a.type}-${idx}`}
                  className="border-b border-[var(--border)] hover:bg-[var(--card-hover)]/50"
                >
                  <td className="p-3">
                    <span
                      className={
                        a.type === "image"
                          ? "text-green-600"
                          : a.type === "audio"
                            ? "text-purple-500"
                            : "text-amber-500"
                      }
                    >
                      {a.type}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/admin/users/${a.userId}`}
                      className="text-[var(--primary)] hover:underline font-mono text-xs"
                      title={`Thought ${a.thoughtId} (view user’s recent thoughts)`}
                    >
                      {a.thoughtId.slice(0, 12)}…
                    </Link>
                  </td>
                  <td className="p-3 text-[var(--muted-foreground)]">
                    {a.userEmail || a.userName || a.userId}
                  </td>
                  <td className="p-3 text-[var(--muted-foreground)]">
                    {new Date(a.thoughtCreatedAt).toLocaleString()}
                  </td>
                  <td className="p-3 max-w-xs">
                    {a.filename && (
                      <span className="text-[var(--foreground)] block truncate">
                        {a.filename}
                      </span>
                    )}
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline truncate block"
                      title={a.url}
                    >
                      {a.url.length > 50 ? a.url.slice(0, 50) + "…" : a.url}
                    </a>
                    {a.durationSeconds != null && (
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {a.durationSeconds}s
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filtered.length === 0 && !loading && (
        <p className="mt-4 text-[var(--muted-foreground)]">
          No attachments in this range. Thoughts that have images, documents, or
          audio stored in their record will appear here.
        </p>
      )}
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
          Page {page} of {totalPages} ({totalThoughts} thoughts with
          attachments)
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
