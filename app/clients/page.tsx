"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, Plus, Search, Save } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Client, formatCurrency, useOpsStore } from "@/lib/opsStore";

const emptyClient: Client = {
  id: "",
  name: "",
  segment: "",
  status: "Onboarding",
  plan: "Pro 12 posts",
  monthlyFee: 1200,
  postsPerMonth: 12,
  tone: "",
  offer: "",
  audience: "",
  notes: "",
};

export default function ClientsPage() {
  const { state, updateClient } = useOpsStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);

  const filtered = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return state.clients.filter((client) => `${client.name} ${client.segment} ${client.status}`.toLowerCase().includes(search));
  }, [searchTerm, state.clients]);

  const saveClient = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selected?.name.trim()) return;
    updateClient({ ...selected, id: selected.id || crypto.randomUUID() });
    setSelected(null);
  };

  if (selected) {
    return (
      <Layout>
        <div className="mb-6">
          <Button variant="ghost" className="mb-2 -ml-3" onClick={() => setSelected(null)}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Voltar
          </Button>
          <h1 className="text-2xl font-black text-slate-900">{selected.id ? selected.name : "Novo cliente"}</h1>
          <p className="mt-1 text-sm text-slate-500">Briefing enxuto para alimentar IA, calendario e relatorio.</p>
        </div>

        <Card className="max-w-5xl border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Contexto comercial do cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveClient} className="grid gap-5 lg:grid-cols-2">
              <Field label="Nome" value={selected.name} onChange={(value) => setSelected({ ...selected, name: value })} />
              <Field label="Nicho" value={selected.segment} onChange={(value) => setSelected({ ...selected, segment: value })} />
              <Field label="Plano" value={selected.plan} onChange={(value) => setSelected({ ...selected, plan: value })} />
              <Field label="Mensalidade" type="number" value={String(selected.monthlyFee)} onChange={(value) => setSelected({ ...selected, monthlyFee: Number(value) })} />
              <Field label="Posts por mes" type="number" value={String(selected.postsPerMonth)} onChange={(value) => setSelected({ ...selected, postsPerMonth: Number(value) })} />
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Status</label>
                <select value={selected.status} onChange={(event) => setSelected({ ...selected, status: event.target.value as Client["status"] })} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                  <option>Ativo</option>
                  <option>Onboarding</option>
                  <option>Pausado</option>
                </select>
              </div>
              <TextArea label="Oferta principal" value={selected.offer} onChange={(value) => setSelected({ ...selected, offer: value })} />
              <TextArea label="Publico e dor" value={selected.audience} onChange={(value) => setSelected({ ...selected, audience: value })} />
              <TextArea label="Tom de voz" value={selected.tone} onChange={(value) => setSelected({ ...selected, tone: value })} />
              <TextArea label="Regras e observacoes" value={selected.notes} onChange={(value) => setSelected({ ...selected, notes: value })} />
              <div className="lg:col-span-2 flex justify-end">
                <Button type="submit"><Save className="mr-2 h-4 w-4" /> Salvar cliente</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Clientes</h1>
          <p className="mt-1 text-sm text-slate-500">Base de briefing e cobranca. Tudo que a IA precisa saber fica aqui.</p>
        </div>
        <Button onClick={() => setSelected(emptyClient)}><Plus className="mr-2 h-4 w-4" /> Novo cliente</Button>
      </div>

      <Card className="border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 p-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por cliente, nicho ou status" className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-rose-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Plano</th>
                <th className="px-5 py-3">Posts/mes</th>
                <th className="px-5 py-3">MRR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((client) => (
                <tr key={client.id} className="cursor-pointer hover:bg-slate-50" onClick={() => setSelected(client)}>
                  <td className="px-5 py-4">
                    <p className="font-black text-slate-900">{client.name}</p>
                    <p className="text-xs text-slate-500">{client.segment} - {client.offer}</p>
                  </td>
                  <td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold">{client.status}</span></td>
                  <td className="px-5 py-4 text-slate-600">{client.plan}</td>
                  <td className="px-5 py-4 text-slate-600">{client.postsPerMonth}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{formatCurrency(client.monthlyFee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400" />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="min-h-24 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400" />
    </div>
  );
}
