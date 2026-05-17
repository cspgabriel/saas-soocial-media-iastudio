'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  KeyRound,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { FloatingChatbot } from '@/components/FloatingChatbot';

const stats = [
  { label: 'Posts no mes', value: '248', icon: CalendarDays },
  { label: 'Aprovacoes pendentes', value: '17', icon: Clock3 },
  { label: 'Clientes ativos', value: '32', icon: Users },
  { label: 'Relatorios prontos', value: '11', icon: BarChart3 },
];

const features = [
  {
    icon: Users,
    title: 'CRM de clientes e marcas',
    text: 'Contexto, servicos, produtos, tom de voz e plano de postagem por cliente.',
  },
  {
    icon: CalendarDays,
    title: 'Calendario editorial',
    text: 'Planejamento mensal, aprovacoes, status de criacao e historico por canal.',
  },
  {
    icon: Bot,
    title: 'IA com BYOK ou chave gerenciada',
    text: 'Free usa a chave Gemini do cliente. Pro usa a chave da plataforma com limites.',
  },
  {
    icon: Megaphone,
    title: 'Campanhas e carrosseis',
    text: 'Geracao de copies, roteiros de carrossel, campanhas e auditoria de Instagram.',
  },
];

const plans = [
  {
    name: 'Free BYOK',
    price: 'R$ 0',
    desc: 'Para validar com a propria chave Gemini.',
    cta: 'Comecar gratis',
    href: '/cadastro?plan=free',
    items: ['1 usuario', '3 clientes', '30 geracoes/dia', 'Chave Gemini do cliente'],
  },
  {
    name: 'Pro',
    price: 'R$ 97',
    desc: 'Para freelancers e pequenas operacoes.',
    cta: 'Assinar Pro',
    href: '/cadastro?plan=pro',
    featured: true,
    items: ['10 clientes', '300 geracoes/dia', 'IA gerenciada', 'Relatorios e campanhas'],
  },
  {
    name: 'Scale',
    price: 'R$ 297',
    desc: 'Para agencias com varios clientes.',
    cta: 'Falar com vendas',
    href: '/cadastro?plan=scale',
    items: ['Clientes ilimitados', '1200 geracoes/dia', 'Multiusuario', 'Prioridade de suporte'],
  },
];

function MiniDashboard() {
  return (
    <div className="rounded-[8px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 overflow-hidden">
      <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-slate-50 px-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </div>
        <span className="text-xs font-semibold text-slate-500">socialos.app/dashboard</span>
      </div>
      <div className="grid min-h-[430px] grid-cols-[190px_1fr] bg-white">
        <aside className="hidden border-r border-slate-200 bg-slate-950 p-4 text-white md:block">
          <div className="mb-7 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-600 font-black">S</div>
            <span className="font-bold">SocialOS</span>
          </div>
          {['Dashboard', 'Clientes', 'Calendario', 'IA', 'Relatorios'].map((item, index) => (
            <div key={item} className={`mb-2 rounded-md px-3 py-2 text-sm ${index === 0 ? 'bg-white text-slate-950' : 'text-slate-400'}`}>
              {item}
            </div>
          ))}
        </aside>
        <main className="p-5">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600">Operacao desta semana</p>
              <h2 className="text-xl font-black text-slate-950">Conteudo, aprovacao e performance</h2>
            </div>
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
              IA Pro ativa
            </div>
          </div>
          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[8px] border border-slate-200 p-3">
                <stat.icon className="mb-3 h-4 w-4 text-slate-500" />
                <div className="text-2xl font-black text-slate-950">{stat.value}</div>
                <div className="text-[11px] font-semibold text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[8px] border border-slate-200 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Fila de posts</h3>
                <span className="text-xs font-semibold text-slate-500">Abril</span>
              </div>
              {['Reel clinica dental', 'Carrossel turismo RJ', 'Post oferta consultoria'].map((item, index) => (
                <div key={item} className="mb-3 flex items-center justify-between rounded-md bg-slate-50 p-3">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item}</p>
                    <p className="text-xs text-slate-500">{index === 0 ? 'Aguardando cliente' : index === 1 ? 'Em criacao' : 'Aprovado'}</p>
                  </div>
                  <span className="h-2 w-16 rounded-full bg-rose-500" />
                </div>
              ))}
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-slate-950 p-4 text-white">
              <Sparkles className="mb-4 h-5 w-5 text-rose-300" />
              <h3 className="mb-2 font-bold">Briefing para legenda</h3>
              <p className="mb-4 text-sm text-slate-300">Gerar copy persuasiva para Instagram com CTA e hashtags.</p>
              <div className="rounded-md bg-white p-3 text-sm font-semibold text-slate-950">
                Hook + legenda + CTA + hashtags em 12s
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 font-black text-white">S</div>
            <span className="text-lg font-black">SocialOS</span>
          </Link>
          <div className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
            <a href="#features">Recursos</a>
            <a href="#pricing">Planos</a>
            <a href="#firebase">Firebase</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-sm font-bold text-slate-600 sm:block">Entrar</Link>
            <Link href="/cadastro?plan=free">
              <Button className="rounded-md bg-rose-600 px-5 shadow-none hover:bg-rose-700">Testar gratis</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:pb-20 lg:pt-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-rose-700">
              Social media OS
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal text-slate-950 md:text-7xl">
              A operacao real para vender social media sem planilha e sem caos.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Cadastre clientes, planeje calendario, gere copies com IA, crie campanhas, audite perfis e controle limites por plano.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/cadastro?plan=free">
                <Button className="h-12 rounded-md bg-rose-600 px-6 shadow-none hover:bg-rose-700">
                  Comecar no Free BYOK <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="h-12 rounded-md px-6">Ver app</Button>
              </Link>
            </div>
            <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
              {['Sem cartao', 'Chave do cliente no free', 'Pro com limite gerenciado'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
            <MiniDashboard />
          </motion.div>
        </section>

        <section id="features" className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-16">
            <div className="mb-8 max-w-2xl">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-rose-700">Produto</p>
              <h2 className="text-3xl font-black text-slate-950 md:text-4xl">O que falta em gerenciador simples virou modulo de operacao.</h2>
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
          </div>
        </section>

        <section id="firebase" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">Deploy</p>
            <h2 className="text-3xl font-black md:text-4xl">Firebase pronto para hospedar, com regra clara de plano.</h2>
            <p className="mt-4 text-slate-600">O modo free pode rodar como frontend estatico no Firebase Hosting. Os recursos pagos com API server-side e limites gerenciados exigem runtime serverless.</p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-[8px] border border-slate-200 p-5">
              <KeyRound className="mb-3 h-5 w-5 text-rose-600" />
              <h3 className="font-black">Free BYOK</h3>
              <p className="mt-1 text-sm text-slate-600">Cliente cadastra a propria chave Gemini. Custo de IA fica fora da plataforma.</p>
            </div>
            <div className="rounded-[8px] border border-slate-200 p-5">
              <ShieldCheck className="mb-3 h-5 w-5 text-blue-700" />
              <h3 className="font-black">Pago com limites</h3>
              <p className="mt-1 text-sm text-slate-600">Servidor usa `GEMINI_API_KEY`, aplica limite diario e pode evoluir para billing/assinatura.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-t border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-5 py-16">
            <div className="mb-8 max-w-2xl">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-rose-300">Planos</p>
              <h2 className="text-3xl font-black md:text-4xl">Gratis para entrar, pago para escalar com IA gerenciada.</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {plans.map((plan) => (
                <div key={plan.name} className={`rounded-[8px] border p-6 ${plan.featured ? 'border-rose-400 bg-white text-slate-950' : 'border-slate-800 bg-slate-900'}`}>
                  <h3 className="text-xl font-black">{plan.name}</h3>
                  <p className={`mt-2 text-sm ${plan.featured ? 'text-slate-600' : 'text-slate-400'}`}>{plan.desc}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className={`pb-1 text-sm ${plan.featured ? 'text-slate-500' : 'text-slate-400'}`}>/mes</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button className={`mt-7 w-full rounded-md shadow-none ${plan.featured ? 'bg-rose-600 hover:bg-rose-700' : 'bg-white text-slate-950 hover:bg-slate-100'}`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FloatingChatbot />
    </div>
  );
}
