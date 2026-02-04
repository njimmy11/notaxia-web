"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-api";

type UserDetail = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  plan: string;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  subscriptionExpiresAt: string | null;
  usageResetAt: string;
  thoughtsProcessedThisPeriod: number;
  voiceMinutesThisPeriod: number;
  documentsProcessedThisPeriod: number;
  pushTokens: string[];
  banned?: boolean;
  bannedAt?: string | null;
  bannedReason?: string | null;
  _count: {
    thoughts: number;
    notes: number;
    documents: number;
    voiceNotes: number;
    reminders: number;
    dailyReflections?: number;
    thoughtClusters?: number;
  };
};

type ThoughtRow = {
  id: string;
  userId: string;
  status: string;
  category: string | null;
  createdAt: string;
  content?: string | null;
  user: { email: string; name: string };
};

export default function AdminUserDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  const [grantProExpiry, setGrantProExpiry] = useState("");
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [recentThoughts, setRecentThoughts] = useState<ThoughtRow[]>([]);
  const [thoughtsLoading, setThoughtsLoading] = useState(false);
  const [processThoughtId, setProcessThoughtId] = useState<string | null>(null);

  function refetch() {
    if (!id) return;
    adminFetch<UserDetail>(`/admin/users/${id}`)
      .then((res) => { if (res.ok && res.data) setUser(res.data); });
  }

  useEffect(() => {
    if (!id) return;
    adminFetch<UserDetail>(`/admin/users/${id}`)
      .then((res) => {
        if (res.ok && res.data) setUser(res.data);
        else setError(res.error || "User not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setThoughtsLoading(true);
    adminFetch<{ thoughts: ThoughtRow[] }>(`/admin/thoughts?userId=${id}&limit=10&includeContent=true&includeArchived=1`)
      .then((res) => {
        if (res.ok && res.data?.thoughts) setRecentThoughts(res.data.thoughts);
      })
      .finally(() => setThoughtsLoading(false));
  }, [id]);

  async function handleGrantPro() {
    if (!id) return;
    setActionLoading("grant-pro");
    try {
      const res = await adminFetch(`/admin/users/${id}/grant-pro`, {
        method: "POST",
        body: JSON.stringify({ subscriptionExpiresAt: grantProExpiry || null }),
      });
      if (res.ok) {
        setShowGrantModal(false);
        setGrantProExpiry("");
        refetch();
      }
    } finally {
      setActionLoading("");
    }
  }

  async function handleResetUsage() {
    if (!id || !confirm("Reset usage counters for this user?")) return;
    setActionLoading("reset-usage");
    try {
      const res = await adminFetch(`/admin/users/${id}/reset-usage`, { method: "POST" });
      if (res.ok) refetch();
    } finally {
      setActionLoading("");
    }
  }

  async function handleResendVerification() {
    if (!id) return;
    setActionLoading("resend");
    try {
      await adminFetch(`/admin/users/${id}/resend-verification`, { method: "POST" });
    } finally {
      setActionLoading("");
    }
  }

  async function handleBan() {
    if (!id) return;
    setActionLoading("ban");
    try {
      const res = await adminFetch(`/admin/users/${id}/ban`, {
        method: "POST",
        body: JSON.stringify({ reason: banReason || undefined }),
      });
      if (res.ok) {
        setShowBanModal(false);
        setBanReason("");
        refetch();
      } else {
        alert(res.error || "Failed to ban");
      }
    } finally {
      setActionLoading("");
    }
  }

  async function handleUnban() {
    if (!id || !confirm("Unban this user?")) return;
    setActionLoading("unban");
    try {
      const res = await adminFetch(`/admin/users/${id}/unban`, { method: "POST" });
      if (res.ok) refetch();
    } finally {
      setActionLoading("");
    }
  }

  async function handleDeleteUser() {
    if (!id || !confirm("Permanently delete this user and all their data? This cannot be undone.")) return;
    setActionLoading("delete");
    try {
      const res = await adminFetch(`/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        window.location.href = "/admin/users";
      } else {
        alert(res.error || "Failed to delete");
      }
    } finally {
      setActionLoading("");
    }
  }

  async function handleManualProcessThought(thoughtId: string) {
    setProcessThoughtId(thoughtId);
    try {
      const res = await adminFetch(`/admin/thoughts/${thoughtId}/process`, { method: "POST" });
      if (res.ok) {
        setRecentThoughts((prev) =>
          prev.map((t) => (t.id === thoughtId ? { ...t, status: "PROCESSING" } : t))
        );
      }
    } finally {
      setProcessThoughtId(null);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[var(--muted-foreground)]">Loading…</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-8">
        <p className="text-red-400">{error || "User not found"}</p>
        <Link href="/admin/users" className="mt-2 inline-block text-[var(--primary)] hover:underline">
          ← Back to users
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link href="/admin/users" className="text-sm text-[var(--primary)] hover:underline mb-4 inline-block">
        ← Back to users
      </Link>
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-6">{user.name}</h1>

      <div className="space-y-6 max-w-2xl">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Profile</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-[var(--muted-foreground)]">Email</dt>
              <dd className="font-medium text-[var(--foreground)]">{user.email}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Created</dt>
              <dd className="text-[var(--foreground)]">{new Date(user.createdAt).toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Email verified</dt>
              <dd className="text-[var(--foreground)]">{user.emailVerified ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Push tokens</dt>
              <dd className="text-[var(--foreground)]">{user.pushTokens?.length ?? 0}</dd>
            </div>
            {user.banned && (
              <>
                <div>
                  <dt className="text-[var(--muted-foreground)]">Banned</dt>
                  <dd className="font-medium text-red-500">Yes</dd>
                </div>
                {user.bannedAt && (
                  <div>
                    <dt className="text-[var(--muted-foreground)]">Banned at</dt>
                    <dd className="text-[var(--foreground)]">{new Date(user.bannedAt).toLocaleString()}</dd>
                  </div>
                )}
                {user.bannedReason && (
                  <div>
                    <dt className="text-[var(--muted-foreground)]">Reason</dt>
                    <dd className="text-[var(--foreground)]">{user.bannedReason}</dd>
                  </div>
                )}
              </>
            )}
          </dl>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Subscription</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-[var(--muted-foreground)]">Plan</dt>
              <dd className="font-medium text-[var(--foreground)]">{user.plan}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Expires</dt>
              <dd className="text-[var(--foreground)]">
                {user.subscriptionExpiresAt
                  ? new Date(user.subscriptionExpiresAt).toLocaleDateString()
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Usage reset at</dt>
              <dd className="text-[var(--foreground)]">{new Date(user.usageResetAt).toLocaleDateString()}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Usage this period</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <div>
              <dt className="text-[var(--muted-foreground)]">Thoughts processed</dt>
              <dd className="font-medium text-[var(--foreground)]">{user.thoughtsProcessedThisPeriod}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Voice minutes</dt>
              <dd className="font-medium text-[var(--foreground)]">{user.voiceMinutesThisPeriod}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Documents processed</dt>
              <dd className="font-medium text-[var(--foreground)]">{user.documentsProcessedThisPeriod}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Actions</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowGrantModal(true)}
              disabled={!!actionLoading}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] disabled:opacity-50"
            >
              Grant Pro
            </button>
            <button
              type="button"
              onClick={handleResetUsage}
              disabled={!!actionLoading}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] disabled:opacity-50"
            >
              Reset usage
            </button>
            {!user.emailVerified && (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={!!actionLoading}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] disabled:opacity-50"
              >
                Resend verification email
              </button>
            )}
            {user.banned ? (
              <button
                type="button"
                onClick={handleUnban}
                disabled={!!actionLoading}
                className="rounded-lg border border-amber-600 bg-amber-500/10 px-3 py-2 text-sm font-medium text-amber-600 hover:bg-amber-500/20 disabled:opacity-50"
              >
                Unban user
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowBanModal(true)}
                disabled={!!actionLoading}
                className="rounded-lg border border-red-600 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-500/20 disabled:opacity-50"
              >
                Ban user
              </button>
            )}
            <button
              type="button"
              onClick={handleDeleteUser}
              disabled={!!actionLoading}
              className="rounded-lg border border-red-700 bg-red-600/20 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-600/30 disabled:opacity-50"
            >
              Delete user
            </button>
          </div>
          {showGrantModal && (
            <div className="mt-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--background)]">
              <p className="text-sm text-[var(--foreground)] mb-2">Grant Pro (optional expiry date):</p>
              <input
                type="date"
                value={grantProExpiry}
                onChange={(e) => setGrantProExpiry(e.target.value)}
                className="rounded border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-sm text-[var(--foreground)] mr-2"
              />
              <button
                type="button"
                onClick={handleGrantPro}
                disabled={actionLoading === "grant-pro"}
                className="rounded-lg bg-[var(--primary)] text-white px-3 py-1.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => { setShowGrantModal(false); setGrantProExpiry(""); }}
                className="ml-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)]"
              >
                Cancel
              </button>
            </div>
          )}
          {showBanModal && (
            <div className="mt-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--background)]">
              <p className="text-sm text-[var(--foreground)] mb-2">Ban user (optional reason):</p>
              <input
                type="text"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="Reason for ban"
                className="rounded border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-sm text-[var(--foreground)] w-full mb-2"
              />
              <button
                type="button"
                onClick={handleBan}
                disabled={actionLoading === "ban"}
                className="rounded-lg bg-red-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-red-700 disabled:opacity-50"
              >
                Ban user
              </button>
              <button
                type="button"
                onClick={() => { setShowBanModal(false); setBanReason(""); }}
                className="ml-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)]"
              >
                Cancel
              </button>
            </div>
          )}
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Recent thoughts (including archived)</h2>
          {thoughtsLoading ? (
            <p className="text-sm text-[var(--muted-foreground)]">Loading…</p>
          ) : recentThoughts.length === 0 ? (
            <p className="text-sm text-[var(--muted-foreground)]">No thoughts yet.</p>
          ) : (
            <ul className="space-y-2">
              {recentThoughts.map((t) => (
                <li
                  key={t.id}
                  className="rounded-lg border border-[var(--border)] bg-[var(--background)]/50 p-3 text-sm"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[var(--muted-foreground)]">
                      {new Date(t.createdAt).toLocaleString()}
                    </span>
                    <span
                      className={
                        t.status === "RAW"
                          ? "text-amber-500"
                          : t.status === "PROCESSING"
                            ? "text-blue-500"
                            : t.status === "ARCHIVED"
                              ? "text-purple-500"
                              : "text-[var(--muted-foreground)]"
                      }
                    >
                      {t.status}
                    </span>
                    {t.category && (
                      <span className="text-[var(--muted-foreground)]">{t.category}</span>
                    )}
                  </div>
                  {t.content != null && t.content !== "" && (
                    <div className="text-[var(--foreground)] mb-2 whitespace-pre-wrap break-words rounded border border-[var(--border)] bg-[var(--card)] p-2 text-sm">
                      {t.content}
                    </div>
                  )}
                  {(t.status === "RAW" || t.status === "FAILED") && (
                    <button
                      type="button"
                      onClick={() => handleManualProcessThought(t.id)}
                      disabled={processThoughtId === t.id}
                      className="rounded border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] disabled:opacity-50"
                    >
                      {processThoughtId === t.id ? "Processing…" : "Manual process"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h2 className="text-lg font-medium text-[var(--foreground)] mb-3">Counts</h2>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            <div>
              <dt className="text-[var(--muted-foreground)]">Thoughts</dt>
              <dd className="font-medium text-[var(--foreground)]">{user._count?.thoughts ?? 0}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Notes</dt>
              <dd className="font-medium text-[var(--foreground)]">{user._count?.notes ?? 0}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Documents</dt>
              <dd className="font-medium text-[var(--foreground)]">{user._count?.documents ?? 0}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Voice notes</dt>
              <dd className="font-medium text-[var(--foreground)]">{user._count?.voiceNotes ?? 0}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted-foreground)]">Reminders</dt>
              <dd className="font-medium text-[var(--foreground)]">{user._count?.reminders ?? 0}</dd>
            </div>
            {user._count?.dailyReflections != null && (
              <div>
                <dt className="text-[var(--muted-foreground)]">Daily reflections</dt>
                <dd className="font-medium text-[var(--foreground)]">{user._count.dailyReflections}</dd>
              </div>
            )}
            {user._count?.thoughtClusters != null && (
              <div>
                <dt className="text-[var(--muted-foreground)]">Thought clusters</dt>
                <dd className="font-medium text-[var(--foreground)]">{user._count.thoughtClusters}</dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </div>
  );
}
