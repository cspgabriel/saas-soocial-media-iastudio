'use client';

import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, Filter, TrendingUp, Users, Eye } from 'lucide-react';

const data = [
  { name: 'Jan', followers: 4000, engagement: 2400, reach: 2400 },
  { name: 'Fev', followers: 4200, engagement: 1398, reach: 2210 },
  { name: 'Mar', followers: 4500, engagement: 9800, reach: 2290 },
  { name: 'Abr', followers: 5100, engagement: 3908, reach: 2000 },
  { name: 'Mai', followers: 5400, engagement: 4800, reach: 2181 },
  { name: 'Jun', followers: 6000, engagement: 3800, reach: 2500 },
  { name: 'Jul', followers: 6800, engagement: 4300, reach: 2100 },
];

export default function ReportsPage() {
  const exportPDF = () => {
    // Here we'd use jspdf or html2canvas in a real app, 
    // for now we'll just simulate it nicely
    alert('Relatório exportado com sucesso! (Simulado)');
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Relatórios de Desempenho</h1>
          <p className="text-slate-500 mt-0.5 text-sm">Visualize o crescimento detalhado dos perfis dos seus clientes.</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-slate-200 bg-white text-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-500/50 appearance-none cursor-pointer hidden sm:block">
            <option>Cafeteria Blend</option>
            <option>TechStart Inc</option>
          </select>
          <Button variant="outline" className="bg-white"><Filter className="w-4 h-4 mr-2" /> Filtros</Button>
          <Button onClick={exportPDF} variant="primary"><Download className="w-4 h-4 mr-2" /> Exportar PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Users className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total de Seguidores</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-800">6.800</h3>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center"><Eye className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Alcance Mensal</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-800">22.1K</h3>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center"><TrendingUp className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Taxa de Engajamento</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-800">4.8%</h3>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +1.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Growth Chart */}
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle>Crescimento de Seguidores</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Chart */}
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle>Evolução do Engajamento</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="engagement" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
