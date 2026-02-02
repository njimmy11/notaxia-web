"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    adminFetch<UserDetail>(`/admin/users/${id}`)
      .then((res) => {
        if (res.ok && res.data) setUser(res.data);
        else setError(res.error || "User not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

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
