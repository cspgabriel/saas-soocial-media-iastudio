"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, Plus } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { PostItem, useOpsStore } from "@/lib/opsStore";

const emptyPost: Omit<PostItem, "id"> = {
  clientId: "",
  title: "",
  platform: "Instagram",
  format: "Feed",
  date: new Date().toISOString().slice(0, 10),
  time: "09:00",
  status: "Ideia",
  objective: "",
};

const columns: PostItem["status"][] = ["Ideia", "Criando", "Aprovar", "Aprovado", "Publicado"];

export default function PlannerPage() {
  const { state, addPost, updatePost } = useOpsStore();
  const [clientFilter, setClientFilter] = useState("all");
  const [form, setForm] = useState<Omit<PostItem, "id">>({ ...emptyPost, clientId: state.clients[0]?.id || "" });

  const posts = useMemo(() => {
    return state.posts
      .filter((post) => clientFilter === "all" || post.clientId === clientFilter)
      .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  }, [clientFilter, state.posts]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.clientId) return;
    addPost(form);
    setForm({ ...emptyPost, clientId: form.clientId });
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black text-slate-900"><CalendarDays className="h-6 w-6 text-rose-600" /> Calendario operacional</h1>
          <p className="mt-1 text-sm text-slate-500">Fluxo simples: ideia, criacao, aprovacao, aprovado, publicado.</p>
        </div>
        <select value={clientFilter} onChange={(event) => setClientFilter(event.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
          <option value="all">Todos os clientes</option>
          {state.clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
        </select>
      </div>

      <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <Card className="h-max border-slate-200 bg-white shadow-sm">
          <CardHeader><CardTitle>Novo post rapido</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-3">
              <select value={form.clientId} onChange={(event) => setForm({ ...form, clientId: event.target.value })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                <option value="">Cliente</option>
                {state.clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
              </select>
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Titulo do post" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
              <textarea value={form.objective} onChange={(event) => setForm({ ...form, objective: event.target.value })} placeholder="Objetivo: lead, autoridade, oferta, prova social..." className="min-h-20 w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
              <div className="grid grid-cols-2 gap-2">
                <select value={form.platform} onChange={(event) => setForm({ ...form, platform: event.target.value as PostItem["platform"] })} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                  <option>Instagram</option><option>LinkedIn</option><option>TikTok</option><option>YouTube</option>
                </select>
                <select value={form.format} onChange={(event) => setForm({ ...form, format: event.target.value as PostItem["format"] })} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                  <option>Feed</option><option>Reels</option><option>Stories</option><option>Carrossel</option><option>Shorts</option>
                </select>
                <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <input type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
              </div>
              <Button type="submit" className="w-full"><Plus className="mr-2 h-4 w-4" /> Criar post</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-3 lg:grid-cols-5">
          {columns.map((status) => (
            <Card key={status} className="min-h-[520px] border-slate-200 bg-slate-50 shadow-sm">
              <CardHeader className="px-4 py-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  {status}
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs">{posts.filter((post) => post.status === status).length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-3">
                {posts.filter((post) => post.status === status).map((post) => {
                  const client = state.clients.find((item) => item.id === post.clientId);
                  return (
                    <div key={post.id} className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
                      <p className="text-sm font-black text-slate-900">{post.title}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{client?.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{post.platform} - {post.format}</p>
                      <p className="mt-1 text-xs text-slate-500">{post.date} {post.time}</p>
                      <p className="mt-2 text-xs text-slate-600">{post.objective}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {columns.map((next) => (
                          <button key={next} onClick={() => updatePost(post.id, { status: next })} className={`rounded-md px-2 py-1 text-[10px] font-bold ${next === status ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                            {next === status ? <Check className="mx-auto h-3 w-3" /> : next}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
