"use client";

import { Download, FileText, TrendingUp } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatCurrency, useOpsStore } from "@/lib/opsStore";

export default function ReportsPage() {
  const { state, metrics } = useOpsStore();
  const approvalRate = state.posts.length ? Math.round((state.posts.filter((post) => post.status === "Aprovado" || post.status === "Publicado").length / state.posts.length) * 100) : 0;
  const roas = metrics.campaignBudget > 0 ? (metrics.campaignRevenue / metrics.campaignBudget).toFixed(2) : "0.00";

  const report = [
    `SocialOS - Relatorio operacional`,
    `Clientes ativos: ${metrics.activeClients}`,
    `Posts na fila: ${metrics.scheduled}`,
    `Posts publicados: ${metrics.published}`,
    `Taxa de aprovacao/publicacao: ${approvalRate}%`,
    `Receita mensal cadastrada: ${formatCurrency(metrics.monthlyRevenue)}`,
    `ROAS influencia: ${roas}x`,
  ].join("\n");

  const copyReport = async () => {
    await navigator.clipboard.writeText(report);
    alert("Relatorio copiado.");
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black text-slate-900"><FileText className="h-6 w-6 text-rose-600" /> Relatorio pratico</h1>
          <p className="mt-1 text-sm text-slate-500">Resumo que da para copiar para cliente ou reuniao interna.</p>
        </div>
        <Button onClick={copyReport}><Download className="mr-2 h-4 w-4" /> Copiar resumo</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Kpi label="Receita mensal" value={formatCurrency(metrics.monthlyRevenue)} />
        <Kpi label="Aprovacao/publicacao" value={`${approvalRate}%`} />
        <Kpi label="ROAS influencia" value={`${roas}x`} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader><CardTitle>Texto do relatorio</CardTitle></CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-md bg-slate-950 p-4 text-sm leading-7 text-white">{report}</pre>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader><CardTitle>Posts por cliente</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {state.clients.map((client) => {
              const posts = state.posts.filter((post) => post.clientId === client.id);
              const published = posts.filter((post) => post.status === "Publicado").length;
              const approval = posts.filter((post) => post.status === "Aprovar").length;
              return (
                <div key={client.id} className="rounded-md border border-slate-200 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-black text-slate-900">{client.name}</p>
                    <span className="text-xs font-bold text-slate-500">{client.plan}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <Metric label="Total" value={String(posts.length)} />
                    <Metric label="Publicado" value={String(published)} />
                    <Metric label="A aprovar" value={String(approval)} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-rose-50 text-rose-600"><TrendingUp className="h-5 w-5" /></div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-black text-slate-900">{value}</p>
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-[10px] font-bold uppercase text-slate-400">{label}</p>
      <p className="text-lg font-black text-slate-900">{value}</p>
    </div>
  );
}
