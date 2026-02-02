import Link from "next/link";
import { posts } from "@/lib/posts";
import { PageLayout } from "@/components/PageLayout";

export const metadata = {
  title: "Blog",
  description:
    "Updates, how-tos, and thoughts from the Notaxia team. Why we built the widget first, how we handle privacy, and what we're shipping.",
  openGraph: {
    title: "Blog | Notaxia",
    description: "Updates, how-tos, and thoughts from the Notaxia team.",
    url: "https://notaxia.com/blog",
  },
};

export default function BlogPage() {
  return (
    <PageLayout
      title="Blog"
      subtitle="Updates, how-tos, and the occasional rant from the team."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="h-full p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg hover:-translate-y-1">
              <time
                dateTime={post.date}
                className="text-xs font-medium text-[var(--primary)] uppercase tracking-wider"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-3 text-xl font-bold group-hover:text-[var(--primary)] transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-[var(--muted)] line-clamp-2">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
                <span>Read more</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
