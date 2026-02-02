"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminFetch, setAdminToken } from "@/lib/admin-api";

type Step = "email" | "code";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await adminFetch<{ sent?: boolean }>("/admin/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ email: email.trim() }),
    });
    setLoading(false);
    if (res.ok) {
      setStep("code");
    } else {
      setError(res.error || "Could not send code. Check that this email is an admin.");
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await adminFetch<{ accessToken?: string; user?: { id: string; email: string; name: string } }>(
      "/admin/auth/verify-otp",
      {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), code: code.trim().replace(/\s/g, "") }),
      }
    );
    setLoading(false);
    if (res.ok && res.data?.accessToken) {
      setAdminToken(res.data.accessToken);
      router.replace("/admin");
      router.refresh();
    } else {
      setError(res.error || "Invalid or expired code.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--background)]">
      <div className="w-full max-w-sm rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-[var(--foreground)] mb-1">Admin sign in</h1>
        <p className="text-sm text-[var(--muted-foreground)] mb-6">
          We’ll send a one-time code to your email.
        </p>

        {step === "email" ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-[var(--muted-foreground)]">
              Code sent to <strong className="text-[var(--foreground)]">{email}</strong>. Check your inbox.
            </p>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                required
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] text-center text-lg tracking-[0.5em] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError("");
                }}
                className="flex-1 rounded-lg border border-[var(--border)] px-4 py-2 text-[var(--foreground)] hover:bg-[var(--card-hover)]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || code.length < 6}
                className="flex-1 rounded-lg bg-[var(--primary)] px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Checking…" : "Sign in"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center">
          <Link href="/" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
            ← Back to Notaxia
          </Link>
        </p>
      </div>
    </div>
  );
}
