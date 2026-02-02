export type PostBlock = { type: "p"; text: string } | { type: "h3"; text: string };

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "why-the-widget-came-first",
    title: "Why the home screen widget came first",
    date: "2025-01-28",
    excerpt:
      "We could have started with a beautiful in-app editor. We didn’t. Here’s why the widget was non-negotiable.",
    author: "Notaxia",
    body: [
      {
        type: "p",
        text: "When we started sketching Notaxia, the first thing we drew wasn’t a note. It was a single field on the home screen. Unlock phone, tap, type one line, done.",
      },
      {
        type: "p",
        text: "That’s it. No folders. No “where does this go?” No opening an app, waiting for sync, or hunting for the right note. By the time you do all that, the thought’s gone.",
      },
      {
        type: "h3",
        text: "Speed over structure",
      },
      {
        type: "p",
        text: "Your brain doesn’t think in hierarchies. It throws out a phrase, a name, half an idea. The best capture tool is the one that’s there in under two seconds. For us, that had to be a widget.",
      },
      {
        type: "p",
        text: "We’ll keep improving the in-app experience—tags, search, voice, photos. But the front door will always be one tap from the home screen. Everything else is secondary.",
      },
    ],
  },
  {
    slug: "the-two-minute-morning-dump",
    title: "The 2-minute morning dump",
    date: "2025-01-25",
    excerpt:
      "How I use the widget before my first coffee. No formatting, no organizing—just get it out.",
    author: "Notaxia",
    body: [
      {
        type: "p",
        text: "I don’t journal. I dump.",
      },
      {
        type: "p",
        text: "Every morning I grab my phone and hit the widget. I type whatever’s in my head: “call Sarah about the thing,” “idea for the landing page,” “forgot to cancel that subscription.” Sometimes it’s one line, sometimes six. No bullets, no headings. Just raw spill.",
      },
      {
        type: "h3",
        text: "Why it works",
      },
      {
        type: "p",
        text: "It takes two minutes. I don’t open an app or think about where to put anything. Later, Notaxia cleans it up—summaries, reminders, links between related thoughts. I get clarity without spending my morning organizing.",
      },
      {
        type: "p",
        text: "If you’ve ever lost a good idea because you were too busy to “properly” write it down, try the dump. No pressure. No rules.",
      },
    ],
  },
  {
    slug: "we-dont-read-your-thoughts",
    title: "We don’t read your thoughts",
    date: "2025-01-22",
    excerpt:
      "Private Mode, encryption, and what actually happens to your data when you turn it on.",
    author: "Notaxia",
    body: [
      {
        type: "p",
        text: "Short version: when Private Mode is on, we can’t read your content. It’s encrypted on your device before it ever reaches our servers. We don’t have the keys.",
      },
      {
        type: "p",
        text: "That means no human at Notaxia can open your thoughts. Not for “quality,” not for “improving the model,” not for anything. The AI still runs—summaries, insights, recall—but it works on encrypted data in a way that doesn’t give us access.",
      },
      {
        type: "h3",
        text: "Why offer both?",
      },
      {
        type: "p",
        text: "Some people want maximum privacy and are okay with a bit more setup. Others want the simplest experience and trust us with plain-text processing. We’re not here to decide for you. You pick.",
      },
      {
        type: "p",
        text: "We’ll never sell your data or train public models on it. That’s a line we won’t cross.",
      },
    ],
  },
  {
    slug: "recall-by-meaning-not-keywords",
    title: "Recall by meaning, not keywords",
    date: "2025-01-18",
    excerpt:
      "You don’t always remember the exact words. Here’s how we help you find the right thought anyway.",
    author: "Notaxia",
    body: [
      {
        type: "p",
        text: "Last week I needed something I’d written about “that meeting with the guy from the other team.” I had no idea what I’d actually typed. Was it “meeting,” “sync,” “call”? I couldn’t remember.",
      },
      {
        type: "p",
        text: "In a keyword world I’d be stuck. In Notaxia I asked in plain language: “meeting with someone from the other team.” The right note showed up. Not because the words matched—because the meaning did.",
      },
      {
        type: "h3",
        text: "How we do it",
      },
      {
        type: "p",
        text: "We don’t just index words. We build a sense of what each thought is about—topics, relationships, context. When you ask, we match on that. So you can say “budget idea from last month” or “thing I wanted to try for the app” and get back the right dump.",
      },
      {
        type: "p",
        text: "It’s not magic. It’s just built for how people actually remember things: fuzzy, contextual, and rarely word-perfect.",
      },
    ],
  },
  {
    slug: "what-we-shipped-january-2025",
    title: "What we shipped in January 2025",
    date: "2025-01-15",
    excerpt:
      "Widget tweaks, better voice summaries, and a few small things that add up.",
    author: "Notaxia",
    body: [
      {
        type: "p",
        text: "Nothing huge this month—just a bunch of improvements that make the daily flow a bit smoother.",
      },
      {
        type: "h3",
        text: "Widget",
      },
      {
        type: "p",
        text: "You can now long-press the widget to jump straight into the last thought you added. Small thing, but if you’re chaining a few quick captures it saves a tap. We also fixed a bug where the widget could show stale content after a long sleep.",
      },
      {
        type: "h3",
        text: "Voice",
      },
      {
        type: "p",
        text: "Summaries for voice notes are more concise. We heard “too long” a few times and tuned the prompt. You still get the full transcript; the one-liner at the top is just tighter.",
      },
      {
        type: "h3",
        text: "Misc",
      },
      {
        type: "p",
        text: "Reminders now respect your phone’s quiet hours on iOS. Export includes a simple CSV option for thoughts. A few crash fixes on Android when switching between apps mid-capture.",
      },
      {
        type: "p",
        text: "More soon. If you hit something weird, tell us—hey@notaxia.com.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
