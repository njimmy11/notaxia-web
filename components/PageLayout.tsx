"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Nav */}
      <nav className="fixed left-0 right-0 top-0 z-50 px-6 py-4 glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Notaxia" width={140} height={40} className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Blog</Link>
            <Link href="/about" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">About</Link>
            <Link href="/changelog" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Changelog</Link>
            <Link href="/support" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Support</Link>
          </div>
        </div>
      </nav>

      {/* Header with gradient */}
      <header className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background gradient orb */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-[100px]"
          style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)" }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              className="mt-4 text-lg text-[var(--muted)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold gradient-text">Notaxia</Link>
            <span className="text-[var(--muted)] text-sm">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/blog" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Blog</Link>
            <Link href="/about" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">About</Link>
            <Link href="/changelog" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Changelog</Link>
            <Link href="/support" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Support</Link>
            <Link href="/privacy" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
