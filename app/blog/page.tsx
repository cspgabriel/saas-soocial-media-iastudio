import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, Search, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog SocialOS — IA, social media, vendas e marketing",
  description: "Guias práticos sobre IA para social media, ferramentas de marketing, SEO para IA, calendário editorial, vendas e operação para agências pequenas.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog SocialOS — IA, social media, vendas e marketing",
    description: "Conteúdo inbound para freelancers e agências que querem vender uma operação de social media mais profissional.",
    type: "website",
  },
};

const pillars = [
  "IA para social media",
  "Ferramentas de marketing",
  "SEO e GEO para IA",
  "Vendas para agências",
];

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog SocialOS",
    description: metadata.description,
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      url: `/blog/${post.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 font-black text-white">S</div>
            <span className="text-lg font-black">SocialOS</span>
          </Link>
          <Link href="/cadastro?plan=free" className="rounded-md bg-rose-600 px-4 py-2 text-sm font-black text-white hover:bg-rose-700">
            Criar operação grátis
          </Link>
        </div>
      </nav>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-rose-200 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-rose-700">
              <Search className="h-3.5 w-3.5" /> Conteúdo inbound
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Aprenda IA, marketing e vendas para vender social media como operação.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Guias práticos para atrair leads orgânicos que já sentem a dor: falta de processo, conteúdo atrasado, aprovação perdida e dificuldade de provar valor.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#posts" className="inline-flex h-12 items-center justify-center rounded-md bg-rose-600 px-5 text-sm font-black text-white hover:bg-rose-700">
                Ver artigos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/cadastro?plan=free" className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 hover:bg-slate-100">
                Montar minha operação
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar} className="rounded-[8px] border border-slate-200 bg-white p-5">
                <Sparkles className="mb-4 h-5 w-5 text-rose-600" />
                <p className="text-lg font-black">{pillar}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Cluster SEO para capturar busca informativa e levar para cadastro.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="posts" className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">Artigos estratégicos</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Cluster inicial para rankear e converter.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Cada artigo mira uma intenção: aprender, comparar, operar melhor ou tomar decisão de compra.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="flex min-h-full flex-col rounded-[8px] border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between gap-3 text-xs font-black uppercase tracking-wider">
                <span className="rounded bg-rose-50 px-2 py-1 text-rose-700">{post.category}</span>
                <span className="text-slate-500">{post.readingTime}</span>
              </div>
              <h3 className="text-xl font-black leading-tight">
                <Link href={`/blog/${post.slug}`} className="hover:text-rose-700">{post.title}</Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{post.description}</p>
              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-500">
                <CalendarDays className="h-4 w-4" /> Atualizado em {new Date(`${post.updatedAt}T00:00:00`).toLocaleDateString("pt-BR")}
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center text-sm font-black text-rose-700">
                Ler guia <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <BookOpen className="mb-4 h-8 w-8 text-rose-300" />
            <h2 className="text-3xl font-black">Estratégia editorial do blog.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              O blog nasce para capturar buscas de topo e meio de funil, depois levar o leitor para um teste prático do SocialOS.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Posts com FAQ e schema para AI search.",
              "Clusters por dor real de social media.",
              "Links internos para cadastro e demo.",
              "Conteúdo atualizado para 2026.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[8px] border border-slate-800 bg-slate-900 p-4 text-sm font-bold text-slate-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
