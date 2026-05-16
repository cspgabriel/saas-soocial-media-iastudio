'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { CalendarDays, Filter, ChevronLeft, ChevronRight, Image as ImageIcon, Send, Clock, Plus } from 'lucide-react';

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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Planejamento e Agendamento</h1>
          <p className="text-slate-500 mt-0.5 text-sm">Organize visualmente as postagens de todos os seus clientes.</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-slate-200 bg-white text-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-teal-500/50 appearance-none cursor-pointer shadow-sm">
            <option>Todos os Clientes</option>
            <option>Cafeteria Blend</option>
            <option>TechStart Inc</option>
          </select>
          <Button variant="primary" className="shadow-md shadow-teal-500/20"><Plus className="w-4 h-4 mr-2" /> Novo Post</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 min-h-[700px]">
        {/* Sidebar/Unscheduled Area */}
        <div className="w-full lg:w-72 flex flex-col gap-4">
          <Card className="flex-1 bg-slate-50 border-slate-200 shadow-sm border-dashed">
            <CardHeader className="pb-3 border-b border-slate-200">
              <CardTitle className="text-sm font-bold text-slate-700 flex items-center justify-between">
                <span>Rascunhos</span>
                <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-[10px]">3</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm cursor-grab hover:border-teal-300 transition-colors group">
                  <div className="flex gap-2 mb-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                      <ImageIcon className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700 line-clamp-1">Post Carrossel Dicas</p>
                      <p className="text-[10px] text-slate-500">Cafeteria Blend</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 border-t border-slate-50 pt-2">
                     <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center">
                       <span className="text-[8px] font-bold text-teal-700">IG</span>
                     </div>
                     <span className="text-[10px] text-slate-400 font-medium">Sem data</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs border-dashed bg-transparent hover:bg-slate-100 text-slate-500">
                + Adicionar Rascunho
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar View */}
        <Card className="flex flex-col flex-1 overflow-hidden border-slate-200 shadow-sm bg-white">
          <div className="border-b border-slate-100 p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center p-1 bg-slate-100 rounded-lg">
                <button 
                  onClick={() => setActiveTab('calendar')}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === 'calendar' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Mês
                </button>
                <button 
                  onClick={() => setActiveTab('list')}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${activeTab === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Semana
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex gap-2 items-center">
                <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors"><ChevronLeft className="w-5 h-5"/></button>
                <span className="flex items-center px-2 font-bold capitalize text-slate-800 tracking-wide min-w-[140px] justify-center">{currentMonth}</span>
                <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors"><ChevronRight className="w-5 h-5"/></button>
              </div>
              <Button variant="outline" className="text-sm px-3 h-9 hidden sm:flex"><Filter className="w-4 h-4 mr-2" /> Filtros</Button>
            </div>
          </div>

          {/* Calendar Grid View */}
          {activeTab === 'calendar' && (
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 p-4 bg-slate-50/30">
              <div className="grid grid-cols-7 gap-3">
                {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(d => (
                  <div key={d} className="py-2 text-center text-[11px] font-bold text-slate-500 tracking-widest border-b border-slate-200 mb-2">
                    {d}
                  </div>
                ))}
                
                {/* Padding for offset (mocking) - 2 empty spaces */}
                <div className="bg-transparent min-h-[140px] rounded-xl border border-transparent" />
                <div className="bg-transparent min-h-[140px] rounded-xl border border-transparent" />
                
                {days.map(day => {
                  const hasPost = day % 4 === 0;
                  const requiresApproval = day % 7 === 0;
                  const isToday = day === 17;
                  
                  return (
                    <div key={day} className={`rounded-xl min-h-[160px] p-2.5 transition-all group flex flex-col gap-2 ${isToday ? 'bg-teal-50/30 border-2 border-teal-500 shadow-sm' : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md'}`}>
                      <div className="flex justify-between items-center px-1">
                        <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${isToday ? 'bg-teal-500 text-white' : 'text-slate-600 group-hover:bg-slate-100'}`}>
                          {day}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-slate-400 transition-opacity">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex-1 space-y-2 mt-1">
                        {hasPost && (
                          <div className="bg-white border border-slate-200 rounded-lg p-2.5 cursor-grab hover:border-teal-400 hover:shadow-sm transition-all group/card shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="font-bold text-slate-800 text-[10px] uppercase">IG</span>
                              </div>
                              <span className="text-[10px] font-medium text-slate-400 flex items-center"><Clock className="w-3 h-3 mr-0.5"/> 18:00</span>
                            </div>
                            <p className="text-[11px] font-medium text-slate-600 line-clamp-2 leading-tight">Post Carrossel de Dia das Mães</p>
                          </div>
                        )}
                        {requiresApproval && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 cursor-grab hover:border-amber-300 transition-all shadow-sm">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[9px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded tracking-wide uppercase">Aprovação</span>
                            </div>
                            <p className="text-[11px] font-medium text-slate-700 line-clamp-1 leading-tight">Reels Sorteio</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
