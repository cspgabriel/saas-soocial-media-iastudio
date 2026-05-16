'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { CalendarDays, Filter, ChevronLeft, ChevronRight, Image as ImageIcon, Send } from 'lucide-react';

export default function PlannerPage() {
  const dt = new Date();
  const currentMonth = dt.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar');

  // Simple mock grid
  const days = Array.from({length: 30}, (_, i) => i + 1);

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Planejamento de Conteúdo</h1>
          <p className="text-slate-400 mt-0.5 text-sm">Navegue pelas postagens, arraste e solte para reagendar.</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-slate-700 bg-slate-800 text-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 appearance-none">
            <option>Todos os Clientes</option>
            <option>Cafeteria Blend</option>
            <option>TechStart Inc</option>
          </select>
          <Button variant="primary">Agendar Post</Button>
        </div>
      </div>

      <Card className="flex flex-col flex-1 min-h-[600px] overflow-hidden border-slate-700/50">
        <div className="border-b border-slate-700/50 p-4 flex items-center justify-between bg-slate-900/50 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('calendar')}
                className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${activeTab === 'calendar' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Mês
              </button>
              <button 
                onClick={() => setActiveTab('list')}
                className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${activeTab === 'list' ? 'bg-teal-500 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Semana
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1 items-center">
              <Button variant="ghost" className="px-2 text-slate-400 hover:text-white"><ChevronLeft className="w-5 h-5"/></Button>
              <span className="flex items-center px-4 font-bold capitalize text-white tracking-wide">{currentMonth}</span>
              <Button variant="ghost" className="px-2 text-slate-400 hover:text-white"><ChevronRight className="w-5 h-5"/></Button>
            </div>
            <Button variant="outline" className="text-sm px-3"><Filter className="w-4 h-4 mr-2" /> Filtros</Button>
          </div>
        </div>

        {/* Calendar Grid View */}
        {activeTab === 'calendar' && (
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 bg-slate-950/50 p-4">
            <div className="grid grid-cols-7 gap-3">
              {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map(d => (
                <div key={d} className="p-2 text-center text-[10px] font-bold text-slate-500 tracking-widest">
                  {d}
                </div>
              ))}
              
              {/* Padding for offset (mocking) - 3 empty spaces */}
              <div className="bg-slate-800/10 rounded-xl min-h-[140px] border border-slate-800/50" />
              <div className="bg-slate-800/10 rounded-xl min-h-[140px] border border-slate-800/50" />
              <div className="bg-slate-800/10 rounded-xl min-h-[140px] border border-slate-800/50" />
              
              {days.map(day => {
                const hasPost = day % 4 === 0;
                const requiresApproval = day % 7 === 0;
                
                return (
                  <div key={day} className={`rounded-xl min-h-[140px] p-3 transition-colors group flex flex-col gap-2 ${day === 17 ? 'border-2 border-teal-500/50 bg-slate-800/40' : 'bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50'}`}>
                    <span className={`text-[10px] text-center font-bold tracking-wider ${day === 17 ? 'text-teal-400' : 'text-slate-500'}`}>{day}</span>
                    {hasPost && (
                      <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-2 flex flex-col gap-2 cursor-pointer hover:bg-teal-500/20 transition-colors">
                        <div className="flex items-center gap-1 font-semibold text-teal-400 text-[10px] uppercase tracking-wider">
                           Instagram
                        </div>
                        <div className="w-full h-1 bg-teal-500/40 rounded mt-1"></div>
                        <div className="w-2/3 h-1 bg-teal-500/40 rounded"></div>
                        <span className="text-[10px] text-slate-300 truncate mt-1">
                          Cafeteria Blend
                        </span>
                      </div>
                    )}
                    {requiresApproval && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 flex flex-col gap-2 mt-1 cursor-pointer hover:bg-blue-500/20 transition-colors">
                        <div className="flex items-center gap-1 font-semibold text-blue-400 text-[10px] uppercase tracking-wider">
                           Email
                        </div>
                        <div className="w-full h-1 bg-blue-500/40 rounded mt-1"></div>
                        <span className="text-[10px] text-slate-300 truncate mt-1">
                          TechStart
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Card>
    </Layout>
  );
}
