import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3, ExternalLink, Search } from "lucide-react";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog SocialOS`,
    description: post.description,
    keywords: [post.keyword, post.category, "social media", "marketing com ia", "agencia de social media"],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["SocialOS"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: "SocialOS" },
    publisher: { "@type": "Organization", name: "SocialOS" },
    mainEntityOfPage: `/blog/${post.slug}`,
    about: post.keyword,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-black text-slate-700 hover:text-rose-700">
            <ArrowLeft className="h-4 w-4" /> Blog
          </Link>
          <Link href="/cadastro?plan=free" className="rounded-md bg-rose-600 px-4 py-2 text-sm font-black text-white hover:bg-rose-700">
            Criar operação grátis
          </Link>
        </div>
      </nav>

      <article>
        <header className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-5 py-12 md:py-16">
            <div className="mb-5 flex flex-wrap gap-2 text-xs font-black uppercase tracking-wider">
              <span className="rounded bg-rose-100 px-2 py-1 text-rose-700">{post.category}</span>
              <span className="rounded bg-white px-2 py-1 text-slate-600">{post.intent}</span>
              <span className="rounded bg-white px-2 py-1 text-slate-600">{post.keyword}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{post.hero}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-slate-600">
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Atualizado em {new Date(`${post.updatedAt}T00:00:00`).toLocaleDateString("pt-BR")}</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> {post.readingTime}</span>
              <span className="inline-flex items-center gap-2"><Search className="h-4 w-4" /> SEO + GEO</span>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 lg:grid-cols-[1fr_280px]">
          <div>
            <section className="rounded-[8px] border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-black">Resumo prático</h2>
              <ul className="mt-4 space-y-3">
                {post.takeaways.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl font-black leading-tight">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-slate-700">{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="rounded-[8px] border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <section className="mt-12 rounded-[8px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-black">Checklist para aplicar agora</h2>
              <ul className="mt-5 space-y-3">
                {post.checklist.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-rose-600" /> {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-black">Perguntas frequentes</h2>
              <div className="mt-5 space-y-3">
                {post.faq.map((item) => (
                  <details key={item.question} className="rounded-[8px] border border-slate-200 bg-white p-5">
                    <summary className="cursor-pointer text-sm font-black">{item.question}</summary>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-[8px] border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black">Fontes e leitura extra</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {post.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-between gap-3 rounded-md border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:border-rose-200 hover:text-rose-700">
                    {source.label} <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
            <div className="rounded-[8px] border border-slate-200 bg-slate-950 p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-300">Próxima ação</p>
              <h2 className="mt-3 text-xl font-black">Transforme o guia em operação.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Cadastre um cliente, gere calendário com IA e organize aprovação sem planilha.
              </p>
              <Link href="/cadastro?plan=free" className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">
                Começar grátis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">Relacionados</h2>
              <div className="mt-4 space-y-4">
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`} className="block border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-black leading-5 text-slate-900 hover:text-rose-700">{item.title}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">{item.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
