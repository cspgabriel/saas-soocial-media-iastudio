'use client';

import { motion } from 'motion/react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { TrendingUp, Users, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Clientes Ativos', value: '12', trend: '+2 este mês', icon: Users, color: 'text-teal-400', bg: 'bg-teal-500/10 border border-teal-500/20' },
  { label: 'Posts Agendados', value: '84', trend: 'Próximos 7 dias', icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-500/10 border border-blue-500/20' },
  { label: 'Em Aprovação', value: '18', trend: 'Aguardando cliente', icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-500/20' },
  { label: 'Posts Publicados', value: '1.240', trend: '+14% vs último mês', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border border-emerald-500/20' },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-xl shadow-lg">✨</div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Bom dia, Julia</h1>
            <p className="text-slate-400 text-sm mt-0.5">Aqui está o resumo da sua agência.</p>
          </div>
        </div>
        <div className="flex gap-3 hidden sm:flex">
          <Button variant="outline">Baixar Relatório</Button>
          <Button variant="primary">Novo Cliente +</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={stat.label}
          >
            <Card className="h-full">
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
                  <div className="mt-2 flex items-center text-xs">
                    <TrendingUp className="mr-1 h-3 w-3 text-teal-400" />
                    <span className="text-slate-400">{stat.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-slate-700/50">
            <CardTitle>Engajamento Total</CardTitle>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-medium tracking-wider border border-slate-700">MÊS ATUAL</span>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col py-6">
            <div className="h-full flex items-end gap-2 w-full mt-4 min-h-[200px]">
              {[40, 60, 30, 90, 100, 70, 85, 45, 65, 80, 50, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-t flex flex-col justify-end group">
                  <div 
                    className="w-full bg-teal-500/40 rounded-t transition-all duration-300 group-hover:bg-teal-400" 
                    style={{ height: `${h}%` }} 
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-slate-500 font-medium border-t border-slate-800/50 pt-4">
              <span>01 Out</span>
              <span>15 Out</span>
              <span>31 Out</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 flex flex-col bg-gradient-to-br from-slate-900 to-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle>Próximas Aprovações</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="divide-y divide-slate-800/60 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-2 p-5 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Cliente Exemplo S/A</span>
                    <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full font-medium">Pendente</span>
                  </div>
                  <p className="font-medium text-white text-sm">Post Instagram - Black Friday</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-slate-500">Agendado: 15/Nov</p>
                    <button className="text-teal-400 hover:text-teal-300 text-xs font-medium">Cobrar</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-800/60 text-center">
              <Link href="/planner" className="text-xs font-bold text-teal-400 hover:text-teal-300 tracking-wide uppercase">Ver todas</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
