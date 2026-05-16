'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Key, Bot } from 'lucide-react';
import { Button } from './ui';
import Markdown from 'react-markdown';

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Olá! Sou seu assistente de IA do SocialOS. Posso ajudar com ideias, copy, ou analisar dados da sua conta. Como posso ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const saveKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    setIsConfiguring(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, apiKey })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Ocorreu um erro ao processar sua mensagem. Verifique sua chave API.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Assistente SocialOS</h3>
                <p className="text-[10px] text-teal-300">Equipado com Gemini</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsConfiguring(!isConfiguring)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <Key className="w-4 h-4 text-slate-300" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <X className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Config Area */}
          {isConfiguring ? (
            <div className="p-6 flex-1 bg-slate-50 flex flex-col justify-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4 mx-auto">
                <Key className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-center mb-2">Configurar Chave API</h4>
              <p className="text-xs text-slate-500 text-center mb-6">Insira sua chave do Google Gemini para habilitar o assistente. Sua chave fica salva apenas no seu navegador.</p>
              
              <input 
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg mb-4 text-sm"
              />
              <Button onClick={saveKey} variant="primary" className="w-full">Salvar e Continuar</Button>
            </div>
          ) : (
            <>
              {/* Messages Info Area */}
              {!apiKey && (
                <div className="bg-rose-50 p-3 text-xs text-rose-600 border-b border-rose-100 flex items-center gap-2">
                   <Key className="w-4 h-4" /> Configures sua chave API clicando no ícone no topo para usar o chat.
                </div>
              )}
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-teal-600 text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-sm prose-slate max-w-none">
                          <Markdown>{msg.content}</Markdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form 
                  onSubmit={e => { e.preventDefault(); sendMessage(); }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Faça uma pergunta ao assistente..."
                    disabled={!apiKey || isLoading}
                    className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  />
                  <button 
                    disabled={!input.trim() || !apiKey || isLoading}
                    className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 border-2 border-slate-800 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform relative group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
        {!isOpen && (
           <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white" />
        )}
      </button>
    </div>
  );
}
