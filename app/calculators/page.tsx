'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Calculator } from 'lucide-react';

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState('roi');

  // ROI
  const [roiInvestimento, setRoiInvestimento] = useState('');
  const [roiRetorno, setRoiRetorno] = useState('');
  
  // ROAS
  const [roasGasto, setRoasGasto] = useState('');
  const [roasReceita, setRoasReceita] = useState('');
  
  // CPC
  const [cpcCusto, setCpcCusto] = useState('');
  const [cpcCliques, setCpcCliques] = useState('');
  
  // CPA
  const [cpaCusto, setCpaCusto] = useState('');
  const [cpaConversoes, setCpaConversoes] = useState('');
  
  // CPM
  const [cpmCusto, setCpmCusto] = useState('');
  const [cpmImpressoes, setCpmImpressoes] = useState('');
  
  // LTV
  const [ltvTicket, setLtvTicket] = useState('');
  const [ltvTransacoes, setLtvTransacoes] = useState('');
  const [ltvRetencao, setLtvRetencao] = useState('');
  
  // CAC
  const [cacMarketing, setCacMarketing] = useState('');
  const [cacVendas, setCacVendas] = useState('');
  const [cacClientes, setCacClientes] = useState('');

  // Taxa de Engajamento
  const [engInteracoes, setEngInteracoes] = useState('');
  const [engAlcance, setEngAlcance] = useState('');
  
  // Custo Design
  const [desHora, setDesHora] = useState('');
  const [desTempo, setDesTempo] = useState('');
  
  // Margem Agência
  const [mgReceita, setMgReceita] = useState('');
  const [mgCustos, setMgCustos] = useState('');

  const calculators = [
    { id: 'roi', label: 'ROI (%)', title: 'Calculadora de ROI (Retorno sobre Investimento)' },
    { id: 'roas', label: 'ROAS', title: 'Calculadora de ROAS (Return on Ad Spend)' },
    { id: 'cpc', label: 'CPC', title: 'Calculadora de Custo Por Clique (CPC)' },
    { id: 'cpa', label: 'CPA', title: 'Calculadora de Custo Por Aquisição (CPA)' },
    { id: 'cpm', label: 'CPM', title: 'Calculadora de Custo Por Mil (CPM)' },
    { id: 'ltv', label: 'LTV', title: 'Calculadora de Lifetime Value (LTV)' },
    { id: 'cac', label: 'CAC', title: 'Calculadora de Custo de Aquisição de Cliente (CAC)' },
    { id: 'engajamento', label: 'Engajamento', title: 'Taxa de Engajamento' },
    { id: 'design', label: 'Freelance / Design', title: 'Custo de Projeto / Hora' },
    { id: 'margem', label: 'Margem Agência', title: 'Margem de Lucro da Agência' }
  ];

  const formatCurrency = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return 'R$ 0,00';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const currentCalc = calculators.find(c => c.id === activeTab);

  return (
    <Layout>
      <div className="mb-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Calculator className="w-6 h-6 text-slate-600" />
          Kit de Calculadoras
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Ferramentas essenciais para calcular métricas de performance, tráfego pago e gestão da sua agência.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Menu Lateral */}
        <div className="w-full lg:w-64 shrink-0 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-100">
             <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Métricas & Gestão</h3>
          </div>
          <div className="flex flex-col p-2">
            {calculators.map(calc => (
              <button
                key={calc.id}
                onClick={() => setActiveTab(calc.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === calc.id ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {calc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <Card className="flex-1 bg-white border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle>{currentCalc?.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-10">
            
            {activeTab === 'roi' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Retorno (Receita Gerada)</label>
                    <input type="number" value={roiRetorno} onChange={e => setRoiRetorno(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Investimento Total (Custo)</label>
                    <input type="number" value={roiInvestimento} onChange={e => setRoiInvestimento(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" placeholder="0.00" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Resultado ROI</span>
                  <span className="text-5xl font-black text-emerald-400">
                    {roiInvestimento && roiRetorno ? (((Number(roiRetorno) - Number(roiInvestimento)) / Number(roiInvestimento)) * 100).toFixed(2) + '%' : '0%'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'roas' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Receita Gerada pelos Anúncios</label>
                    <input type="number" value={roasReceita} onChange={e => setRoasReceita(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gasto em Anúncios (Ad Spend)</label>
                    <input type="number" value={roasGasto} onChange={e => setRoasGasto(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" placeholder="0.00" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Resultado ROAS</span>
                  <span className="text-5xl font-black text-emerald-400">
                    {roasGasto && roasReceita && Number(roasGasto) > 0 ? (Number(roasReceita) / Number(roasGasto)).toFixed(2) + 'x' : '0x'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'cpc' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Custo Total da Campanha</label>
                    <input type="number" value={cpcCusto} onChange={e => setCpcCusto(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Quantidade de Cliques</label>
                    <input type="number" value={cpcCliques} onChange={e => setCpcCliques(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Custo Por Clique (CPC)</span>
                  <span className="text-5xl font-black text-amber-400">
                    {cpcCusto && cpcCliques && Number(cpcCliques) > 0 ? formatCurrency(Number(cpcCusto) / Number(cpcCliques)) : '-'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'cpa' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Custo Total da Campanha</label>
                    <input type="number" value={cpaCusto} onChange={e => setCpaCusto(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Número de Conversões (Vendas/Leads)</label>
                    <input type="number" value={cpaConversoes} onChange={e => setCpaConversoes(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Custo Por Aquisição (CPA)</span>
                  <span className="text-5xl font-black text-amber-400">
                    {cpaCusto && cpaConversoes && Number(cpaConversoes) > 0 ? formatCurrency(Number(cpaCusto) / Number(cpaConversoes)) : '-'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'cpm' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Custo Total da Campanha</label>
                    <input type="number" value={cpmCusto} onChange={e => setCpmCusto(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total de Impressões</label>
                    <input type="number" value={cpmImpressoes} onChange={e => setCpmImpressoes(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Custo Por Mil Impressões (CPM)</span>
                  <span className="text-5xl font-black text-amber-400">
                    {cpmCusto && cpmImpressoes && Number(cpmImpressoes) > 0 ? formatCurrency((Number(cpmCusto) / Number(cpmImpressoes))*1000) : '-'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'ltv' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ticket Médio p/ Compra</label>
                    <input type="number" value={ltvTicket} onChange={e => setLtvTicket(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Transações por ano (em média)</label>
                    <input type="number" value={ltvTransacoes} onChange={e => setLtvTransacoes(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tempo de Retenção (em anos)</label>
                    <input type="number" value={ltvRetencao} onChange={e => setLtvRetencao(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">LTV Calculado</span>
                  <span className="text-5xl font-black text-emerald-400">
                    {ltvTicket && ltvTransacoes && ltvRetencao ? formatCurrency(Number(ltvTicket) * Number(ltvTransacoes) * Number(ltvRetencao)) : '-'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'cac' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Custos Totais de Marketing (mensal)</label>
                    <input type="number" value={cacMarketing} onChange={e => setCacMarketing(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Custos Totais de Vendas (mensal)</label>
                    <input type="number" value={cacVendas} onChange={e => setCacVendas(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Novos Clientes Adquiridos (mesmo período)</label>
                    <input type="number" value={cacClientes} onChange={e => setCacClientes(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Custo de Aquisição (CAC)</span>
                  <span className="text-5xl font-black text-rose-400">
                    {cacMarketing && cacVendas && cacClientes && Number(cacClientes) > 0 ? formatCurrency((Number(cacMarketing) + Number(cacVendas)) / Number(cacClientes)) : '-'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'engajamento' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total de Interações (Curtidas + Comentários + Salvos + Shares)</label>
                    <input type="number" value={engInteracoes} onChange={e => setEngInteracoes(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Alcance Total do Post (ou Seguidores Totais)</label>
                    <input type="number" value={engAlcance} onChange={e => setEngAlcance(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Taxa de Engajamento</span>
                  <span className="text-5xl font-black text-fuchsia-400">
                    {engInteracoes && engAlcance && Number(engAlcance) > 0 ? ((Number(engInteracoes) / Number(engAlcance))*100).toFixed(2) + '%' : '-'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Custo da sua Hora-Trabalho Desejada</label>
                    <input type="number" value={desHora} onChange={e => setDesHora(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tempo Estimado para o Projeto (em Horas)</label>
                    <input type="number" value={desTempo} onChange={e => setDesTempo(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Preço Sugerido do Projeto</span>
                  <span className="text-5xl font-black text-emerald-400">
                    {desHora && desTempo ? formatCurrency(Number(desHora) * Number(desTempo)) : '-'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'margem' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Receita Mensal Total da Agência</label>
                    <input type="number" value={mgReceita} onChange={e => setMgReceita(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Custos Totais (Ferramentas, Salários, Impostos)</label>
                    <input type="number" value={mgCustos} onChange={e => setMgCustos(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800/30" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Margem de Lucro (%)</span>
                  <span className="text-5xl font-black text-sky-400">
                    {mgReceita && mgCustos && Number(mgReceita) > 0 ? (((Number(mgReceita) - Number(mgCustos)) / Number(mgReceita))*100).toFixed(2) + '%' : '-'}
                  </span>
                </div>
              </div>
            )}
            
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
