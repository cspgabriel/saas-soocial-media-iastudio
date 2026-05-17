"use client";

import Link from "next/link";
import { AlertCircle, Calendar, CheckCircle2, Clock3, FileText, RefreshCw, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatCurrency, useOpsStore } from "@/lib/opsStore";

const nextStatuses = {
  Ideia: "Criando",
  Criando: "Aprovar",
  Aprovar: "Aprovado",
  Aprovado: "Publicado",
  Publicado: "Publicado",
} as const;

export default function Dashboard() {
  const { state, metrics, updatePost, resetDemo } = useOpsStore();
  const approvals = state.posts.filter((post) => post.status === "Aprovar");
  const today = new Date().toISOString().slice(0, 10);
  const dueToday = state.posts.filter((post) => post.date <= today && post.status !== "Publicado");

  const stats = [
    { label: "Clientes ativos", value: metrics.activeClients, icon: Users, detail: `${formatCurrency(metrics.monthlyRevenue)} MRR local` },
    { label: "Posts na fila", value: metrics.scheduled, icon: Calendar, detail: "ideia, criacao e aprovacao" },
    { label: "Aprovar agora", value: metrics.approvals, icon: AlertCircle, detail: "gargalo principal" },
    { label: "Publicados", value: metrics.published, icon: CheckCircle2, detail: "historico deste workspace" },
  ];

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-600">Painel rapido</p>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">O que precisa sair hoje</h1>
          <p className="mt-1 text-sm text-slate-500">Menos dashboard bonito, mais fila de trabalho, aprovacao e proximo passo.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetDemo}><RefreshCw className="mr-2 h-4 w-4" /> Reset demo</Button>
          <Link href="/planner"><Button>Novo post</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4 flex items-start justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
                <div className="rounded-md bg-slate-100 p-2 text-slate-700"><stat.icon className="h-4 w-4" /></div>
              </div>
              <p className="text-3xl font-black text-slate-950">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{stat.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Fila de aprovacao</CardTitle>
            <Link href="/planner" className="text-xs font-bold uppercase tracking-wider text-rose-600">Ver calendario</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {approvals.length === 0 ? (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">Sem aprovacao parada.</div>
            ) : approvals.map((post) => {
              const client = state.clients.find((item) => item.id === post.clientId);
              return (
                <div key={post.id} className="flex flex-col gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-900">{post.title}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-600">{client?.name} - {post.platform} - {post.format} - {post.date} {post.time}</p>
                    <p className="mt-1 text-xs text-slate-500">Objetivo: {post.objective}</p>
                  </div>
                  <Button className="bg-slate-950 hover:bg-slate-800" onClick={() => updatePost(post.id, { status: "Aprovado" })}>Marcar aprovado</Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Prioridades de hoje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dueToday.map((post) => {
              const client = state.clients.find((item) => item.id === post.clientId);
              return (
                <div key={post.id} className="rounded-md border border-slate-200 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-slate-900">{post.title}</p>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-600">{post.status}</span>
                  </div>
                  <p className="text-xs text-slate-500">{client?.name} - {post.date} as {post.time}</p>
                  <button
                    className="mt-3 inline-flex items-center text-xs font-bold text-rose-600"
                    onClick={() => updatePost(post.id, { status: nextStatuses[post.status] })}
                  >
                    <Clock3 className="mr-1 h-3 w-3" /> Avancar etapa
                  </button>
                </div>
              );
            })}
            {dueToday.length === 0 && (
              <div className="rounded-md border border-slate-200 p-4 text-sm text-slate-500">Nenhum post vencendo hoje.</div>
            )}
            <Link href="/reports">
              <Button variant="outline" className="mt-2 w-full"><FileText className="mr-2 h-4 w-4" /> Ver relatorio operacional</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
