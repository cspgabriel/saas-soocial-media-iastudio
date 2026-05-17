"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  KeyRound,
  Megaphone,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui";
import { FloatingChatbot } from "@/components/FloatingChatbot";

const features = [
  { icon: Users, title: "Cliente e briefing no mesmo lugar", text: "Guarde tom de voz, oferta, público, restrições e plano mensal antes de pedir qualquer coisa para a IA." },
  { icon: CalendarDays, title: "Calendário com aprovação", text: "Ideia, criação, aprovação, aprovado e publicado. O time enxerga gargalo sem abrir planilha." },
  { icon: Bot, title: "IA dentro da operação", text: "Legenda, carrossel, campanha e auditoria de perfil usando contexto do cliente, não prompt solto." },
  { icon: BarChart3, title: "Relatório copiável", text: "Resumo operacional pronto para reunião: posts, aprovações, receita e campanhas." },
];

const competitors = [
  ["IA nativa para copy com contexto", "Sim", "Limitado", "Limitado", "Sim, mas solto"],
  ["Calendário + aprovação do cliente", "Sim", "Sim", "Sim", "Não"],
  ["Briefing por cliente", "Sim", "Parcial", "Parcial", "Não"],
  ["Auditoria rápida de Instagram", "Sim", "Não", "Não", "Depende do prompt"],
  ["Modo grátis com chave própria", "Sim", "Não", "Não", "Não"],
  ["Foco em agência pequena", "Sim", "Parcial", "Parcial", "Não"],
];

const faqs = [
  ["Funciona com Instagram, TikTok e LinkedIn?", "Sim. O fluxo interno já organiza conteúdo por plataforma e formato. A publicação automática depende das integrações oficiais de cada rede."],
  ["É melhor que mLabs ou Etus?", "A proposta é diferente: SocialOS foca em operação rápida com IA, briefing e aprovação. mLabs/Etus são mais maduros para publicação multi-rede tradicional."],
  ["O que significa chave própria de IA?", "No plano grátis, você usa sua própria chave Gemini. Na prática, você vê a operação funcionando antes de assumir uma mensalidade."],
  ["Posso cancelar quando quiser?", "Sim. A oferta deve ser sem contrato longo no Free e Pro. O plano Agency pode ter contrato dedicado."],
  ["Tem relatório para cliente?", "Sim. O módulo de relatórios gera um resumo operacional copiável, com posts, aprovações e campanhas."],
  ["Tem aprovação por cliente?", "O fluxo interno já tem status de aprovação. O próximo passo é gerar link público de aprovação por cliente via Firestore/Auth."],
  ["A IA publica sozinha?", "Não por padrão. A IA acelera criação e estratégia. Publicação automática entra depois com integrações oficiais."],
  ["Serve para freelancer?", "Sim. O produto foi pensado para freelancer e agência pequena que quer parecer mais organizada, responder mais rápido e vender uma operação mais profissional."],
  ["Tem garantia?", "A promessa comercial recomendada é 14 dias grátis e garantia de 30 dias no plano pago."],
  ["Meus dados ficam onde?", "Hoje a demo usa armazenamento local no navegador. Em produção, a camada certa é Firebase Auth + Firestore com regras de segurança."],
];

const integrations = ["Meta", "Instagram", "TikTok", "LinkedIn", "Canva", "Google", "Notion", "Slack", "Zapier", "Webhook"];

function DemoGenerator() {
  const [niche, setNiche] = useState("clínica odontológica");
  const ideas = useMemo(() => {
    const clean = niche.trim() || "negócio local";
    return [
      `Reels: "3 sinais de que você está adiando uma decisão importante sobre ${clean}"`,
      `Carrossel: "Antes de contratar ${clean}: checklist rápido para evitar erro caro"`,
      `Stories: enquete de objeção + prova social + CTA para diagnóstico`,
    ];
  }, [niche]);

  return (
    <div className="rounded-[8px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
      <div className="border-b border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-600">Demo interativa</p>
            <h2 className="text-lg font-black text-slate-950">Digite o nicho do cliente</h2>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-white"><Sparkles className="h-4 w-4" /></div>
        </div>
      </div>
      <div className="p-5">
        <input
          value={niche}
          onChange={(event) => setNiche(event.target.value)}
          className="mb-4 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-500"
          placeholder="Ex: restaurante japonês, escola infantil, corretor..."
        />
        <div className="space-y-3">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="rounded-md border border-slate-200 bg-slate-50 p-3"
            >
              <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-rose-600">
                <Zap className="h-3 w-3" /> Ideia {index + 1}
              </div>
              <p className="text-sm font-bold leading-6 text-slate-800">{idea}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 rounded-md bg-slate-950 p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-200">Próximo passo automático</p>
          <p className="mt-1 text-sm text-slate-200">Transformar a ideia escolhida em legenda, briefing visual e tarefa de aprovação.</p>
        </div>
      </div>
    </div>
  );
}

function LeadForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    const leads = JSON.parse(localStorage.getItem("socialos_landing_leads") || "[]");
    localStorage.setItem("socialos_landing_leads", JSON.stringify([{ email, createdAt: new Date().toISOString() }, ...leads]));
    setSaved(true);
  };

  return (
    <form onSubmit={submit} className={`flex gap-2 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="seu@email.com"
        className="min-h-12 flex-1 rounded-md border border-slate-200 bg-white px-4 text-sm outline-none focus:border-rose-500"
      />
      <Button type="submit" className="min-h-12 rounded-md bg-rose-600 px-6 shadow-none hover:bg-rose-700">
        {saved ? "Template enviado" : "Receber template grátis"}
      </Button>
    </form>
  );
}

function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-[8px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-600">Demo de 90 segundos</p>
            <h3 className="text-lg font-black text-slate-950">Fluxo: briefing → post → aprovação → relatório</h3>
          </div>
          <button onClick={onClose} className="rounded-md p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        <div className="aspect-video bg-slate-950 p-6 text-white">
          <div className="grid h-full place-items-center rounded-[8px] border border-white/10 bg-slate-900">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-600"><Play className="h-7 w-7 fill-white" /></div>
              <p className="text-2xl font-black">Demo guiada do SocialOS</p>
              <p className="mt-2 max-w-lg text-sm text-slate-300">Placeholder pronto para trocar por Loom, Arcade ou Storylane quando o vídeo real estiver gravado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExitIntent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && !sessionStorage.getItem("socialos_exit_seen")) {
        sessionStorage.setItem("socialos_exit_seen", "1");
        setOpen(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, []);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 p-4">
      <div className="max-w-md rounded-[8px] bg-white p-6 shadow-2xl">
        <button onClick={() => setOpen(false)} className="float-right rounded-md p-1 text-slate-500 hover:bg-slate-100"><X className="h-4 w-4" /></button>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-600">Antes de sair</p>
        <h3 className="mt-2 text-2xl font-black text-slate-950">Não saia sem um ativo para vender amanhã</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">Leve um calendário editorial pronto para mostrar valor ao cliente antes mesmo da primeira reunião.</p>
        <div className="mt-4"><LeadForm compact /></div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [annual, setAnnual] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);

  const plans = [
    { name: "Free", price: "R$ 0", desc: "Para provar valor em um cliente sem pedir cartão.", cta: "Começar pelo Free", href: "/cadastro?plan=free", items: ["1 usuário", "3 clientes", "30 gerações/dia", "Calendário e briefing"] },
    { name: "Pro", price: annual ? "R$ 77" : "R$ 97", desc: "Para virar uma operação que o cliente respeita.", cta: "Ativar meu Pro", href: "/cadastro?plan=pro", featured: true, items: ["10 clientes", "IA gerenciada", "300 gerações/dia", "Relatório operacional"] },
    { name: "Scale", price: annual ? "R$ 237" : "R$ 297", desc: "Para crescer sem deixar aprovação e prazo escaparem.", cta: "Escalar com controle", href: "/cadastro?plan=scale", items: ["Clientes ilimitados", "1200 gerações/dia", "Multiusuário", "Campanhas e creators"] },
    { name: "Agency", price: annual ? "R$ 557" : "R$ 697", desc: "Para vender uma estrutura com sua marca.", cta: "Montar whitelabel", href: "/cadastro?plan=agency", items: ["Whitelabel", "Domínio próprio", "Subcontas", "Migração assistida"] },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SocialOS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 font-black text-white">S</div>
            <span className="text-lg font-black">SocialOS</span>
          </Link>
          <div className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
            <a href="#demo">Demo</a>
            <a href="#compare">Comparativo</a>
            <a href="#pricing">Planos</a>
            <a href="#faq">FAQ</a>
            <Link href="/blog">Blog</Link>
          </div>
          <Link href="/cadastro?plan=free">
            <Button className="rounded-md bg-rose-600 px-5 shadow-none hover:bg-rose-700">Criar conta grátis</Button>
          </Link>
        </div>
      </nav>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:pb-20 lg:pt-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-rose-700">
              IA para agências de social media
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal text-slate-950 md:text-7xl">
              Tenha a operação que faz o cliente sentir que você vale mais.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              SocialOS organiza briefing, calendário, IA, aprovação e relatório em um fluxo que transforma caos em segurança. Você entrega mais rápido, mostra mais controle e para de vender social media como se fosse só post.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/cadastro?plan=free">
                <Button className="h-12 rounded-md bg-rose-600 px-6 shadow-none hover:bg-rose-700">
                  Montar minha operação grátis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <button onClick={() => setVideoOpen(true)} className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-6 text-sm font-black text-slate-800 hover:bg-slate-50">
                <Play className="mr-2 h-4 w-4" /> Ver demo de 90s
              </button>
            </div>
            <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
              {["Sem cartão", "Primeiro calendário em minutos", "Você vê valor antes de pagar"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {item}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[8px] border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-black text-slate-800">Receba o calendário que ajuda o cliente a dizer “agora eu entendi o valor”:</p>
              <LeadForm />
            </div>
          </motion.div>
          <motion.div id="demo" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
            <DemoGenerator />
          </motion.div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-10">
            <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-slate-500">O custo invisível de continuar no improviso</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {["Cliente cobrando status", "Post esquecido", "Aprovação perdida", "Relatório feito na pressa", "IA sem contexto"].map((item) => (
                <div key={item} className="rounded-md border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-slate-700">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-rose-700">Produto</p>
            <h2 className="text-3xl font-black text-slate-950 md:text-4xl">Quando tudo fica no mesmo lugar, você para de parecer “só mais um social media”.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-[8px] border border-slate-200 bg-white p-5">
                <feature.icon className="mb-5 h-6 w-6 text-rose-600" />
                <h3 className="mb-2 text-lg font-black">{feature.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-3">
            {[
              ["Controle", "o cliente vê processo, prazo e aprovação. Isso muda a percepção de valor."],
              ["Velocidade", "ideia, copy e tarefa saem no mesmo fluxo. Menos abas abertas, menos retrabalho."],
              ["Desejo", "a operação deixa de parecer improviso e vira algo que o cliente quer manter."],
            ].map(([value, label]) => (
              <div key={value} className="rounded-[8px] border border-slate-800 bg-slate-900 p-6">
                <p className="text-5xl font-black text-rose-300">{value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="compare" className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">Comparativo</p>
            <h2 className="text-3xl font-black md:text-4xl">O lead compra a certeza de que amanhã não vai virar cobrança, atraso e retrabalho.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Se ele fecha esta página e volta para planilha, WhatsApp e IA solta, o problema continua do mesmo tamanho. SocialOS entrega a sensação de operação pronta.</p>
          </div>
          <div className="overflow-x-auto rounded-[8px] border border-slate-200">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Critério</th>
                  <th className="px-4 py-3">SocialOS</th>
                  <th className="px-4 py-3">mLabs</th>
                  <th className="px-4 py-3">Etus</th>
                  <th className="px-4 py-3">ChatGPT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {competitors.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${cell}`} className={`px-4 py-3 ${index === 1 ? "font-black text-rose-700" : "text-slate-700"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-16">
            <div className="mb-8 max-w-2xl">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-rose-700">Como funciona</p>
              <h2 className="text-3xl font-black md:text-4xl">Três passos para o cliente sentir que está em boas mãos.</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                ["1", "Mostre que você entendeu o negócio", "Oferta, público, tom de voz, restrições e plano mensal ficam documentados."],
                ["2", "Entregue uma pauta que parece pensada", "Ideias, legendas, carrosséis e campanhas nascem com contexto, não do zero."],
                ["3", "Dê tranquilidade toda semana", "Fila por status e relatório copiável reduzem cobrança e aumentam confiança."],
              ].map(([step, title, text]) => (
                <div key={step} className="rounded-[8px] border border-slate-200 bg-white p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-lg font-black text-white">{step}</div>
                  <h3 className="text-xl font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-5 py-16">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-rose-300">Planos</p>
                <h2 className="text-3xl font-black md:text-4xl">Comece sem risco. Continue quando perceber que voltar ao improviso custa mais.</h2>
                <p className="mt-3 text-sm text-slate-300">A conta não é só mensalidade. É retrabalho, atraso, cobrança do cliente e horas que poderiam virar retenção.</p>
              </div>
              <div className="flex w-fit rounded-md border border-slate-700 bg-slate-900 p-1">
                <button onClick={() => setAnnual(false)} className={`rounded px-4 py-2 text-sm font-black ${!annual ? "bg-white text-slate-950" : "text-slate-400"}`}>Mensal</button>
                <button onClick={() => setAnnual(true)} className={`rounded px-4 py-2 text-sm font-black ${annual ? "bg-white text-slate-950" : "text-slate-400"}`}>Anual - 2 meses grátis</button>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {plans.map((plan) => (
                <div key={plan.name} className={`relative rounded-[8px] border p-6 ${plan.featured ? "border-rose-400 bg-white text-slate-950" : "border-slate-800 bg-slate-900"}`}>
                  {plan.featured && <div className="absolute right-4 top-4 rounded-full bg-rose-600 px-3 py-1 text-[10px] font-black uppercase text-white">Mais popular</div>}
                  <h3 className="text-xl font-black">{plan.name}</h3>
                  <p className={`mt-2 min-h-10 text-sm ${plan.featured ? "text-slate-600" : "text-slate-400"}`}>{plan.desc}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className={`pb-1 text-sm ${plan.featured ? "text-slate-500" : "text-slate-400"}`}>/mês</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button className={`mt-7 w-full rounded-md shadow-none ${plan.featured ? "bg-rose-600 hover:bg-rose-700" : "bg-white text-slate-950 hover:bg-slate-100"}`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[8px] border border-emerald-800 bg-emerald-950/40 p-4 text-sm font-bold text-emerald-100">
              <ShieldCheck className="mr-2 inline h-4 w-4" /> 14 dias grátis. Garantia de 30 dias no plano pago. Migração assistida para os primeiros clientes.
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-rose-700">Integrações planejadas</p>
            <h2 className="text-3xl font-black md:text-4xl">Conecta com o ecossistema que o social media já usa.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
            {integrations.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-white px-4 py-4 text-center text-sm font-black text-slate-700">{item}</div>
            ))}
          </div>
        </section>

        <section id="faq" className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-4xl px-5 py-16">
            <div className="mb-8 text-center">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-rose-700">FAQ</p>
              <h2 className="text-3xl font-black md:text-4xl">Objeções que travam a compra.</h2>
            </div>
            <div className="space-y-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="rounded-[8px] border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer text-sm font-black text-slate-950">{question}</summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-slate-700">Saia daqui com uma operação que você já pode mostrar para um cliente.</p>
          <div className="flex gap-2">
            <button onClick={() => setVideoOpen(true)} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-black">Ver demo</button>
            <Link href="/cadastro?plan=free"><Button className="rounded-md bg-rose-600 shadow-none hover:bg-rose-700">Criar conta grátis</Button></Link>
          </div>
        </div>
      </div>

      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
      <ExitIntent />
      <FloatingChatbot />
    </div>
  );
}
