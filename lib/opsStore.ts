"use client";

import { useEffect, useMemo, useState } from "react";

export type Client = {
  id: string;
  name: string;
  segment: string;
  status: "Ativo" | "Onboarding" | "Pausado";
  plan: string;
  monthlyFee: number;
  postsPerMonth: number;
  tone: string;
  offer: string;
  audience: string;
  notes: string;
};

export type PostItem = {
  id: string;
  clientId: string;
  title: string;
  platform: "Instagram" | "LinkedIn" | "TikTok" | "YouTube";
  format: "Feed" | "Reels" | "Stories" | "Carrossel" | "Shorts";
  date: string;
  time: string;
  status: "Ideia" | "Criando" | "Aprovar" | "Aprovado" | "Publicado";
  objective: string;
};

export type Influencer = {
  id: string;
  name: string;
  handle: string;
  platform: string;
  niche: string;
  followers: number;
  engagementRate: number;
  contact: string;
  fit: "Alta" | "Media" | "Baixa";
  nextAction: string;
};

export type Campaign = {
  id: string;
  name: string;
  clientId: string;
  influencerId: string;
  budget: number;
  clicks: number;
  leads: number;
  revenue: number;
  status: "Prospectar" | "Negociando" | "Em andamento" | "Concluida";
};

export type OpsState = {
  clients: Client[];
  posts: PostItem[];
  influencers: Influencer[];
  campaigns: Campaign[];
};

const today = new Date();
const iso = (offset: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

export const defaultOpsState: OpsState = {
  clients: [
    {
      id: "cli-dental",
      name: "Clínica Sorriso RJ",
      segment: "Odontologia",
      status: "Ativo",
      plan: "Pro 16 posts",
      monthlyFee: 1800,
      postsPerMonth: 16,
      tone: "Autoridade acessível, confiança e estética premium",
      offer: "Implantes, lentes dentais e avaliação estética",
      audience: "Adultos 30+ no Rio que querem melhorar sorriso sem medo",
      notes: "Evitar promessas clínicas agressivas. Usar prova, bastidores e perguntas frequentes.",
    },
    {
      id: "cli-hotel",
      name: "Hotel Costa Azul",
      segment: "Hotelaria",
      status: "Onboarding",
      plan: "Essencial 12 posts",
      monthlyFee: 1200,
      postsPerMonth: 12,
      tone: "Convidativo, visual, direto para reserva",
      offer: "Hospedagem de fim de semana, eventos e pacote família",
      audience: "Casais e famílias buscando escapada curta",
      notes: "Priorizar datas sazonais, reels de quartos e prova social de hóspedes.",
    },
  ],
  posts: [
    { id: "post-1", clientId: "cli-dental", title: "Carrossel: 5 sinais para avaliar implante", platform: "Instagram", format: "Carrossel", date: iso(1), time: "09:00", status: "Aprovar", objective: "Gerar direct para avaliação" },
    { id: "post-2", clientId: "cli-dental", title: "Reels: bastidor de clareamento", platform: "Instagram", format: "Reels", date: iso(2), time: "18:00", status: "Criando", objective: "Aumentar confiança" },
    { id: "post-3", clientId: "cli-hotel", title: "Stories: enquete pacote fim de semana", platform: "Instagram", format: "Stories", date: iso(0), time: "12:00", status: "Publicado", objective: "Validar oferta" },
    { id: "post-4", clientId: "cli-hotel", title: "LinkedIn: eventos corporativos no hotel", platform: "LinkedIn", format: "Feed", date: iso(4), time: "10:30", status: "Ideia", objective: "Atrair empresas" },
  ],
  influencers: [
    { id: "inf-1", name: "Marina Rio", handle: "@marinario", platform: "Instagram", niche: "Lifestyle RJ", followers: 48000, engagementRate: 3.8, contact: "marina@email.com", fit: "Alta", nextAction: "Enviar proposta de permuta + fee" },
    { id: "inf-2", name: "Dra. Conteúdo", handle: "@draconteudo", platform: "TikTok", niche: "Saúde", followers: 23000, engagementRate: 5.1, contact: "WhatsApp", fit: "Media", nextAction: "Pedir mídia kit" },
  ],
  campaigns: [
    { id: "camp-1", name: "Fim de semana Costa Azul", clientId: "cli-hotel", influencerId: "inf-1", budget: 900, clicks: 340, leads: 18, revenue: 4200, status: "Em andamento" },
  ],
};

const STORAGE_KEY = "socialos_ops_state_v2";

function readState(): OpsState {
  if (typeof window === "undefined") return defaultOpsState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultOpsState, ...JSON.parse(raw) } : defaultOpsState;
  } catch {
    return defaultOpsState;
  }
}

export function useOpsStore() {
  const [state, setState] = useState<OpsState>(() => readState());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const metrics = useMemo(() => {
    const activeClients = state.clients.filter((client) => client.status === "Ativo").length;
    const approvals = state.posts.filter((post) => post.status === "Aprovar").length;
    const scheduled = state.posts.filter((post) => post.status !== "Publicado").length;
    const published = state.posts.filter((post) => post.status === "Publicado").length;
    const monthlyRevenue = state.clients.reduce((sum, client) => sum + client.monthlyFee, 0);
    const campaignRevenue = state.campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
    const campaignBudget = state.campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
    return { activeClients, approvals, scheduled, published, monthlyRevenue, campaignRevenue, campaignBudget };
  }, [state]);

  function updateClient(client: Client) {
    setState((current) => ({
      ...current,
      clients: current.clients.some((item) => item.id === client.id)
        ? current.clients.map((item) => (item.id === client.id ? client : item))
        : [{ ...client, id: client.id || crypto.randomUUID() }, ...current.clients],
    }));
  }

  function addPost(post: Omit<PostItem, "id">) {
    setState((current) => ({
      ...current,
      posts: [{ ...post, id: crypto.randomUUID() }, ...current.posts],
    }));
  }

  function updatePost(id: string, patch: Partial<PostItem>) {
    setState((current) => ({
      ...current,
      posts: current.posts.map((post) => (post.id === id ? { ...post, ...patch } : post)),
    }));
  }

  function addInfluencer(influencer: Omit<Influencer, "id">) {
    setState((current) => ({
      ...current,
      influencers: [{ ...influencer, id: crypto.randomUUID() }, ...current.influencers],
    }));
  }

  function addCampaign(campaign: Omit<Campaign, "id">) {
    setState((current) => ({
      ...current,
      campaigns: [{ ...campaign, id: crypto.randomUUID() }, ...current.campaigns],
    }));
  }

  function resetDemo() {
    setState(defaultOpsState);
  }

  return { state, metrics, updateClient, addPost, updatePost, addInfluencer, addCampaign, resetDemo };
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
