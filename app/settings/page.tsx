'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Settings, CheckCircle2, Instagram, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function SettingsPage() {
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
