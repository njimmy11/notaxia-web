"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminToken } from "@/lib/admin-api";

// Thought-centric architecture: documents and voice are mostly stored inside thought
// records (Thought.documents, Thought.imageUrls, Thought.audios). "Thought attachments"
// and user detail "Recent thoughts" cover those. The standalone Document and VoiceNote
// tables are optional pipelines (OCR upload, standalone voice upload); their admin
// pages are still at /admin/documents and /admin/voice-notes but not in nav.
const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/thought-attachments", label: "Thought attachments" },
  { href: "/admin/subscriptions", label: "Subscriptions" },
  { href: "/admin/thoughts", label: "Thoughts" },
  { href: "/admin/notifications", label: "Notifications" },
  { href: "/admin/admins", label: "Admins" },
  { href: "/admin/system", label: "System" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  function handleLogout() {
    clearAdminToken();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--card)] flex flex-col">
      <div className="p-4 border-b border-[var(--border)]">
        <Link href="/admin" className="font-semibold text-[var(--foreground)]">
          Notaxia Admin
        </Link>
      </div>
      <nav className="flex-1 p-2 space-y-0.5">
        {navItems.map(({ href, label }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[var(--accent-soft)] text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-2 border-t border-[var(--border)]">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
