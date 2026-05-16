'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Calculator, Percent, DollarSign, Users, MousePointerClick, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function CalculatorsPage() {
  const [activeCalc, setActiveCalc] = useState<'engagement' | 'roi'>('engagement');

  // Engagement State
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [saves, setSaves] = useState('');
  const [shares, setShares] = useState('');

  // ROI State
  const [investment, setInvestment] = useState('');
  const [revenue, setRevenue] = useState('');

  // Computeds
  const calculateEngagement = () => {
    const totalInteractions = (Number(likes) || 0) + (Number(comments) || 0) + (Number(saves) || 0) + (Number(shares) || 0);
    const f = Number(followers) || 1;
    return ((totalInteractions / f) * 100).toFixed(2);
  };

  const calculateROI = () => {
    const inv = Number(investment) || 0;
    const rev = Number(revenue) || 0;
    if (inv === 0) return '0.00';
    return (((rev - inv) / inv) * 100).toFixed(2);
  };

  const getEngagementRating = (rate: number) => {
    if (rate >= 5) return { text: 'Excelente', color: 'text-teal-600', bg: 'bg-teal-50' };
    if (rate >= 3) return { text: 'Bom', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (rate >= 1) return { text: 'Regular', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { text: 'Abaixo da média', color: 'text-rose-600', bg: 'bg-rose-50' };
  };

  const engRateParams = getEngagementRating(Number(calculateEngagement()));

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight gap-2 flex items-center">
          <Calculator className="w-6 h-6 text-teal-600" />
          Calculadoras & Ferramentas
        </h1>
        <p className="text-slate-500 mt-0.5 text-sm">Facilite o dia a dia da gestão de redes sociais.</p>
      </div>

      <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCalc('engagement')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeCalc === 'engagement' 
              ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-sm' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Percent className="w-4 h-4" />
          Taxa de Engajamento
        </button>
        <button
          onClick={() => setActiveCalc('roi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeCalc === 'roi' 
              ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          ROI de Campanhas
        </button>
      </div>

      <motion.div
        key={activeCalc}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <Card className="lg:col-span-2 border-slate-200/60 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>{activeCalc === 'engagement' ? 'Calcular Engajamento' : 'Calcular Retorno sobre Investimento (ROI)'}</CardTitle>
          </CardHeader>
          <CardContent>
            {activeCalc === 'engagement' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Total de Seguidores</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="number" 
                        value={followers} 
                        onChange={e => setFollowers(e.target.value)}
                        placeholder="Ex: 10000"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:bg-white text-slate-800 transition-all font-mono" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Curtidas</label>
                    <input type="number" 
                      value={likes} 
                      onChange={e => setLikes(e.target.value)}
                      placeholder="Ex: 500"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:bg-white text-slate-800 transition-all font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Comentários</label>
                    <input type="number" 
                      value={comments} 
                      onChange={e => setComments(e.target.value)}
                      placeholder="Ex: 45"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:bg-white text-slate-800 transition-all font-mono" />
                  </div>
                </div>
                <div className="space-y-4">
                   <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Salvamentos</label>
                    <input type="number" 
                      value={saves} 
                      onChange={e => setSaves(e.target.value)}
                      placeholder="Ex: 120"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:bg-white text-slate-800 transition-all font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Compartilhamentos</label>
                    <input type="number" 
                      value={shares} 
                      onChange={e => setShares(e.target.value)}
                      placeholder="Ex: 30"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:bg-white text-slate-800 transition-all font-mono" />
                  </div>
                  <div className="pt-6">
                    <Button variant="outline" className="w-full" onClick={() => { setFollowers(''); setLikes(''); setComments(''); setSaves(''); setShares(''); }}>Limpar Campos</Button>
                  </div>
                </div>
              </div>
            )}
            {activeCalc === 'roi' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Investimento Total (Ads + Custo)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="number" 
                      value={investment} 
                      onChange={e => setInvestment(e.target.value)}
                      placeholder="Ex: 500"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:bg-white text-slate-800 transition-all font-mono" />
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Receita Gerada</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="number" 
                      value={revenue} 
                      onChange={e => setRevenue(e.target.value)}
                      placeholder="Ex: 2500"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:bg-white text-slate-800 transition-all font-mono" />
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button variant="outline" onClick={() => { setInvestment(''); setRevenue(''); }}>Limpar Campos</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm bg-white flex flex-col">
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center flex-1 py-8">
            {activeCalc === 'engagement' ? (
              <>
                <div className="w-24 h-24 rounded-full accent-gradient flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                  <span className="text-3xl font-bold text-white font-mono">{calculateEngagement()}%</span>
                </div>
                <div className={`px-4 py-1.5 rounded-full ${engRateParams.bg} ${engRateParams.color} border border-${engRateParams.color.split('-')[1]}-200 text-sm font-bold tracking-wide uppercase mb-4`}>
                  {engRateParams.text}
                </div>
                <p className="text-slate-500 text-sm text-center">
                  Cálculo baseado em {(Number(likes) || 0) + (Number(comments) || 0) + (Number(saves) || 0) + (Number(shares) || 0)} interações totais.
                </p>
              </>
            ) : (
              <>
                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <span className="text-3xl font-bold text-white font-mono">{calculateROI()}%</span>
                </div>
                <div className={`px-4 py-1.5 rounded-full ${Number(calculateROI()) > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'} border text-sm font-bold tracking-wide uppercase mb-4`}>
                  {Number(calculateROI()) > 0 ? 'ROI Positivo' : 'ROI Negativo/Zero'}
                </div>
                <p className="text-slate-500 text-sm text-center">
                  Para cada R$ 1,00 investido, o retorno é de R$ {((Number(calculateROI()) / 100) + 1).toFixed(2)}.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
}
