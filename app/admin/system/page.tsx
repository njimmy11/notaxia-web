"use client";

import { useEffect, useState } from "react";
import { adminFetch, getApiUrl } from "@/lib/admin-api";

type Health = { status?: string; timestamp?: string; version?: string };
type Config = {
  nodeEnv?: string;
  adminOtpExpiryMinutes?: number;
  adminOtpRateLimitPerEmail?: number;
  freeTierLimits?: { thoughtsPerMonth: number; voiceMinutesPerMonth: number; documentsPerMonth: number };
};
type DbHealth = { db: "ok" | "error" };

export default function AdminSystemPage() {
  const [health, setHealth] = useState<Health | null>(null);
  const [config, setConfig] = useState<Config | null>(null);
  const [dbHealth, setDbHealth] = useState<DbHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const base = getApiUrl().replace(/\/$/, "");

    Promise.all([
      fetch(`${base}/api/health`).then((res) => res.json()).then((json) => json?.data ?? json),
      adminFetch<Config>("/admin/config").then((r) => r.ok ? r.data : null),
      adminFetch<DbHealth>("/admin/health/db").then((r) => (r.ok ? r.data : r.status === 503 ? { db: "error" as const } : null)),
    ])
      .then(([h, c, d]) => {
        setHealth(h);
        setConfig(c ?? null);
        setDbHealth(d ?? null);
        if (!h?.status && !h?.version) setError("Invalid health response");
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

      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 max-w-xl mb-6">
        <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Database</h2>
        {dbHealth ? (
          <p className={`font-medium ${dbHealth.db === "ok" ? "text-green-600" : "text-red-500"}`}>
            {dbHealth.db === "ok" ? "Connected" : "Connection failed"}
          </p>
        ) : (
          <p className="text-[var(--muted-foreground)]">—</p>
        )}
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 max-w-xl">
        <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Config (non-secret)</h2>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-[var(--muted-foreground)]">Node env</dt>
            <dd className="font-medium text-[var(--foreground)]">{config?.nodeEnv ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted-foreground)]">Admin OTP expiry (min)</dt>
            <dd className="text-[var(--foreground)]">{config?.adminOtpExpiryMinutes ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted-foreground)]">Admin OTP rate limit</dt>
            <dd className="text-[var(--foreground)]">{config?.adminOtpRateLimitPerEmail ?? "—"} per window</dd>
          </div>
        </dl>
        {config?.freeTierLimits && (
          <>
            <h3 className="text-sm font-medium text-[var(--foreground)] mt-4 mb-2">Free tier limits (read-only)</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-[var(--muted-foreground)]">Thoughts per month</dt>
                <dd className="font-medium text-[var(--foreground)]">{config.freeTierLimits.thoughtsPerMonth}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted-foreground)]">Voice minutes per month</dt>
                <dd className="font-medium text-[var(--foreground)]">{config.freeTierLimits.voiceMinutesPerMonth}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted-foreground)]">Documents per month</dt>
                <dd className="font-medium text-[var(--foreground)]">{config.freeTierLimits.documentsPerMonth}</dd>
              </div>
            </dl>
          </>
        )}
        <p className="mt-2 text-xs text-[var(--muted-foreground)]">
          Sensitive env (JWT_SECRET, DB, etc.) are never exposed to the client.
        </p>
      </section>
    </div>
  );
}
