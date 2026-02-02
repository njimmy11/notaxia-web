import { PageLayout } from "@/components/PageLayout";

export const metadata = {
  title: "Changelog",
  description:
    "What we've shipped recently: widget tweaks, voice summaries, reminders, and more.",
  openGraph: {
    title: "Changelog | Notaxia",
    description: "What we've shipped recently.",
    url: "https://notaxia.com/changelog",
  },
};

const entries = [
  {
    date: "2025-01-28",
    version: "1.4.0",
    title: "Widget long-press shortcut",
    items: [
      "Long-press the widget to jump straight into your last thought. Saves a tap when you're chaining quick captures.",
      "Fixed a bug where the widget could show stale content after the app had been in the background for a while.",
    ],
    type: "feature" as const,
  },
  {
    date: "2025-01-22",
    version: "1.3.2",
    title: "Voice note summaries",
    items: [
      "Summaries for voice notes are shorter and more to-the-point. Full transcript still there; the one-liner at the top is just tighter.",
      "Android: fixed a crash when switching away mid-recording.",
    ],
    type: "improvement" as const,
  },
  {
    date: "2025-01-15",
    version: "1.3.0",
    title: "Reminders and export",
    items: [
      "Reminders now respect your phone's Do Not Disturb / Focus mode on iOS.",
      "Export: added a simple CSV option for thoughts so you can pull data into spreadsheets or other tools.",
    ],
    type: "feature" as const,
  },
  {
    date: "2025-01-08",
    version: "1.2.0",
    title: "Recall and Private Mode",
    items: [
      "Recall by meaning: ask in plain language (e.g. 'meeting with someone from the other team') and get the right note even when the exact words don't match.",
      "Private Mode: optional end-to-end encryption so we never see your content. You pick.",
    ],
    type: "feature" as const,
  },
];

const typeColors = {
  feature: "bg-green-500/10 text-green-400",
  improvement: "bg-blue-500/10 text-blue-400",
  fix: "bg-orange-500/10 text-orange-400",
};

const typeLabels = {
  feature: "New",
  improvement: "Improved",
  fix: "Fixed",
};

export default function ChangelogPage() {
  return (
    <PageLayout
      title="Changelog"
      subtitle="What we've shipped. No fluff."
    >
      <div className="max-w-2xl mx-auto">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--border)]" />
          
          <div className="space-y-12">
            {entries.map((entry, i) => (
              <div key={entry.date} className="relative pl-16">
                {/* Dot */}
                <div className="absolute left-[18px] top-1 w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-[var(--background)]" />
                
                <article>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <time
                      dateTime={entry.date}
                      className="text-sm font-medium text-[var(--foreground)]"
                    >
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--primary)] font-medium">
                      v{entry.version}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[entry.type]}`}>
                      {typeLabels[entry.type]}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-4">{entry.title}</h2>
                  
                  <ul className="space-y-3">
                    {entry.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-[var(--muted)]">
                        <svg className="w-5 h-5 flex-shrink-0 text-[var(--primary)] mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe */}
        <div className="mt-20 p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] text-center">
          <h2 className="text-xl font-bold mb-2">Stay updated</h2>
          <p className="text-[var(--muted)] mb-6">
            Follow us on Twitter for the latest updates and sneak peeks.
          </p>
          <a
            href="https://twitter.com/notaxia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 justify-center rounded-full bg-[var(--foreground)] px-6 font-semibold text-[var(--background)] hover:opacity-90 transition-opacity"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Follow @notaxia</span>
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
