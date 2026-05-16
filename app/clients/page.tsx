'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Search, Plus, MoreVertical, FileText, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const clients = [
  { id: 1, name: 'Cafeteria Blend', status: 'Ativo', plan: 'Premium (12 posts)', nextRenew: '15/Jun/2026', unread: 2 },
  { id: 2, name: 'TechStart Inc', status: 'Onboarding', plan: 'Basic (8 posts)', nextRenew: '-', unread: 0 },
  { id: 3, name: 'Dr. Roberto - Dentista', status: 'Ativo', plan: 'Pro (20 posts)', nextRenew: '22/Jun/2026', unread: 5 },
  { id: 4, name: 'Boutique da Moda', status: 'Inativo', plan: 'Basic', nextRenew: '-', unread: 0 },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Clientes & Contratos</h1>
          <p className="text-slate-500 mt-0.5 text-sm">Gerencie a base de clientes da sua agência.</p>
        </div>
        <Button variant="primary" className="shrink-0"><Plus className="w-4 h-4 mr-2"/> Novo Cliente</Button>
      </div>

      <Card className="mb-8 border-slate-200/60 shadow-sm">
        <div className="p-4 border-b border-slate-200/60 flex flex-col sm:flex-row gap-4 bg-slate-50/50">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-teal-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="border border-slate-200 bg-white text-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 focus:bg-slate-50 text-sm appearance-none cursor-pointer">
            <option>Todos os Status</option>
            <option>Ativos</option>
            <option>Em Onboarding</option>
          </select>
        </div>
        
        <div className="overflow-x-auto bg-white/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/60 text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Plano Atual</th>
                <th className="px-6 py-4 font-semibold">Próxima Renovação</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((client, i) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={client.id} 
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex flex-col items-center justify-center font-bold border border-teal-100 shadow-sm">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{client.name}</p>
                        {client.unread > 0 && (
                          <span className="text-[10px] text-amber-600 font-medium tracking-wide">{client.unread} aprovações pendentes</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border
                      ${client.status === 'Ativo' ? 'bg-teal-50 text-teal-700 border-teal-200' : ''}
                      ${client.status === 'Onboarding' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                      ${client.status === 'Inativo' ? 'bg-slate-100 text-slate-500 border-slate-200' : ''}
                    `}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{client.plan}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{client.nextRenew}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" className="p-2 aspect-square text-slate-400 hover:text-slate-700"><MoreVertical className="w-4 h-4" /></Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  );
}
