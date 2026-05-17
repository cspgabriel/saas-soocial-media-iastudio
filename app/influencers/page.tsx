"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatCurrency, formatNumber, Influencer, useOpsStore } from "@/lib/opsStore";

const emptyInfluencer: Omit<Influencer, "id"> = {
  name: "",
  handle: "",
  platform: "Instagram",
  niche: "",
  followers: 0,
  engagementRate: 0,
  contact: "",
  fit: "Media",
  nextAction: "",
};

export default function InfluencersPage() {
  const { state, addInfluencer, addCampaign } = useOpsStore();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyInfluencer);
  const [campaign, setCampaign] = useState({ name: "", clientId: state.clients[0]?.id || "", influencerId: state.influencers[0]?.id || "", budget: 0 });

  const influencers = useMemo(() => {
    const s = search.toLowerCase();
    return state.influencers.filter((item) => `${item.name} ${item.handle} ${item.niche} ${item.platform}`.toLowerCase().includes(s));
  }, [search, state.influencers]);

  const saveInfluencer = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    addInfluencer(form);
    setForm(emptyInfluencer);
  };

  const saveCampaign = (event: React.FormEvent) => {
    event.preventDefault();
    if (!campaign.name || !campaign.clientId || !campaign.influencerId) return;
    addCampaign({ ...campaign, clicks: 0, leads: 0, revenue: 0, status: "Prospectar" });
    setCampaign({ ...campaign, name: "", budget: 0 });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-black text-slate-900"><Star className="h-6 w-6 text-rose-600" /> Influenciadores simples</h1>
        <p className="mt-1 text-sm text-slate-500">Lista curta: quem e bom, contato, encaixe, proxima acao e campanha.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[380px_1fr]">
        <div className="space-y-4">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader><CardTitle>Cadastrar creator</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={saveInfluencer} className="space-y-3">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <input value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} placeholder="@usuario" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} placeholder="Plataforma" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                  <input value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })} placeholder="Nicho" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                  <input type="number" value={form.followers || ""} onChange={(e) => setForm({ ...form, followers: Number(e.target.value) })} placeholder="Seguidores" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                  <input type="number" value={form.engagementRate || ""} onChange={(e) => setForm({ ...form, engagementRate: Number(e.target.value) })} placeholder="Eng. %" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>
                <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Contato" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <input value={form.nextAction} onChange={(e) => setForm({ ...form, nextAction: e.target.value })} placeholder="Proxima acao" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <select value={form.fit} onChange={(e) => setForm({ ...form, fit: e.target.value as Influencer["fit"] })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                  <option>Alta</option><option>Media</option><option>Baixa</option>
                </select>
                <Button type="submit" className="w-full"><Plus className="mr-2 h-4 w-4" /> Salvar creator</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader><CardTitle>Nova campanha</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={saveCampaign} className="space-y-3">
                <input value={campaign.name} onChange={(e) => setCampaign({ ...campaign, name: e.target.value })} placeholder="Nome da campanha" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <select value={campaign.clientId} onChange={(e) => setCampaign({ ...campaign, clientId: e.target.value })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                  {state.clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
                </select>
                <select value={campaign.influencerId} onChange={(e) => setCampaign({ ...campaign, influencerId: e.target.value })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                  {state.influencers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
                <input type="number" value={campaign.budget || ""} onChange={(e) => setCampaign({ ...campaign, budget: Number(e.target.value) })} placeholder="Orcamento" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <Button type="submit" variant="outline" className="w-full">Criar campanha</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar creator por nome, nicho ou plataforma" className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm" />
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {influencers.map((item) => (
              <Card key={item.id} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-black text-slate-900">{item.name}</p>
                      <p className="text-sm font-semibold text-rose-600">{item.handle}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold">Fit {item.fit}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <Metric label="Nicho" value={item.niche} />
                    <Metric label="Seguidores" value={formatNumber(item.followers)} />
                    <Metric label="Eng." value={`${item.engagementRate}%`} />
                  </div>
                  <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                    <p><strong>Contato:</strong> {item.contact}</p>
                    <p><strong>Proxima acao:</strong> {item.nextAction}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader><CardTitle>Campanhas</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {state.campaigns.map((camp) => {
                const client = state.clients.find((item) => item.id === camp.clientId);
                const influencer = state.influencers.find((item) => item.id === camp.influencerId);
                return (
                  <div key={camp.id} className="rounded-md border border-slate-200 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-black text-slate-900">{camp.name}</p>
                        <p className="text-xs text-slate-500">{client?.name} com {influencer?.name}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold">{camp.status}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">Orcamento: {formatCurrency(camp.budget)} - Leads: {camp.leads} - Receita: {formatCurrency(camp.revenue)}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 p-2">
      <p className="text-[10px] font-bold uppercase text-slate-400">{label}</p>
      <p className="truncate text-xs font-black text-slate-800">{value}</p>
    </div>
  );
}
