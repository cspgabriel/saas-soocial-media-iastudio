'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Star, TrendingUp, Users, DollarSign, Plus, Megaphone, CheckCircle2, Instagram, Youtube, LayoutGrid, List } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockInfluencers = [
  { id: 1, name: 'Ana Tech', handle: '@anatech', niche: 'Tecnologia', followers: '120k', engRate: '4.5%', platform: 'Instagram' },
  { id: 2, name: 'Carlos Café', handle: '@carloscafe', niche: 'Lifestyle', followers: '85k', engRate: '6.2%', platform: 'TikTok' },
  { id: 3, name: 'Mundo Fitness', handle: '@mundofit', niche: 'Saúde', followers: '250k', engRate: '3.1%', platform: 'Instagram' },
];

const mockCampaigns = [
  { id: 1, name: 'Lançamento App XYZ', influencer: 'Ana Tech', status: 'Em andamento', budget: 'R$ 2.500', roi: '150%' },
  { id: 2, name: 'Promoção de Inverno', influencer: 'Carlos Café', status: 'Concluída', budget: 'R$ 1.200', roi: '320%' },
];

const dataChart = [
  { name: 'Jan', clicks: 4000, conv: 2400 },
  { name: 'Fev', clicks: 3000, conv: 1398 },
  { name: 'Mar', clicks: 2000, conv: 9800 },
  { name: 'Abr', clicks: 2780, conv: 3908 },
  { name: 'Mai', clicks: 1890, conv: 4800 },
  { name: 'Jun', clicks: 2390, conv: 3800 },
];

export default function InfluencersPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'influencers' | 'campaigns'>('dashboard');

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Gestão de Influenciadores
          </h1>
          <p className="text-slate-500 mt-0.5 text-sm">Controle contratos, campanhas e resultados do marketing de influência.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-max">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('influencers')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'influencers' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Influenciadores
          </button>
          <button 
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'campaigns' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Campanhas
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-slate-200/60 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Users className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Influenciadores</p>
                    <h3 className="text-2xl font-bold text-slate-800">24</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200/60 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><Megaphone className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Campanhas Ativas</p>
                    <h3 className="text-2xl font-bold text-slate-800">6</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200/60 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><TrendingUp className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Cliques Gerados</p>
                    <h3 className="text-2xl font-bold text-slate-800">18.4K</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200/60 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><DollarSign className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">ROI Médio</p>
                    <h3 className="text-2xl font-bold text-slate-800">210%</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle>Engajamento vs Cliques</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="clicks" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="conv" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle>Crescimento de Views</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="conv" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'influencers' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Diretório de Influenciadores</h2>
            <Button variant="primary"><Plus className="w-4 h-4 mr-2"/> Cadastrar</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockInfluencers.map((inf) => (
              <Card key={inf.id} className="border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full mb-3 flex items-center justify-center">
                    <Star className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-slate-800">{inf.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{inf.handle}</p>
                  
                  <div className="w-full grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 mt-2">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nicho</p>
                      <p className="text-xs font-semibold text-slate-700">{inf.niche}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Followers</p>
                      <p className="text-xs font-semibold text-slate-700">{inf.followers}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Engaj.</p>
                      <p className="text-xs font-semibold text-slate-700">{inf.engRate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Campanhas Ativas e Histórico</h2>
            <Button variant="primary"><Plus className="w-4 h-4 mr-2"/> Nova Campanha</Button>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Nome da Campanha</th>
                  <th className="px-6 py-4">Influenciador</th>
                  <th className="px-6 py-4">Orçamento</th>
                  <th className="px-6 py-4">ROI</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockCampaigns.map(camp => (
                  <tr key={camp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{camp.name}</td>
                    <td className="px-6 py-4 text-slate-600">{camp.influencer}</td>
                    <td className="px-6 py-4 text-slate-600">{camp.budget}</td>
                    <td className="px-6 py-4 font-medium text-emerald-600">{camp.roi}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        camp.status === 'Em andamento' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {camp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}
