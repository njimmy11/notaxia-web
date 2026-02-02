"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const DEEP_LINK_SCHEME = "notaxia";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const redirected = useRef(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!token || redirected.current) return;
    const deepLink = `${DEEP_LINK_SCHEME}://verify-email?token=${encodeURIComponent(token)}`;
    redirected.current = true;
    // Redirect to app; if opened in browser on mobile, Universal/App Link may open app; otherwise this opens app on mobile
    window.location.href = deepLink;
    // After 2s show fallback in case we're on desktop or app didn't open
    const t = setTimeout(() => setShowFallback(true), 2000);
    return () => clearTimeout(t);
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
        <p className="text-[#4B5563] text-center">Invalid verification link. Please use the link from your email.</p>
      </div>
    );
  }

  if (!showFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
        <p className="text-[#4B5563] text-center">Opening Notaxia…</p>
      </div>
    );
  }

  const deepLink = `${DEEP_LINK_SCHEME}://verify-email?token=${encodeURIComponent(token)}`;
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-8 text-center">
        <h1 className="text-xl font-semibold text-[#10121C] mb-2">Verify your email</h1>
        <p className="text-[#4B5563] mb-6">
          Open this link on your phone in the Notaxia app, or tap below if the app is installed on this device.
        </p>
        <a
          href={deepLink}
          className="inline-block px-6 py-3 rounded-lg bg-[#1A4D3E] text-white font-semibold no-underline"
        >
          Open in Notaxia
        </a>
        <p className="mt-6 text-sm text-[#9CA3AF]">
          If nothing happens, copy this link and open it on your phone:{" "}
          <code className="block mt-2 p-2 bg-[#F3F4F6] rounded text-xs break-all">{deepLink}</code>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">Loading…</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
