'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { getAiRequestHeaders } from '@/lib/clientSettings';

export default function AIPage() {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('profissional');
  const [platform, setPlatform] = useState('instagram');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const generateContent = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: getAiRequestHeaders(),
        body: JSON.stringify({ prompt, tone, platform }),
      });
      const data = await response.json();
      setResult(data.text || data.error || 'Erro ao gerar.');
    } catch (e) {
      console.error(e);
      setResult("Ocorreu um erro ao gerar. Verifique se a chave de API está configurada.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight gap-2 flex items-center">
            AI Content Genius <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium tracking-wider border border-slate-200 ml-2">BETA</span>
          </h1>
          <p className="text-slate-500 mt-0.5 text-sm">Gere postagens e legendas otimizadas com IA.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200/60 shadow-sm flex flex-col bg-white">
          <CardHeader>
            <CardTitle>Nova Publicação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Sobre o que é a postagem?</label>
              <textarea 
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Ex: Lançamento do novo perfume floral, focando em elegância e frescor..."
                className="w-full flex-1 min-h-[140px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 resize-none text-slate-800 placeholder:text-slate-400 transition-all font-mono"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Tom de voz</label>
                <select 
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="descontraído">Descontraído & Divertido</option>
                  <option value="profissional">Profissional & Corporativo</option>
                  <option value="persuasivo">Persuasivo (Vendas)</option>
                  <option value="educativo">Educativo</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Rede Social</label>
                <select 
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">X / Twitter</option>
                  <option value="tiktok">TikTok/Reels</option>
                </select>
              </div>
            </div>

            <button 
              className="w-full accent-gradient py-3.5 rounded-xl font-bold text-white text-sm shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              onClick={generateContent} 
              disabled={loading || !prompt}
            >
              {loading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Gerando...</>
              ) : (
                <>Gerar Conteúdo ✨</>
              )}
            </button>
          </CardContent>
        </Card>

        <div className="h-full">
          {result ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full">
              <Card className="h-full flex flex-col border-teal-200 bg-teal-50/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between border-teal-200 bg-white/50">
                  <CardTitle>Resultado</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="p-2 h-auto text-slate-500 hover:text-slate-800" onClick={generateContent}>
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="p-2 h-auto text-slate-500 hover:text-slate-800" onClick={copyToClipboard}>
                      {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto max-h-[450px] scrollbar-thin scrollbar-thumb-teal-200">
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap font-sans text-slate-800">
                    {result}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="h-full border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 min-h-[450px]">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 accent-gradient shadow-lg shadow-teal-500/20 opacity-80">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">Pronto para a magia</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                Descreva sua ideia e a inteligência artificial criará uma legenda perfeita, com hashtags e otimização para a rede social.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
