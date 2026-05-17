'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { Sparkles, Copy, CheckCircle2, Bot, Gem } from 'lucide-react';

const promptLibrary = [
  {
    title: 'Gerador de Linha Editorial',
    category: 'Estratégia',
    prompt: 'Aja como um estrategista de conteúdo sênior. Crie 4 linhas editoriais para um perfil no Instagram do nicho de [INSERIR NICHO], cujo público-alvo é [INSERIR PÚBLICO]. Para cada linha editorial, dê o nome, o objetivo, 2 exemplos de formatos de post e a emoção que queremos despertar.'
  },
  {
    title: 'Legenda para Conversão (AIDA)',
    category: 'Copywriting',
    prompt: 'Escreva uma legenda de Instagram usando o framework AIDA (Atenção, Interesse, Desejo, Ação) para promover o produto [INSERIR PRODUTO/SERVIÇO]. O tom de voz deve ser persuasivo, acessível e focado nos benefícios que o cliente terá. Inclua emojis de forma equilibrada.'
  },
  {
    title: 'Respostas a Objeções (Stories)',
    category: 'Vendas',
    prompt: 'Baseado no produto [PRODUTO], liste as 5 principais objeções que impedem as pessoas de comprar. Em seguida, escreva um roteiro curto (3-4 slides de Stories) para cada objeção, quebrando-a com lógica e prova social.'
  },
  {
    title: 'Ideias de Reels Virais',
    category: 'Crescimento',
    prompt: 'Me dê 5 ideias de Reels focados em alto alcance para um profissional de [PROFISSÃO]. O objetivo é atrair novos seguidores. Para cada ideia, sugira um áudio (ex: música em alta, narração), descreva a cena visual e o texto que deve aparecer na tela (Hook).'
  }
];

export default function PromptsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const openAI = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Layout>
      <div className="mb-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-500" />
          Biblioteca de Prompts Validados
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Acelere sua criação de conteúdo copiando nossos prompts testados e utilizando nas melhores IAs do mercado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        {promptLibrary.map((prompt, index) => (
          <Card key={index} className="flex flex-col border-slate-200 shadow-sm bg-white hover:border-slate-300 transition-colors">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase mb-2 block w-max">{prompt.category}</span>
                <CardTitle className="text-lg">{prompt.title}</CardTitle>
              </div>
              <Button 
                variant="outline" 
                className="h-8 w-8 p-0 shrink-0 rounded-full"
                onClick={() => copyToClipboard(prompt.prompt, index)}
              >
                {copiedIndex === index ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </Button>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 flex-1">
                <p className="text-sm text-slate-600 font-mono leading-relaxed">{prompt.prompt}</p>
              </div>
              
              <div className="mt-auto">
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">Usar este prompt em:</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="h-8 text-xs bg-white hover:bg-slate-50" onClick={() => openAI('https://chatgpt.com')}>
                    <Bot className="w-4 h-4 mr-2" />
                    ChatGPT
                  </Button>
                  <Button variant="outline" className="h-8 text-xs bg-white hover:bg-slate-50" onClick={() => openAI('https://gemini.google.com')}>
                    <Gem className="w-4 h-4 mr-2" />
                    Gemini
                  </Button>
                  <Button variant="outline" className="h-8 text-xs bg-white hover:bg-slate-50" onClick={() => openAI('https://claude.ai')}>
                    Claude
                  </Button>
                  <Button variant="outline" className="h-8 text-xs bg-white hover:bg-slate-50" onClick={() => openAI('https://manus.im')}>
                    Manus
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
