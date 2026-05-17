'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowLeft, User, Mail, Lock, Building, CreditCard, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      // Simulate API call for registration & payment setup
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8 overflow-hidden">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors z-10">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Comece seu teste de 7 dias
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Você escolheu o plano <span className="font-bold text-teal-600">Agência Pro</span>. <br/>
          Cancele a qualquer momento antes da cobrança.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-teal-500' : 'bg-slate-200'} transition-colors`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-teal-500' : 'bg-slate-200'} transition-colors`} />
        </div>

        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200/60 sm:px-10 overflow-hidden relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5" 
                onSubmit={handleNext}
              >
                <div className="pt-2">
                  <Button type="button" variant="outline" className="w-full py-3 h-auto rounded-xl flex items-center justify-center gap-2 mb-4 bg-white hover:bg-slate-50 border-slate-200 shadow-sm relative overflow-hidden group">
                     <span className="font-bold text-slate-600 group-hover:text-slate-800 transition-colors text-lg">G</span>  
                     <span className="text-slate-700 font-medium">Continuar com Google</span>
                  </Button>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-xs text-slate-400 font-medium">OU</span>
                    <div className="h-px bg-slate-200 flex-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Nome completo</label>
                  <div className="mt-2 relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="text" className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 sm:text-sm transition-all" placeholder="Maria Silva" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">E-mail corporativo</label>
                  <div className="mt-2 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="email" className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 sm:text-sm transition-all" placeholder="maria@agencia.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Nome da Agência / Empresa</label>
                  <div className="mt-2 relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="text" className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 sm:text-sm transition-all" placeholder="Agência Criativa" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Crie uma senha</label>
                  <div className="mt-2 relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="password" minLength={8} className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 sm:text-sm transition-all" placeholder="••••••••" />
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" className="w-full py-3 h-auto rounded-xl">
                    Continuar <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                <p className="mt-4 text-center text-xs text-slate-500">
                  Já em uma conta? <Link href="/login" className="text-teal-600 font-bold hover:underline">Faça login</Link>
                </p>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6" 
                onSubmit={handleNext}
              >
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                   <div>
                     <p className="text-sm font-bold text-slate-800">Agência Pro <span className="text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded ml-1">TESTE 7 DIAS</span></p>
                     <p className="text-xs text-slate-500 mt-1">Cobrança de R$ 97/mês após 7 dias</p>
                   </div>
                   <button type="button" onClick={() => setStep(1)} className="text-xs font-semibold text-teal-600 hover:text-teal-700">Editar</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Número do Cartão (Mock)</label>
                  <div className="mt-2 relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="text" className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 sm:text-sm transition-all font-mono" placeholder="0000 0000 0000 0000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Validade</label>
                    <input required type="text" className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 sm:text-sm transition-all font-mono" placeholder="MM/AA" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">CVC</label>
                    <input required type="text" className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 sm:text-sm transition-all font-mono" placeholder="123" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="primary" disabled={loading} className="w-full py-3 h-auto rounded-xl">
                    {loading ? 'Processando...' : 'Iniciar Teste Gratuito'}
                  </Button>
                </div>
                <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
                  Ao assinar, você concorda com nossos Termos de Serviço e Política de Privacidade.
                  O valor será cobrado automaticamente após 7 dias.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
