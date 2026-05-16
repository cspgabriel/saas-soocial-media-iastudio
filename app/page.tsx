'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/components/ui';
import { ArrowRight, CheckCircle2, LayoutDashboard, Sparkles, CalendarDays, Users, Zap, Shield, PlayCircle, X, PieChart, Activity, FileText, Database, Bot, Megaphone, Images, Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FloatingChatbot } from '@/components/FloatingChatbot';

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showGoogleTap, setShowGoogleTap] = useState(false);

  useEffect(() => {
    // Show Google One Tap popup after 2 seconds
    const timer = setTimeout(() => {
      setShowGoogleTap(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      {/* Google One Tap Mock Popup */}
      <AnimatePresence>
        {showGoogleTap && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-6 z-[100] w-80 bg-white shadow-2xl rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3 w-full">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-200 to-teal-100 p-0.5 border border-slate-200 shadow-sm flex-shrink-0">
                   <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center overflow-hidden pt-1">
                     <Users className="w-6 h-6 text-slate-300" />
                   </div>
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">Login no SocialOS</p>
                    <p className="text-[11px] text-slate-500 truncate">Continuar com sua conta do Google</p>
                 </div>
              </div>
              <button 
                onClick={() => setShowGoogleTap(false)}
                className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full p-1 transition-colors"
                aria-label="Ignorar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Link href="/cadastro">
              <button className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl py-2.5 flex items-center justify-center gap-2 transition-colors">
                <svg className="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Continuar com o Google</span>
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">SocialOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Recursos</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Preços</a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">Depoimentos</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
              Entrar
            </Link>
            <Link href="/cadastro">
              <Button variant="primary" className="text-sm rounded-full px-5 shadow-teal-500/30">
                Teste Grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-teal-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold tracking-wide uppercase mb-6">
              O fim do caos no WhatsApp e em planilhas
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Retome o controle da sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">gestão de clientes</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Você está perdendo o controle das aprovações e dos posts? Centralize toda sua operação de social media em um único lugar.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/cadastro">
                <Button variant="primary" className="h-12 px-8 text-base rounded-full shadow-lg shadow-teal-500/30 flex items-center gap-2 w-full sm:w-auto">
                   Testar 7 dias grátis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="h-12 px-8 text-base rounded-full bg-white flex items-center gap-2 w-full sm:w-auto hover:bg-slate-50 transition-colors">
                  <PlayCircle className="w-5 h-5 text-slate-500" /> Ver Demonstração
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400 font-medium tracking-wide">Não requer cartão de crédito • Acesso imediato</p>
          </motion.div>
        </div>
      </section>

      {/* Product Highlight / Mockup */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl border border-slate-200/80 bg-white/50 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="bg-slate-50 overflow-hidden">
              <div className="flex">
                {/* Sidebar */}
                <div className="w-48 xl:w-64 border-r border-slate-200 bg-white p-4 hidden md:block border-b border-white">
                  <div className="flex items-center gap-2 mb-8 mt-2 px-2">
                     <div className="w-6 h-6 rounded-md bg-gradient-to-br from-teal-500 to-blue-500 shadow-sm" />
                     <div className="h-4 w-24 bg-slate-200 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-9 w-full bg-slate-50 border border-slate-100 rounded-lg flex items-center px-3 gap-3">
                       <div className="w-4 h-4 bg-teal-500/40 rounded" />
                       <div className="h-2 w-16 bg-teal-500/40 rounded" />
                    </div>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="h-9 w-full flex items-center px-3 gap-3 hover:bg-slate-50 rounded-lg transition-colors">
                         <div className="w-4 h-4 bg-slate-200 rounded" />
                         <div className="h-2 w-24 bg-slate-200 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 sm:p-8 border-b border-slate-50">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <div className="h-6 w-48 bg-slate-800 rounded mb-3 opacity-90" />
                      <div className="h-3 w-64 bg-slate-300 rounded" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg">
                        <div className="w-3 h-3 bg-teal-400 rounded-full" />
                        <div className="h-2 w-16 bg-slate-200 rounded" />
                      </div>
                      <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-tr from-rose-200 to-teal-100" />
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
                         <div className="flex items-start justify-between mb-4">
                           <div className="h-3 w-20 bg-slate-200 rounded" />
                           <div className={`p-1.5 rounded-md ${i === 1 ? 'bg-teal-100' : i === 2 ? 'bg-blue-100' : i === 3 ? 'bg-amber-100' : 'bg-rose-100'}`}>
                             <div className={`w-3 h-3 ${i === 1 ? 'bg-teal-500' : i === 2 ? 'bg-blue-500' : i === 3 ? 'bg-amber-500' : 'bg-rose-500'} rounded-sm`} />
                           </div>
                         </div>
                         <div className="flex items-end gap-2">
                           <div className="h-8 w-16 bg-slate-700/90 rounded" />
                           <div className="h-3 w-10 bg-emerald-100 rounded mb-1" />
                         </div>
                      </div>
                    ))}
                  </div>

                  {/* Body grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart Area */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden col-span-2">
                      <div className="flex justify-between items-center mb-8">
                        <div className="h-4 w-32 bg-slate-800/80 rounded" />
                        <div className="h-6 w-24 bg-slate-100 rounded-full" />
                      </div>
                      
                      {/* Simulated bar chart */}
                      <div className="flex items-end justify-between gap-2 h-40">
                        {[30, 45, 20, 60, 80, 50, 70, 90, 40, 65, 85, 30].map((height, idx) => (
                          <div key={idx} className="w-full bg-slate-50 flex flex-col justify-end group">
                             <div className={`w-full rounded-t transition-all duration-300 group-hover:opacity-80 ${idx % 3 === 0 ? 'bg-blue-400' : 'bg-teal-400'}`} style={{ height: `${height}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pending Approvals */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
                      <div className="h-4 w-40 bg-slate-800/80 rounded mb-8" />
                      <div className="flex-1 space-y-4">
                        {[1,2,3].map(i => (
                          <div key={i} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                            <div className="flex justify-between mb-2">
                              <div className="h-3 w-24 bg-slate-200 rounded" />
                              <div className="h-3 w-12 bg-amber-100 rounded-full" />
                            </div>
                            <div className="h-3 w-40 bg-slate-600 rounded mb-2" />
                            <div className="h-2 w-32 bg-slate-300 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">O que você ganha com o SocialOS?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Feito exatamente para quem está se sentindo sobrecarregado. Recupere horas do seu dia com nosso fluxo simplificado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<LayoutDashboard className="w-6 h-6 text-amber-500" />}
              title="Gestão Multi-Cliente"
              description="Diga adeus à confusão. Alterne entre as contas dos seus clientes com um clique. Mantenha os ativos de cada marca totalmente organizados e separados."
              bg="bg-amber-50"
            />
            <FeatureCard 
              icon={<PieChart className="w-6 h-6 text-rose-500" />}
              title="Relatórios Exportáveis"
              description="Mostre o valor do seu trabalho! Acompanhe o crescimento de cada perfil e exporte relatórios consolidados para enviar aos clientes."
              bg="bg-rose-50"
            />
            <FeatureCard 
              icon={<CalendarDays className="w-6 h-6 text-teal-500" />}
              title="Agendamento Visual"
              description="Arraste e solte posts em um calendário intuitivo. Esqueça alarmes do celular e deixe nosso sistema publicar nos melhores horários."
              bg="bg-teal-50"
            />
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-fuchsia-500" />}
              title="Auditoria de Perfil IA"
              description="Deixe a nossa IA analisar as métricas e o perfil do seu cliente para fornecer planos de ação reais baseados em dados, não em achismo."
              bg="bg-fuchsia-50"
            />
            <FeatureCard 
              icon={<Bot className="w-6 h-6 text-sky-500" />}
              title="Assistente IA Dedicado"
              description="Ficou sem criatividade? Nosso Chatbot flutuante trabalha com você o tempo todo, sugerindo copys, roteiros e CTAs matadores."
              bg="bg-sky-50"
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-blue-500" />}
              title="Aprovação Simplificada"
              description="Chega de enviar imagens pelo WhatsApp. Envie um 'Link Mágico' para clientes aprovarem e comentarem nos posts na hora."
              bg="bg-blue-50"
            />
            <FeatureCard 
              icon={<Database className="w-6 h-6 text-violet-500" />}
              title="Biblioteca de Prompts"
              description="Tenha em mãos dezenas de prompts validados para copiar, colar e usar no ChatGPT, Claude ou Gemini sem precisar testar do zero."
              bg="bg-violet-50"
            />
            <FeatureCard 
              icon={<Megaphone className="w-6 h-6 text-fuchsia-500" />}
              title="Criador de Campanhas Ads"
              description="Escreva prompts para campanhas do Meta, Google, TikTok e LinkedIn Ads estruturadas com IA, sugerindo objetivos e textos milionários."
              bg="bg-fuchsia-50"
            />
            <FeatureCard 
              icon={<Images className="w-6 h-6 text-amber-500" />}
              title="Gerador de Carrosséis IA"
              description="Transforme qualquer texto, matéria ou URL em um roteiro matador para carrosséis do Instagram, já separados slide por slide com sugestão visual."
              bg="bg-amber-50"
            />
            <FeatureCard 
              icon={<Calculator className="w-6 h-6 text-slate-500" />}
              title="10 Calculadoras para Agências"
              description="Acesse calculadoras automáticas de ROI, ROAS, CPC, CPA, LTV, CAC, Margem de Lucro da agência e preço de Hora/Projeto de forma fácil."
              bg="bg-slate-100"
            />
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-emerald-500" />}
              title="Gerador de Contratos"
              description="Crie e exporte contratos de 'Social Media' formais em segundos para novos clientes, protegendo seu negócio de calotes."
              bg="bg-emerald-50"
            />
            <FeatureCard 
              icon={<Sparkles className="w-6 h-6 text-indigo-500" />}
              title="Geração de Posts e Legendas"
              description="Crie ideias para carrosséis, reels e legendas focadas em vendas com apenas um clique usando a API nativa do Gemini."
              bg="bg-indigo-50"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Planos transparentes e escaláveis</h2>
            <p className="text-slate-500 max-w-xl mx-auto mb-8">Todos os planos incluem 7 dias de teste grátis. Cancele quando quiser.</p>
            
            <div className="inline-flex items-center p-1 bg-slate-200/50 rounded-full border border-slate-200">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!isAnnual ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Mensal
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isAnnual ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Anual <span className="bg-teal-100 text-teal-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Economize 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto items-center">
            {/* Free Plan */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Iniciante</h3>
              <p className="text-slate-500 text-sm mb-6">Para quem está dando os primeiros passos.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">Grátis</span>
                <span className="text-slate-500 font-medium">/para sempre</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature text="1 Cliente / Marca" />
                <PricingFeature text="10 Agendamentos/mês" />
                <PricingFeature text="Aprovação Básica" />
                <PricingFeature text="10 gerações de IA no mês" />
              </ul>
              <Link href="/cadastro?plan=free">
                <Button variant="outline" className="w-full h-12 rounded-xl border-slate-300">Começar Grátis</Button>
              </Link>
            </div>

            {/* Basic Plan */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Freelancer</h3>
              <p className="text-slate-500 text-sm mb-6">Ideal para social medias independentes.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">R$ {isAnnual ? '47' : '59'}</span>
                <span className="text-slate-500 font-medium">/mês</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature text="Até 3 Clientes" />
                <PricingFeature text="Agendamento ilimitado" />
                <PricingFeature text="Módulo de Aprovação" />
                <PricingFeature text="100 gerações de IA/mês" />
              </ul>
              <Link href="/cadastro?plan=freelancer">
                <Button variant="outline" className="w-full h-12 rounded-xl border-slate-300">Testar por 7 dias</Button>
              </Link>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="rounded-3xl border-2 border-teal-500 bg-white p-8 shadow-2xl relative transform lg:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                Mais Popular
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Agência Pro</h3>
              <p className="text-slate-500 text-sm mb-6">Para agências crescendo e faturando.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">R$ {isAnnual ? '97' : '127'}</span>
                <span className="text-slate-500 font-medium">/mês</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature text="Até 10 Clientes" />
                <PricingFeature text="Múltiplos usuários" />
                <PricingFeature text="Limites de IA Ilimitados" />
                <PricingFeature text="Relatórios PDF" />
              </ul>
              <Link href="/cadastro?plan=pro">
                <Button variant="primary" className="w-full h-12 rounded-xl shadow-teal-500/30">Testar por 7 dias</Button>
              </Link>
            </div>

            {/* Scale Plan */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Scale</h3>
              <p className="text-slate-500 text-sm mb-6">Volume massivo e operação robusta.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">R$ {isAnnual ? '297' : '367'}</span>
                <span className="text-slate-500 font-medium">/mês</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature text="Clientes Ilimitados" />
                <PricingFeature text="White label" />
                <PricingFeature text="Suporte Prioritário 24/7" />
                <PricingFeature text="API de Integração" />
              </ul>
              <Link href="/cadastro?plan=scale">
                <Button variant="outline" className="w-full h-12 rounded-xl border-slate-300">Falar com Consultor</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Quem usa o SocialOS?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Agências e freelancers que pararam de enlouquecer com grupos de WhatsApp.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              text="Antes eu demorava 2 dias só para aprovar o calendário mensal de 4 clientes. Agora mando o Link Mágico do SocialOS e em duas horas recebo ok com os comentários certos."
              name="Letícia Martins"
              role="Freelancer Social Media"
              img="https://i.pravatar.cc/150?img=1"
            />
            <TestimonialCard 
              text="Perdemos muito menos tempo com retrabalho. O cliente comenta direto no post e o social media já altera. Fez nossa margem de lucro por cliente dobrar."
              name="Carlos Alberto"
              role="Dono de Agência, VoeDigital"
              img="https://i.pravatar.cc/150?img=11"
            />
            <TestimonialCard 
              text="Usava 3 ferramentas: uma pra IA, uma pra agendar e outra pra cobrar clientes. Focar tudo em um só dashboard tirou um peso absurdo das minhas costas."
              name="Marina R."
              role="Estrategista de Marca"
              img="https://i.pravatar.cc/150?img=5"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50 px-6 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-4">
            <FaqItem question="O cliente precisa criar conta para aprovar?" answer="Não! Você envia um Link Mágico que abre direto no navegador do celular ou PC dele. Ele clica, comenta e aprova em segundos." />
            <FaqItem question="Posso usar pelo celular?" answer="As aprovações e o dashboard de clientes são otimizados para mobile. O agendamento complexo recomendamos fazer pelo computador para melhor visibilidade." />
            <FaqItem question="A IA gera legendas em português?" answer="Sim. Nossa IA entende os contextos do mercado brasileiro, gírias e tom de voz (Descontraído, Profissional, etc)." />
            <FaqItem question="Como funciona o teste de 7 dias?" answer="Você pode testar o Agência Pro completo por 7 dias. Ao final, você decide se quer assinar ou não." />
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 px-6 relative overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-teal-900/40 to-blue-900/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Pronto para organizar seu negócio?</h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
            Pare de perder controle dos clientes e dedique-se ao que realmente importa: resultados.
          </p>
          <Link href="/cadastro">
            <Button variant="primary" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-teal-500/50">
              Começar Teste Gratuito
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-teal-500 flex items-center justify-center font-bold text-white text-xs">
              S
            </div>
            <span className="text-lg font-bold tracking-tight text-white">SocialOS</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/termos" className="hover:text-white transition-colors">Termos</Link>
            <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="/contato" className="hover:text-white transition-colors">Contato</Link>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} SocialOS Inc. Todos os direitos reservados.
          </p>
        </div>
      </footer>
      
      {/* Global Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}

function FeatureCard({ icon, title, description, bg }: { icon: React.ReactNode, title: string, description: string, bg: string }) {
  return (
    <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
      <span className="text-slate-600 text-sm font-medium">{text}</span>
    </li>
  );
}

function TestimonialCard({ text, name, role, img }: { text: string, name: string, role: string, img: string }) {
  return (
    <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 flex flex-col h-full">
      <div className="flex-1">
        <p className="text-slate-700 italic mb-6">"{text}"</p>
      </div>
      <div className="flex items-center gap-4">
        <img src={img} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{name}</h4>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-200">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none hover:bg-slate-50/50"
      >
        <span className="font-semibold text-slate-800">{question}</span>
        <span className="text-slate-400 font-medium text-xl leading-none">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}
