'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui';
import { Activity, Search, Sparkles, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { getAiRequestHeaders } from '@/lib/clientSettings';

export default function AnalysisPage() {
  const [username, setUsername] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    let cleanUsername = username.trim();
    if (cleanUsername.startsWith('@')) {
      cleanUsername = cleanUsername.substring(1);
    }

    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const response = await fetch('/api/analyze-instagram', {
        method: 'POST',
        headers: getAiRequestHeaders(),
        body: JSON.stringify({ username: cleanUsername }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao analisar perfil.');
      }

      setAnalysis(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 ml-64 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Activity className="w-8 h-8 text-teal-500" /> Auditoria de Perfil IA
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Insira um <span className="font-semibold">@usuario</span> do Instagram e nossa IA analisará a estratégia da conta buscando dados na web.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <form onSubmit={handleAnalyze} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username do Instagram</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-medium select-none pointer-events-none">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace('@', ''))}
                  placeholder="marcos.socialmedia"
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !username}
              className="py-3 px-8 h-auto rounded-xl flex items-center justify-center gap-2 min-w-[200px]"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analisando na Web...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Gerar Auditoria</span>
                </>
              )}
            </Button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-rose-50 text-rose-700 rounded-xl flex items-center gap-2 border border-rose-100">
               <AlertCircle className="w-5 h-5" />
               <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {analysis && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
               <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                 <Search className="w-5 h-5 text-teal-600" />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-slate-800">Resultado da Auditoria</h2>
                  <p className="text-sm text-slate-500">Desenvolvido com Gemini 2.x e Busca Google</p>
               </div>
             </div>
             
             <div className="prose prose-slate prose-teal max-w-none 
                prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl
                prose-p:text-slate-600 prose-li:text-slate-600
                prose-strong:text-slate-800 prose-a:text-teal-600">
               <Markdown>{analysis}</Markdown>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
