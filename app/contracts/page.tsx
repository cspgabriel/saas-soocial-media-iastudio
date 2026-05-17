'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import Markdown from 'react-markdown';

export default function ContractsPage() {
  const [formData, setFormData] = useState({
    contratante: '',
    cnpj: '',
    valor: '',
    posts: '12',
    stories: '20'
  });
  
  const [contractGenerated, setContractGenerated] = useState('');

  const generateContract = (e: React.FormEvent) => {
    e.preventDefault();
    const markdown = `# CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE SOCIAL MEDIA

**CONTRATANTE:** ${formData.contratante || '[NOME DO CLIENTE]'}, inscrita no CNPJ sob o nº ${formData.cnpj || '[CNPJ]'}, doravante denominada simplesmente CONTRATANTE.

**CONTRATADA:** SocialOS Agência Digital, inscrita no CNPJ sob o nº 00.000.000/0001-00, doravante denominada simplesmente CONTRATADA.

As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de Prestação de Serviços de Gerenciamento de Redes Sociais.

## 1. DO OBJETO DO CONTRATO
1.1 O presente contrato tem como objeto a prestação de serviços de gerenciamento de redes sociais (Instagram e Facebook) da CONTRATANTE pela CONTRATADA.

## 2. DOS SERVIÇOS PRESTADOS
2.1 A CONTRATADA compromete-se a entregar mensalmente:
- Planejamento e criação de ${formData.posts} postagens para o feed;
- Planejamento e criação de ${formData.stories} sequências de stories.
- Relatório mensal de desempenho.

## 3. DOS VALORES E FORMA DE PAGAMENTO
3.1 Pela prestação dos serviços, a CONTRATANTE pagará à CONTRATADA o valor mensal de R$ ${formData.valor || '0,00'}, com vencimento para o dia 05 de cada mês.

## 4. DA RESCISÃO
4.1 O presente contrato pode ser rescindido por qualquer uma das partes, mediante aviso prévio de 30 (trinta) dias.

Local e Data: ________________________, ___ de _________ de 2024.

_____________________________________________________
**${formData.contratante || 'CONTRATANTE'}**

_____________________________________________________
**SocialOS Agência Digital (CONTRATADA)**
`;
    setContractGenerated(markdown);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractGenerated);
    alert('Contrato copiado para a área de transferência!');
  };

  return (
    <Layout>
      <div className="mb-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <FileText className="w-6 h-6 text-emerald-500" />
          Gerador de Contratos
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Crie contratos jurídicos básicos para seus serviços de social media em segundos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-5 border-slate-200 shadow-sm bg-white h-max">
          <CardHeader>
            <CardTitle className="text-lg">Dados do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={generateContract} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome/Razão Social do Cliente</label>
                <input 
                  type="text" 
                  value={formData.contratante}
                  onChange={e => setFormData({...formData, contratante: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  placeholder="Ex: Cafeteria Blend LTDA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ do Cliente</label>
                <input 
                  type="text" 
                  value={formData.cnpj}
                  onChange={e => setFormData({...formData, cnpj: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Posts no Feed/mês</label>
                  <input 
                    type="number" 
                    value={formData.posts}
                    onChange={e => setFormData({...formData, posts: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stories/mês</label>
                  <input 
                    type="number" 
                    value={formData.stories}
                    onChange={e => setFormData({...formData, stories: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Valor Mensal (R$)</label>
                <input 
                  type="text" 
                  value={formData.valor}
                  onChange={e => setFormData({...formData, valor: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  placeholder="Ex: 1.500,00"
                />
              </div>
              
              <Button type="submit" variant="primary" className="w-full mt-2">
                Gerar Contrato
              </Button>
            </form>
          </CardContent>
        </Card>

        {contractGenerated ? (
          <Card className="lg:col-span-7 border-slate-200 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Documento Gerado</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" className="h-8 text-xs" onClick={copyToClipboard}>Copiar Texto</Button>
                <Button variant="outline" className="h-8 text-xs"><Download className="w-3 h-3 mr-1"/> PDF</Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-sm prose-slate max-w-none">
                <Markdown>{contractGenerated}</Markdown>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="lg:col-span-7 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center p-12 bg-slate-50/50">
             <div className="text-center">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <FileText className="w-8 h-8 text-slate-300" />
               </div>
               <p className="text-slate-500 font-medium">Preencha os dados ao lado para gerar seu contrato.</p>
             </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
