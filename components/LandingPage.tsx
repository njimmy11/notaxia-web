"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ============================================
// ICONS
// ============================================
const Icons = {
  lightning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5"/>
      <path d="m15.7 10.4-.9.4"/><path d="m9.2 13.2-.9.4"/><path d="m13.6 15.7-.4-.9"/><path d="m10.8 9.2-.4-.9"/><path d="m15.7 13.5-.9-.4"/><path d="m9.2 10.8-.9-.4"/><path d="m10.4 15.7.4-.9"/><path d="m13.2 9.2.4-.9"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  playStore: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="m3 20.5 9-9-9-9v18zm13.7-8.3-3.2-1.8 3.2-1.8 2.8 1.6c.5.3.5.8 0 1.1l-2.8 1.9zm-4.5-2.5L5 4.1l9.2 5.3-2 1.3zm0 1.6 2 1.3L5 19.9l7.2-8.6z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  widget: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
};

// ============================================
// GRID BACKGROUND
// ============================================
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// ============================================
// ANIMATED ORB BACKGROUND
// ============================================
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large primary orb - more visible */}
      <motion.div 
        className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[100px]"
        style={{ background: "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #06b6d4 100%)" }}
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0.4 }}
      />
      {/* Secondary orb */}
      <motion.div 
        className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[80px]"
        style={{ background: "linear-gradient(135deg, #06b6d4 0%, #0d9488 100%)" }}
        animate={{ 
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0.3 }}
      />
      {/* Accent orb center */}
      <motion.div 
        className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full blur-[120px]"
        style={{ background: "var(--accent)" }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ============================================
// FLOATING BADGES
// ============================================
function FloatingBadges() {
  const badges = [
    { label: "Voice Notes", icon: Icons.mic, position: "top-[15%] left-[5%] md:left-[10%]", delay: 0 },
    { label: "AI Powered", icon: Icons.brain, position: "top-[20%] right-[5%] md:right-[8%]", delay: 0.2 },
    { label: "Private - E2E Encrypted", icon: Icons.lock, position: "bottom-[25%] left-[8%] md:left-[15%]", delay: 0.4 },
    { label: "Photos", icon: Icons.camera, position: "bottom-[30%] right-[10%] md:right-[12%]", delay: 0.6 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className={`absolute ${badge.position}`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1 + badge.delay, duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[var(--primary)]">{badge.icon}</span>
            <span className="text-sm font-medium">{badge.label}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// PHONE MOCKUP WITH TYPING
// ============================================
function PhoneMockup() {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const phrases = [
    "call mom about birthday dinner",
    "idea: app that tracks habits",
    "meeting notes from standup",
    "remember to buy groceries",
    "book recommendation from Sarah",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isTyping) {
      if (charIndex < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 50 + Math.random() * 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isTyping, phraseIndex, phrases]);

  return (
    <motion.div 
      className="relative mt-12 mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Phone frame */}
      <div className="relative mx-auto w-[280px] sm:w-[320px]">
        {/* Animated gradient border */}
        <div className="absolute -inset-[2px] rounded-[32px] bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-cyan-400 opacity-60 blur-sm animate-gradient-shift" />
        <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-cyan-400 animate-gradient-shift" />
        
        {/* Phone body */}
        <div className="relative bg-[var(--card)] rounded-[30px] p-3 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />
          
          {/* Screen */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[22px] p-4 pt-8 min-h-[200px]">
            {/* Status bar */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-2 bg-gray-400 rounded-sm" />
              </div>
            </div>
            
            {/* Widget */}
            <div className="bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white shadow-lg">
                  {Icons.lightning}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">Quick thought</div>
                  <div className="text-sm font-medium min-h-[20px] text-white">
                    {displayText}
                    <motion.span 
                      className="inline-block w-0.5 h-4 bg-[var(--primary)] ml-0.5"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-700 text-gray-300 text-xs">
                  {Icons.mic}
                  <span>Voice</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-700 text-gray-300 text-xs">
                  {Icons.camera}
                  <span>Photo</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--primary)] text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <p className="text-center text-sm text-[var(--muted)] mt-4">
        Capture thoughts instantly from your home screen
      </p>
    </motion.div>
  );
}

// ============================================
// STAR RATING
// ============================================
function StarRating() {
  return (
    <motion.div 
      className="flex items-center gap-3 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <motion.span 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            {Icons.star}
          </motion.span>
        ))}
      </div>
      <span className="text-sm text-[var(--muted)]">
        <span className="font-semibold text-[var(--foreground)]">4.9</span> from 2,000+ reviews
      </span>
    </motion.div>
  );
}

// ============================================
// SCROLL INDICATOR
// ============================================
function ScrollIndicator() {
  return (
    <motion.div 
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <motion.div 
        className="flex flex-col items-center gap-2 text-[var(--muted)]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest font-medium">Discover</span>
        {Icons.chevronDown}
      </motion.div>
    </motion.div>
  );
}

// ============================================
// MAIN LANDING PAGE
// ============================================
export function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setNavScrolled(v > 100));
    return () => unsub();
  }, [scrollY]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
      {/* ============ NAV ============ */}
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 px-6 py-4 transition-all duration-300 ${
          navScrolled ? "glass shadow-lg" : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Notaxia" className="h-8 md:h-9 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Blog</Link>
            <Link href="/about" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">About</Link>
            <Link href="/changelog" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Changelog</Link>
            <a 
              href="https://apps.apple.com/app/notaxia"
              className="text-sm font-medium px-5 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity"
            >
              Get the app
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-32 overflow-hidden">
        <GridBackground />
        <GradientOrbs />
        <FloatingBadges />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-soft)] border border-[var(--primary)]/20 text-sm mb-8"
          >
            <motion.span 
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[var(--foreground)] font-medium">Now on iOS & Android</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            From chaos
            <br />
            <span className="gradient-text">to clarity.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-lg sm:text-xl md:text-2xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Capture your thoughts in one tap.
            <br />
            <span className="text-[var(--foreground)] font-medium">Notaxia understands the rest.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.a
              href="https://apps.apple.com/app/notaxia"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[var(--foreground)] px-8 font-semibold text-[var(--background)] shadow-2xl shadow-black/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-3">
                {Icons.apple}
                <span>Download for iOS</span>
              </span>
            </motion.a>
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.notaxia.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full border-2 border-[var(--border-strong)] bg-[var(--background)]/80 backdrop-blur px-8 font-semibold transition-all hover:border-[var(--primary)] hover:bg-[var(--accent-soft)] hover:scale-[1.02] active:scale-[0.98]"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {Icons.playStore}
              <span>Download for Android</span>
            </motion.a>
          </motion.div>

          {/* Star Rating */}
          <div className="flex justify-center">
            <StarRating />
          </div>

          {/* Phone Mockup */}
          <PhoneMockup />
        </div>

        <ScrollIndicator />
      </section>

      {/* ============ LOGOS / TRUST ============ */}
      <section className="py-12 border-y border-[var(--border)] bg-[var(--card)]/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-[var(--muted)] mb-6">Trusted by thinkers at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
            {["Google", "Apple", "Meta", "Stripe", "Notion"].map((company) => (
              <span key={company} className="text-lg font-semibold tracking-tight">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENTO FEATURES ============ */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Everything you need,
              <br />
              <span className="gradient-text">nothing you don't.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Large card - Capture */}
            <motion.div 
              className="group bento-card md:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-between min-h-[300px] lg:min-h-[400px] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--primary)]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white mb-6 shadow-lg shadow-[var(--primary)]/30">
                  {Icons.lightning}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Capture in one tap</h3>
                <p className="text-[var(--muted)] text-lg max-w-md">
                  Widget. Voice. Photo. Text. No app switching, no friction. Just get it out of your head.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                {[
                  { icon: Icons.mic, label: "Voice" },
                  { icon: Icons.camera, label: "Photo" },
                  { icon: Icons.widget, label: "Widget" },
                ].map((item) => (
                  <motion.div 
                    key={item.label}
                    className="flex-1 p-4 rounded-xl bg-[var(--accent-soft)] text-center cursor-pointer transition-colors hover:bg-[var(--primary)]/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-[var(--primary)] mb-2 flex justify-center">{item.icon}</div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Understanding */}
            <motion.div 
              className="group bento-card min-h-[200px] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-violet-500/30">
                {Icons.brain}
              </div>
              <h3 className="text-xl font-bold mb-2">AI understands</h3>
              <p className="text-[var(--muted)]">
                Automatically cleans, summarizes, and connects your scattered thoughts.
              </p>
            </motion.div>

            {/* Semantic Recall */}
            <motion.div 
              className="group bento-card min-h-[200px] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-amber-500/30">
                {Icons.search}
              </div>
              <h3 className="text-xl font-bold mb-2">Recall by meaning</h3>
              <p className="text-[var(--muted)]">
                Ask in plain language. No keywords, no folders. Just find what you need.
              </p>
            </motion.div>

            {/* Privacy */}
            <motion.div 
              className="group bento-card md:col-span-2 lg:col-span-3 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-500/30">
                {Icons.lock}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Your thoughts stay yours</h3>
                <p className="text-[var(--muted)]">
                  Optional end-to-end encryption. Private Mode means we never see your content. Ever.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="px-6 py-24 md:py-32 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Not another notes app.
            </h2>
            <p className="text-lg text-[var(--muted)]">Built different, on purpose.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Others */}
            <motion.div 
              className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--background)]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-[var(--muted)] mb-6">Other apps</h3>
              <ul className="space-y-4">
                {["Organize first, capture later", "Static notes gathering dust", "Keyword search only", "Complex folder structures"].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3 text-[var(--muted)]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-900/30 text-red-500 flex items-center justify-center">
                      {Icons.x}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Notaxia */}
            <motion.div 
              className="p-8 rounded-3xl border-2 border-[var(--primary)] bg-gradient-to-br from-[var(--accent-soft)] to-transparent relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-semibold">Recommended</span>
              </div>
              <h3 className="text-lg font-semibold gradient-text mb-6">Notaxia</h3>
              <ul className="space-y-4">
                {["Capture first, make sense later", "Living thoughts with AI insights", "Semantic recall by meaning", "Zero organization required"].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                      {Icons.check}
                    </span>
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ 4-SCREEN STORY (APP SCREENSHOTS) ============ */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              See Notaxia in action
            </h2>
            <p className="text-lg text-[var(--muted)]">
              From widget to clarity—the flow in four screens.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Horizontal scroll container */}
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth scrollbar-thin md:gap-8 -mx-6 px-6 md:-mx-8 md:px-8">
              {[
                { src: "/android_widget.jpeg", caption: "One tap. No app. No friction.", label: "Widget → Thought" },
                { src: "/search.png", caption: "Ask your past.", label: "Recall → Memory" },
                { src: "/widget_ios.png", caption: "Capture first. Make sense later.", label: "Quick Capture" },
                { src: "/though_inbox.png", caption: "See your mind.", label: "Insights → Clarity" },
              ].map((slide, i) => (
                <motion.div
                  key={slide.src}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-lg hover:shadow-xl hover:border-[var(--primary)]/30 transition-all duration-300">
                    <div className="aspect-[9/19] relative bg-[var(--background)]">
                      <img
                        src={slide.src}
                        alt={slide.label}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-1">
                        {slide.label}
                      </p>
                      <p className="text-base font-semibold text-[var(--foreground)]">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Fade edges on desktop to suggest scroll */}
            <div className="hidden md:block absolute top-0 right-0 bottom-12 w-24 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none" />
            <div className="hidden md:block absolute top-0 left-0 bottom-12 w-24 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by thinkers</h2>
            <p className="text-lg text-[var(--muted)]">Join thousands capturing clarity every day.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "Finally, an app that gets out of my way. I dump thoughts and Notaxia handles the rest.", author: "Sarah K.", role: "Product Designer", gradient: "from-pink-500 to-rose-500" },
              { text: "The semantic search is magic. I just ask 'that idea about the pitch' and it finds it.", author: "Marcus T.", role: "Founder", gradient: "from-violet-500 to-purple-500" },
              { text: "Private Mode gives me peace of mind. My journal stays private, no exceptions.", author: "Priya M.", role: "Writer", gradient: "from-cyan-500 to-blue-500" },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(j => (
                    <span key={j}>{Icons.star}</span>
                  ))}
                </div>
                <p className="text-[var(--foreground)] mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold`}>
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-[var(--muted)]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING TEASER ============ */}
      <section className="px-6 py-24 md:py-32 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start free, upgrade when ready</h2>
            <p className="text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto">
              Free tier includes limited AI thoughts, voice notes, and documents. Pro unlocks unlimited processing, transcription, and OCR. See the app for limits and pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/app/notaxia"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--foreground)] px-8 font-semibold text-[var(--background)] hover:opacity-90 transition-opacity"
              >
                Get started free
              </a>
              <Link
                href="/changelog"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--border)] px-8 font-semibold hover:bg-[var(--accent-soft)] transition-colors"
              >
                View plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="px-6 py-24 md:py-32" aria-labelledby="faq-heading">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Questions? Answers.
          </motion.h2>

          <dl className="space-y-4">
            {[
              { q: "Is Notaxia free?", a: "Notaxia has a free tier with limits on AI-processed thoughts, voice notes, and documents per month. Notes, tags, search, and reminders stay unlimited on free. Pro removes those limits and unlocks unlimited AI, voice transcription, and document OCR. See the app for current limits and pricing." },
              { q: "How much does Pro cost?", a: "Pro is available as a monthly or yearly subscription. Check the app or our Changelog for current pricing. We often run launch discounts for early users." },
              { q: "How does Private Mode work?", a: "Your thoughts are encrypted on your device before they leave. We cannot read them. Only you have the keys. Private Mode is optional—you choose." },
              { q: "What can I capture?", a: "Text from the widget, voice notes (transcribed and summarized), photos, and documents. AI cleans and connects everything so you can recall by meaning, not just keywords." },
              { q: "Where is Notaxia available?", a: "Notaxia is on iOS and Android. Download from the App Store or Google Play. There’s no web app yet—we’re focused on mobile-first capture." },
              { q: "Can I export my data?", a: "Yes. You can export your thoughts and notes (e.g. CSV). Pro users get additional export options. Your data is yours." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <dt className="font-semibold mb-2 text-lg text-[var(--foreground)]">{faq.q}</dt>
                <dd className="text-[var(--muted)] leading-relaxed m-0">{faq.a}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative px-6 py-32 md:py-40 overflow-hidden">
        <GridBackground />
        <GradientOrbs />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready for
            <span className="gradient-text"> clarity?</span>
          </motion.h2>
          <motion.p
            className="text-xl text-[var(--muted)] mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Download now. Capture your first thought in seconds.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="https://apps.apple.com/app/notaxia"
              className="group relative inline-flex h-14 items-center gap-3 rounded-full bg-[var(--foreground)] px-8 font-semibold text-[var(--background)] shadow-2xl transition-all hover:scale-[1.02]"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-3">
                {Icons.apple}
                <span>Download for iOS</span>
              </span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.notaxia.app"
              className="inline-flex h-14 items-center gap-3 rounded-full border-2 border-[var(--border-strong)] bg-[var(--background)]/80 backdrop-blur px-8 font-semibold transition-all hover:border-[var(--primary)] hover:scale-[1.02]"
            >
              {Icons.playStore}
              <span>Download for Android</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="px-6 py-16 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <Link href="/" className="text-xl font-bold gradient-text">Notaxia</Link>
              <p className="text-sm text-[var(--muted)] mt-2">From chaos to clarity.</p>
            </div>
            
            <div className="flex items-center gap-8">
              <Link href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Blog</Link>
              <Link href="/about" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">About</Link>
              <Link href="/changelog" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Changelog</Link>
              <Link href="/support" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Support</Link>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://twitter.com/notaxia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all">
                {Icons.twitter}
              </a>
              <a href="https://github.com/notaxia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all">
                {Icons.github}
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[var(--muted)]">
            <p>© {new Date().getFullYear()} Notaxia. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
