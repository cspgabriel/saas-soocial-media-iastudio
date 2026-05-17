'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Megaphone, LayoutGrid, Loader2, User } from 'lucide-react';
import Markdown from 'react-markdown';
import { mockClients } from '@/app/data/mockClients';
import { getAiRequestHeaders } from '@/lib/clientSettings';

export default function AdsPage() {
  const [platform, setPlatform] = useState('Meta Ads');
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [formData, setFormData] = useState({
    objective: '',
    targetAudience: '',
    product: '',
    extras: ''
  });
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const platforms = [
    { id: 'Meta Ads', name: 'Meta Ads', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'Google Ads', name: 'Google Ads', color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'TikTok Ads', name: 'TikTok Ads', color: 'text-black', bg: 'bg-slate-100' },
    { id: 'LinkedIn Ads', name: 'LinkedIn Ads', color: 'text-sky-700', bg: 'bg-sky-50' }
  ];

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cid = e.target.value;
    setSelectedClientId(cid);
    
    if (cid) {
      const client = mockClients.find(c => c.id.toString() === cid);
      if (client) {
        setFormData(prev => ({
          ...prev,
          product: `Empresa: ${client.companyInfo || client.name}\nServiços: ${client.services}\nProdutos: ${client.products}`
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, product: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');
    try {
      const response = await fetch('/api/generate-ads', {
        method: 'POST',
        headers: getAiRequestHeaders(),
        body: JSON.stringify({ platform, ...formData })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(data.text);
    } catch (err) {
      alert('Erro ao gerar campanha. Verifique sua chave da API Gemini no Chatbot.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-fuchsia-500" />
          Criador de Campanhas
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Gere estruturas de campanhas e copies persuasivas para as principais plataformas de anúncios.</p>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {platforms.map(p => (
          <button
            key={p.id}
            onClick={() => setPlatform(p.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold whitespace-nowrap transition-all ${
              platform === p.id 
                ? 'border-slate-800 ring-2 ring-slate-800/10 bg-slate-800 text-white shadow-md' 
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-5 border-slate-200 shadow-sm bg-white h-max">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">Briefing para {platform}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <User className="w-4 h-4" /> Selecione o Cliente (Opcional)
                </label>
                <select 
                  value={selectedClientId}
                  onChange={handleClientChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/30 bg-white"
                >
                  <option value="">-- Escolha um cliente para auto-preencher --</option>
                  {mockClients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Qual o objetivo da campanha?</label>
                <input 
                  type="text" 
                  value={formData.objective}
                  onChange={e => setFormData({...formData, objective: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/30"
                  placeholder="Ex: Vendas, Captação de Leads, Visitas ao Perfil"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Público-Alvo</label>
                <input 
                  type="text" 
                  value={formData.targetAudience}
                  onChange={e => setFormData({...formData, targetAudience: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/30"
                  placeholder="Ex: Mulheres 25-45a, interesse em moda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">O que estamos anunciando? (Contexto/Produto)</label>
                <textarea 
                  required
                  value={formData.product}
                  onChange={e => setFormData({...formData, product: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/30 min-h-[80px]"
                  placeholder="Descreva o produto, preço, diferencial..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Infos Adicionais (Bônus, Objeções, etc)</label>
                <textarea 
                  value={formData.extras}
                  onChange={e => setFormData({...formData, extras: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/30 min-h-[60px]"
                  placeholder="Opcional"
                />
              </div>
              
              <Button type="submit" variant="primary" disabled={isLoading} className="w-full mt-2 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white">
                {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mapeando Estrutura...</> : `Gerar Campanha de ${platform}`}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result ? (
          <Card className="lg:col-span-7 border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50">
              <CardTitle className="text-lg">Estrutura Sugerida</CardTitle>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto max-h-[800px]">
              <div className="prose prose-sm xl:prose-base prose-slate max-w-none">
                <Markdown>{result}</Markdown>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="lg:col-span-7 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-12 bg-slate-50/50 min-h-[400px]">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Megaphone className="w-10 h-10 text-slate-300" />
             </div>
             <p className="text-slate-500 font-medium text-center max-w-sm">
               Preencha o direcionamento ao lado para que a inteligência artificial construa sua campanha e desenvolva os anúncios para {platform}.
             </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
