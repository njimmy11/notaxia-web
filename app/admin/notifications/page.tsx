"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

type UserRow = { id: string; email: string; name: string };
type SendResult = { sent: number; failed: number; usersTargeted: number; usersWithNoTokens: number };

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [target, setTarget] = useState<"all" | "selected">("all");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [userSearch, setUserSearch] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (target === "selected") {
      setLoadingUsers(true);
      adminFetch<{ users: UserRow[] }>("/admin/users?limit=500")
        .then((res) => {
          if (res.ok && res.data?.users) setUsers(res.data.users);
        })
        .finally(() => setLoadingUsers(false));
    }
  }, [target]);

  const filteredUsers = userSearch.trim()
    ? users.filter(
        (u) =>
          u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
          (u.name && u.name.toLowerCase().includes(userSearch.toLowerCase()))
      )
    : users;

  function toggleUser(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    setSelectedIds(new Set(filteredUsers.map((u) => u.id)));
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!body.trim()) {
      setError("Description is required.");
      return;
    }
    if (target === "selected" && selectedIds.size === 0) {
      setError("Select at least one user, or choose “All users”.");
      return;
    }

    setSending(true);
    try {
      const payload =
        target === "all"
          ? { title: title.trim(), body: body.trim() }
          : { title: title.trim(), body: body.trim(), userIds: Array.from(selectedIds) };
      const res = await adminFetch<SendResult>("/admin/notifications/send", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (res.ok && res.data) {
        setResult(res.data);
        setTitle("");
        setBody("");
        setSelectedIds(new Set());
      } else {
        setError(res.error || "Failed to send.");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-6">Send notification</h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-6">
        Send a push notification to users. Only users who have the app and have registered a push token will receive it.
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. New feature available"
            maxLength={100}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Description
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="e.g. Check out the new daily reflection in the app."
            rows={4}
            maxLength={500}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-[var(--foreground)] mb-2">Target</span>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="target"
                checked={target === "all"}
                onChange={() => setTarget("all")}
                className="rounded-full border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="text-[var(--foreground)]">All users (with push tokens)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="target"
                checked={target === "selected"}
                onChange={() => setTarget("selected")}
                className="rounded-full border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <span className="text-[var(--foreground)]">Selected users</span>
            </label>
          </div>
        </div>

        {target === "selected" && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex flex-wrap gap-2 items-center mb-3">
              <input
                type="search"
                placeholder="Search by email or name…"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="flex-1 min-w-[200px] rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
              />
              <button
                type="button"
                onClick={selectAll}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--card-hover)]"
              >
                Select all
              </button>
              <button
                type="button"
                onClick={clearSelection}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--card-hover)]"
              >
                Clear
              </button>
            </div>
            {loadingUsers ? (
              <p className="text-sm text-[var(--muted-foreground)]">Loading users…</p>
            ) : (
              <div className="max-h-48 overflow-y-auto space-y-1 text-sm">
                {filteredUsers.length === 0 ? (
                  <p className="text-[var(--muted-foreground)]">No users match.</p>
                ) : (
                  filteredUsers.map((u) => (
                    <label key={u.id} className="flex items-center gap-2 cursor-pointer hover:bg-[var(--card-hover)]/50 rounded px-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(u.id)}
                        onChange={() => toggleUser(u.id)}
                        className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                      <span className="text-[var(--foreground)]">{u.email}</span>
                      {u.name && (
                        <span className="text-[var(--muted-foreground)]">({u.name})</span>
                      )}
                    </label>
                  ))
                )}
              </div>
            )}
            {target === "selected" && selectedIds.size > 0 && (
              <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                {selectedIds.size} user{selectedIds.size !== 1 ? "s" : ""} selected
              </p>
            )}
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {result && (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--foreground)]">
            <p className="font-medium text-green-600 mb-1">Notification sent</p>
            <ul className="list-disc list-inside text-[var(--muted-foreground)]">
              <li>{result.usersTargeted} user(s) targeted</li>
              <li>{result.sent} notification(s) delivered</li>
              {result.failed > 0 && <li>{result.failed} failed</li>}
              {result.usersWithNoTokens > 0 && (
                <li>{result.usersWithNoTokens} user(s) had no push tokens</li>
              )}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={sending}
          className="rounded-lg bg-[var(--primary)] text-white px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send notification"}
        </button>
      </form>
    </div>
  );
}
