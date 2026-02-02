import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";

export const metadata = {
  title: "About",
  description:
    "Notaxia is built for people who think fast and don't want their notes to slow them down. Capture first, make sense later.",
  openGraph: {
    title: "About | Notaxia",
    description:
      "Notaxia is built for people who think fast and don't want their notes to slow them down.",
    url: "https://notaxia.com/about",
  },
};

export default function AboutPage() {
  return (
    <PageLayout
      title="About Notaxia"
      subtitle="Built for people who think fast."
    >
      <div className="max-w-2xl mx-auto space-y-16">
        {/* Story */}
        <section>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-[var(--foreground)]">
              We built Notaxia for a simple reason: <strong>our brains move faster than our apps.</strong>
            </p>
            <p className="text-lg leading-relaxed text-[var(--muted)] mt-6">
              You have an idea in the shower, a name at a red light, half a thought right before sleep. 
              By the time you open a note and find the right folder, it's gone.
            </p>
            <p className="text-lg leading-relaxed text-[var(--muted)] mt-6">
              So we flipped it. <span className="text-[var(--foreground)] font-medium">Capture first—one tap from the home screen, 
              no folders, no formatting.</span> Just dump it. Later, we help you make sense of it: summaries, 
              connections, recall by meaning instead of keywords.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold mb-8">What we believe</h2>
          <div className="grid gap-6">
            {[
              {
                title: "Speed over structure",
                desc: "The best capture tool is the one that's there in under two seconds. Everything else is secondary.",
              },
              {
                title: "Your thoughts, your privacy",
                desc: "We don't read your content. Private Mode means end-to-end encryption—we literally can't see what you write.",
              },
              {
                title: "AI as a partner",
                desc: "AI should help you think, not replace your thinking. We clean, summarize, and connect—but the insights are yours.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]"
              >
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-[var(--muted)]">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-bold mb-4">The team</h2>
          <p className="text-lg text-[var(--muted)]">
            We're a small team. We ship often, listen to feedback, and try not to overcomplicate things. 
            If you have a question or a bug,{" "}
            <Link
              href="/support"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              visit our support page
            </Link>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="p-8 rounded-3xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--primary)]/20 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to try it?</h2>
          <p className="text-[var(--muted)] mb-6">Download Notaxia and capture your first thought in seconds.</p>
          <a
            href="https://apps.apple.com/app/notaxia"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--foreground)] px-8 font-semibold text-[var(--background)] hover:opacity-90 transition-opacity"
          >
            Download Now
          </a>
        </section>
      </div>
    </PageLayout>
  );
}
