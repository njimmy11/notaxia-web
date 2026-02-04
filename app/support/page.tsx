import { PageLayout } from "@/components/PageLayout";
import { PLAY_STORE_URL } from "@/lib/app-links";

export const metadata = {
  title: "Support",
  description:
    "Get help with Notaxia. Contact us for billing, bugs, feature requests, or general questions.",
  openGraph: {
    title: "Support | Notaxia",
    description: "Get help with Notaxia. We're here to help.",
    url: "https://notaxia.com/support",
  },
};

const topics = [
  {
    title: "Billing & subscription",
    desc: "Questions about your plan, renewal, refunds, or payment issues.",
    email: "hey@notaxia.com",
  },
  {
    title: "Bugs & technical issues",
    desc: "Something not working? Crashes, sync problems, or weird behavior.",
    email: "hey@notaxia.com",
  },
  {
    title: "Feature requests",
    desc: "Ideas for what we should build next. We read everything.",
    email: "hey@notaxia.com",
  },
  {
    title: "Privacy & data",
    desc: "How we handle your data, export, or account deletion.",
    email: "hey@notaxia.com",
  },
];

export default function SupportPage() {
  return (
    <PageLayout
      title="Support"
      subtitle="We're here to help."
    >
      <div className="max-w-2xl mx-auto space-y-16">
        {/* Contact */}
        <section>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-[var(--foreground)]">
              The fastest way to get help is email. We usually reply within a day.
            </p>
            <p className="text-lg leading-relaxed text-[var(--muted)] mt-6">
              Write to{" "}
              <a
                href="mailto:hey@notaxia.com"
                className="text-[var(--primary)] font-medium hover:underline"
              >
                hey@notaxia.com
              </a>{" "}
              with your question, and include your account email or device type if it's about a specific issue.
            </p>
          </div>
        </section>

        {/* Topics */}
        <section>
          <h2 className="text-2xl font-bold mb-8">What do you need help with?</h2>
          <div className="grid gap-6">
            {topics.map((topic, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]"
              >
                <h3 className="font-bold text-lg mb-2">{topic.title}</h3>
                <p className="text-[var(--muted)] mb-4">{topic.desc}</p>
                <a
                  href={`mailto:${topic.email}?subject=${encodeURIComponent(topic.title)}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  Email us
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Download */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Download the app</h2>
          <p className="text-lg text-[var(--muted)] mb-4">
            Notaxia is on Android and iOS. Get it on Google Play:
          </p>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--card)] px-6 font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--card-hover)] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="m3 20.5 9-9-9-9v18zm13.7-8.3-3.2-1.8 3.2-1.8 2.8 1.6c.5.3.5.8 0 1.1l-2.8 1.9zm-4.5-2.5L5 4.1l9.2 5.3-2 1.3zm0 1.6 2 1.3L5 19.9l7.2-8.6z"/>
            </svg>
            Get Notaxia on Google Play
          </a>
        </section>

        {/* FAQ teaser */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Before you write</h2>
          <p className="text-lg text-[var(--muted)]">
            Check the{" "}
            <a href="/changelog" className="text-[var(--primary)] font-medium hover:underline">
              Changelog
            </a>{" "}
            for recent fixes—we ship often. For how the app works and what we believe in, see{" "}
            <a href="/about" className="text-[var(--primary)] font-medium hover:underline">
              About
            </a>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="p-8 rounded-3xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--primary)]/20 text-center">
          <h2 className="text-2xl font-bold mb-4">Still stuck?</h2>
          <p className="text-[var(--muted)] mb-6">We're a small team and we read every message. Just reach out.</p>
          <a
            href="mailto:hey@notaxia.com"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--foreground)] px-8 font-semibold text-[var(--background)] hover:opacity-90 transition-opacity"
          >
            hey@notaxia.com
          </a>
        </section>
      </div>
    </PageLayout>
  );
}
