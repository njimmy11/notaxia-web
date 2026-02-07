import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { PLAY_STORE_URL } from "@/lib/app-links";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://notaxia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Notaxia — Thoughts organizer. Capture your thoughts in one tap.",
    template: "%s | Notaxia",
  },
  description:
    "Notaxia is a thoughts organizer app. Capture thoughts in one tap from your home screen. AI cleans, summarizes, and connects. Widget, voice, photo. Free. Optional end-to-end encryption.",
  keywords: [
    "thoughts organizer",
    "second brain",
    "thought capture",
    "organize thoughts",
    "voice capture",
    "widget capture",
    "personal knowledge",
    "PKM",
    "memory app",
    "clarity",
    "notaxia",
  ],
  authors: [{ name: "Notaxia", url: siteUrl }],
  creator: "Notaxia",
  publisher: "Notaxia",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Notaxia",
    title: "Notaxia — Thoughts organizer. Capture your thoughts in one tap.",
    description:
      "Widget. Voice. Photo. AI understands the rest. Free. No pressure. Upgrade anytime.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Notaxia — Thoughts organizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notaxia — Thoughts organizer",
    description: "Capture your thoughts in one tap. Notaxia understands the rest.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "productivity",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  other: {
    "apple-itunes-app": "app-id=YOUR_IOS_APP_ID",
    "google-play-app": "app-id=com.notaxia.app",
  },
};

export const viewport: Viewport = {
  themeColor: { color: "#0d2922" },
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Notaxia",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
      description:
        "Notaxia is a thoughts organizer app. Capture thoughts in one tap and turn them into clarity with AI.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Notaxia",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
      description:
        "Thoughts organizer. Capture your thoughts in one tap. Notaxia understands the rest.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#app`,
      name: "Notaxia",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "iOS, Android",
      downloadUrl: PLAY_STORE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Capture thoughts via widget, voice, or photo. AI cleans, summarizes, and connects. Optional end-to-end encryption.",
      featureList: [
        "One-tap capture from home screen widget",
        "Voice capture with transcription and AI",
        "Photo and document capture",
        "AI summary and insights",
        "Semantic recall and memory",
        "Optional private mode with E2E encryption",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
