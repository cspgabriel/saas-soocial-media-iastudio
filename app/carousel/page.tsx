'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Images, Loader2, FileText, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import Markdown from 'react-markdown';

export default function CarouselPage() {
  const [inputType, setInputType] = useState<'text' | 'url' | 'file'>('text');
  const [sourceText, setSourceText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');
    
    // Na vida real leríamos o PDF/PNG ou extraiamos texto da URL.
    // Aqui usamos o que for passado via texto para o mock.
    let contentToSend = sourceText;
    if (inputType === 'url') {
      contentToSend = `[Conteúdo extraído da URL: ${sourceText} (MOCK)] Por favor, gere um carrossel genérico focado no tema da URL.`;
    }

    try {
      const response = await fetch('/api/generate-carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceText: contentToSend })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(data.text);
    } catch (err) {
      alert('Erro ao gerar carrossel. Verifique sua chave da API Gemini no Chatbot.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Images className="w-6 h-6 text-amber-500" />
          Gerador de Carrossel
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Transforme matérias completas, URLs ou ideias em roteiros passo-a-passo para posts carrossel.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="border-slate-200 shadow-sm bg-white h-max">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-lg">Fonte do Conteúdo</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                <button 
                  type="button"
                  onClick={() => setInputType('text')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${inputType === 'text' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <FileText className="w-4 h-4"/> Texto
                </button>
                <button 
                  type="button"
                  onClick={() => setInputType('url')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${inputType === 'url' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <LinkIcon className="w-4 h-4"/> URL
                </button>
                <button 
                  type="button"
                  onClick={() => setInputType('file')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${inputType === 'file' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <ImageIcon className="w-4 h-4"/> PDF/IMG
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {inputType === 'text' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Cole o texto, conteúdo ou ideia</label>
                    <textarea 
                      required
                      value={sourceText}
                      onChange={e => setSourceText(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 min-h-[200px]"
                      placeholder="Ex: Como criar conteúdo que converte... Cole seu texto inteiro aqui."
                    />
                  </div>
                )}

                {inputType === 'url' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">URL da Notícia ou Blog Post</label>
                    <input 
                      required
                      type="url"
                      value={sourceText}
                      onChange={e => setSourceText(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      placeholder="https://exemplo.com/materia"
                    />
                  </div>
                )}

                {inputType === 'file' && (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50">
                    <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm text-slate-600 font-medium mb-1">Upload Indisponível</p>
                    <p className="text-xs text-slate-400">Arraste um PDF ou PNG aqui (Simulação). Para este preview, use a aba Texto.</p>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  disabled={isLoading || (inputType === 'file')} 
                  className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold tracking-wide shadow-md shadow-amber-500/20"
                >
                  {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando Slides...</> : `Criar Roteiro do Carrossel`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {result ? (
          <Card className="lg:col-span-7 border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Roteiro Gerado</CardTitle>
              <Button variant="outline" className="h-8 text-xs bg-white text-slate-600 hover:text-slate-900" onClick={() => navigator.clipboard.writeText(result)}>Copiar Tudo</Button>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto max-h-[800px]">
              <div className="prose prose-sm prose-slate max-w-none prose-headings:text-amber-700 prose-strong:text-slate-800">
                <Markdown>{result}</Markdown>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="lg:col-span-7 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-12 bg-slate-50/50 min-h-[400px]">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Images className="w-10 h-10 text-amber-300" />
             </div>
             <h3 className="text-lg font-bold text-slate-700 mb-2">Pronto para a Mágica</h3>
             <p className="text-slate-500 text-center max-w-md text-sm leading-relaxed">
               Insira seu texto base e a Inteligência Artificial fará o trabalho duro: quebrando a leitura em slides curtos, sugerindo o fundo (visual) e estruturando o Call to Action de forma estratégica.
             </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
