"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.notaxia.com";

export default function AdminSystemPage() {
  const [health, setHealth] = useState<{ status?: string; timestamp?: string; version?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const base = API_URL.replace(/\/$/, "");
    fetch(`${base}/api/health`)
      .then((res) => res.json())
      .then((json) => {
        setHealth(json?.data ?? json);
        if (!json?.data?.status && !json?.status) setError("Invalid health response");
      })
      .catch(() => setError("Could not reach API"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-6">System</h1>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 max-w-xl mb-6">
        <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Health</h2>
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : health ? (
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-[var(--muted-foreground)]">Status</dt>
              <dd className="font-medium text-[var(--foreground)]">{health.status ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Version</dt>
              <dd className="text-[var(--foreground)]">{health.version ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Timestamp</dt>
              <dd className="text-[var(--foreground)]">
                {health.timestamp ? new Date(health.timestamp).toLocaleString() : "—"}
              </dd>
            </div>
          </dl>
        ) : null}
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 max-w-xl">
        <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Config (non-secret)</h2>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-[var(--muted-foreground)]">API URL</dt>
            <dd className="text-[var(--foreground)] font-mono text-xs truncate max-w-[200px]" title={API_URL}>
              {API_URL}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--muted-foreground)]">Node env</dt>
            <dd className="text-[var(--foreground)]">(server-only)</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-[var(--muted-foreground)]">
          Sensitive env (JWT_SECRET, DB, etc.) are never exposed to the client.
        </p>
      </section>
    </div>
  );
}
