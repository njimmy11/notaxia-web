import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { PageLayout } from "@/components/PageLayout";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Notaxia Blog`,
      description: post.excerpt,
      url: `https://notaxia.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const readingTime = Math.ceil(
    post.body.reduce((acc, b) => acc + b.text.split(" ").length, 0) / 200
  );

  return (
    <PageLayout title={post.title}>
      <div className="max-w-2xl mx-auto">
        {/* Meta */}
        <div className="flex items-center justify-center gap-4 mb-12 text-sm text-[var(--muted)]">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
          <span>{readingTime} min read</span>
          <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
          <span>{post.author}</span>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          {post.body.map((block, i) =>
            block.type === "h3" ? (
              <h3
                key={i}
                className="mt-10 mb-4 text-2xl font-bold text-[var(--foreground)]"
              >
                {block.text}
              </h3>
            ) : (
              <p
                key={i}
                className="mb-6 text-lg leading-relaxed text-[var(--foreground)] opacity-90"
              >
                {block.text}
              </p>
            )
          )}
        </article>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:gap-3 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Back to blog</span>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
