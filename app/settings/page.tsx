'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Settings, CheckCircle2, Instagram, Link as LinkIcon, RefreshCw, KeyRound, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function SettingsPage() {
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [plan, setPlan] = useState(() => {
    if (typeof window === 'undefined') return 'free';
    return localStorage.getItem('socialos_plan') || 'free';
  });
  const [geminiKey, setGeminiKey] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('socialos_gemini_key') || '';
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setIsInstagramConnected(true);
        console.log('Got Auth Code:', event.data.code);
      } else if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        setErrorMsg(event.data.error || 'Erro na conexão.');
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnectInstagram = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/auth/instagram/url');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get auth URL');
      }

      const authWindow = window.open(
        data.url,
        'oauth_popup',
        'width=600,height=700'
      );

      if (!authWindow) {
        alert('Por favor, permita popups para este site para conectar sua conta.');
      }
    } catch (error: any) {
      console.error('OAuth error:', error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAiSettings = () => {
    localStorage.setItem('socialos_plan', plan);
    localStorage.setItem('socialos_gemini_key', geminiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight gap-2 flex items-center">
          <Settings className="w-6 h-6 text-teal-600" />
          Configurações & Integrações
        </h1>
        <p className="text-slate-500 mt-0.5 text-sm">Gerencie integrações com redes sociais e ajustes de conta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200/60 shadow-sm bg-white">
          <CardHeader className="border-b border-slate-200/60 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-teal-600" />
              IA e Limites
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="rounded-xl border border-teal-100 bg-teal-50 p-4 text-sm text-teal-900">
              <div className="flex items-center gap-2 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" /> Modelo freemium pronto
              </div>
              <p>No plano grátis, cada cliente usa a própria chave Gemini. Nos planos pagos, o servidor usa a chave gerenciada e aplica limites por plano.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Plano atual</label>
              <select
                value={plan}
                onChange={(event) => setPlan(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
              >
                <option value="free">Free BYOK - 30 gerações/dia</option>
                <option value="pro">Pro gerenciado - 300 gerações/dia</option>
                <option value="scale">Scale gerenciado - 1200 gerações/dia</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Chave Gemini do cliente</label>
              <input
                type="password"
                value={geminiKey}
                onChange={(event) => setGeminiKey(event.target.value)}
                placeholder="Cole sua chave Gemini aqui para usar no plano grátis"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
              />
              <p className="mt-2 text-xs text-slate-500">A chave fica salva apenas neste navegador via localStorage.</p>
            </div>

            <Button onClick={handleSaveAiSettings} className="w-full">
              {saved ? <CheckCircle2 className="w-4 h-4 mr-2" /> : null}
              {saved ? 'Configuração salva' : 'Salvar IA'}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm bg-white">
          <CardHeader className="border-b border-slate-200/60 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-slate-500" />
              Conexões de Redes Sociais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                <strong>Erro:</strong> {errorMsg}
                <p className="mt-1 text-xs">Configure INSTAGRAM_CLIENT_ID e INSTAGRAM_CLIENT_SECRET nas variáveis de ambiente.</p>
              </div>
            )}
            
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-200">
                  <Instagram className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Instagram</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Agendamento direto e métricas.</p>
                </div>
              </div>
              
              {isInstagramConnected ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> Conectado
                </div>
              ) : (
                <Button 
                  disabled={loading} 
                  onClick={handleConnectInstagram}
                  className="bg-slate-800 text-white hover:bg-slate-900 border-transparent shadow-md"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : 'Conectar Conta'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
