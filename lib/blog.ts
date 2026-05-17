export type BlogSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keyword: string;
  intent: "Aprendizado" | "Comparacao" | "Compra" | "Operacao";
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  hero: string;
  takeaways: string[];
  sections: BlogSection[];
  checklist: string[];
  faq: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; url: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ia-para-social-media-guia-2026",
    title: "IA para social media em 2026: guia prático para atender mais clientes sem perder qualidade",
    description: "Veja como usar IA em briefing, calendário, copy, aprovação e relatório para transformar social media em uma operação mais vendável.",
    category: "IA para social media",
    keyword: "ia para social media",
    intent: "Aprendizado",
    publishedAt: "2026-05-17",
    updatedAt: "2026-05-17",
    readingTime: "8 min",
    hero: "IA não resolve operação ruim. Ela multiplica o que já existe. Para social media, o ganho real aparece quando a IA entra no fluxo certo: briefing, pauta, criação, aprovação e relatório.",
    takeaways: [
      "Use IA com contexto do cliente, não como prompt solto.",
      "Transforme briefing em ativo reutilizável para copy, calendário e relatório.",
      "Mantenha humano no julgamento: estratégia, aprovação e ajuste de tom.",
      "Venda a operação, não apenas posts gerados por IA.",
    ],
    sections: [
      {
        heading: "O erro: usar IA como bloco de notas caro",
        body: [
          "A maioria dos freelancers abre uma IA, pede 10 legendas e depois copia tudo para planilha, WhatsApp e Trello. Parece rápido no primeiro dia, mas vira retrabalho quando o cliente pede mudança, muda a oferta ou cobra status.",
          "O caminho mais profissional é alimentar a IA com contexto fixo: persona, oferta, objeções, tom de voz, formatos permitidos, campanhas do mês e histórico do que já foi aprovado.",
        ],
      },
      {
        heading: "O fluxo ideal de IA para social media",
        body: [
          "Comece pelo briefing. Depois gere ideias por objetivo: alcance, prova social, relacionamento, venda e retenção. Em seguida, transforme cada ideia em peça: legenda, roteiro de Reels, carrossel, stories e tarefa de aprovação.",
          "A IA precisa terminar o trabalho com uma próxima ação clara. Exemplo: publicar, revisar, pedir imagem ao cliente, aprovar copy ou inserir no relatório semanal.",
        ],
        bullets: [
          "Briefing do cliente salvo uma vez.",
          "Calendário editorial gerado por objetivo.",
          "Copy criada com tom e restrições do cliente.",
          "Aprovação registrada por status.",
          "Relatório gerado a partir do que aconteceu.",
        ],
      },
      {
        heading: "Como vender isso para o cliente",
        body: [
          "Não prometa 'posts com IA'. Isso já virou commodity. Prometa previsibilidade: menos cobrança, mais clareza do que está sendo feito e um processo que mostra valor antes do post ir ao ar.",
          "A frase certa é: 'Você vai enxergar o plano, aprovar sem confusão e receber um resumo claro do que foi entregue'.",
        ],
      },
    ],
    checklist: [
      "Criar briefing base para cada cliente.",
      "Separar calendário por objetivo de negócio.",
      "Definir status: ideia, criando, em aprovação, aprovado, publicado.",
      "Salvar prompts por nicho e etapa da operação.",
      "Gerar relatório semanal com entregas, pendências e próximos passos.",
    ],
    faq: [
      {
        question: "IA substitui o social media?",
        answer: "Não. IA acelera pesquisa, estrutura e rascunho. O social media continua responsável por estratégia, julgamento, contexto comercial e relacionamento com o cliente.",
      },
      {
        question: "Qual é o melhor uso de IA para agência pequena?",
        answer: "O melhor uso é reduzir troca de contexto: transformar briefing em calendário, calendário em copy e copy em relatório sem recomeçar do zero.",
      },
    ],
    sources: [
      { label: "HubSpot State of Marketing 2025", url: "https://www.hubspot.com/state-of-marketing" },
      { label: "HubSpot AI trends for marketers", url: "https://blog.hubspot.com/marketing/state-of-ai-report" },
    ],
  },
  {
    slug: "melhores-ferramentas-ia-marketing-agencias",
    title: "Melhores ferramentas de IA para marketing: stack enxuto para agências pequenas",
    description: "Compare categorias de ferramentas de IA para marketing e monte uma pilha simples para conteúdo, social media, vendas, aprovação e relatórios.",
    category: "Ferramentas de IA",
    keyword: "ferramentas de ia para marketing",
    intent: "Comparacao",
    publishedAt: "2026-05-17",
    updatedAt: "2026-05-17",
    readingTime: "9 min",
    hero: "O melhor stack de IA para uma agência pequena não é o mais cheio. É o que reduz troca de abas, evita retrabalho e deixa o cliente entender o valor da operação.",
    takeaways: [
      "Escolha ferramentas por fluxo, não por hype.",
      "Priorize briefing, criação, aprovação, CRM e relatório.",
      "Evite pagar por cinco produtos que não conversam entre si.",
      "Comece com uma operação simples e escale depois.",
    ],
    sections: [
      {
        heading: "As cinco categorias que importam",
        body: [
          "Uma agência pequena precisa de menos ferramentas e mais continuidade. O stack mínimo cobre pesquisa, criação, calendário, aprovação e venda.",
          "Ferramentas isoladas parecem baratas, mas cobram em retrabalho: copiar dados, explicar contexto de novo, procurar aprovação e montar relatório manual.",
        ],
        bullets: [
          "IA de conteúdo para rascunho e variações.",
          "Calendário editorial para planejamento.",
          "Aprovação de cliente para reduzir ruído.",
          "CRM simples para acompanhar leads e propostas.",
          "Relatório operacional para provar entrega.",
        ],
      },
      {
        heading: "Como escolher sem cair no excesso",
        body: [
          "Pergunte: essa ferramenta diminui uma dor real ou só adiciona mais uma tela? Se ela não reduz cobrança, atraso, retrabalho ou perda de contexto, provavelmente não é prioridade.",
          "Para agência iniciante, a escolha certa é um sistema que una cliente, briefing, IA e calendário. Publicação automática pode vir depois.",
        ],
      },
      {
        heading: "Stack recomendado para começar",
        body: [
          "Use um CRM leve para oportunidades, SocialOS para operação de conteúdo, Canva para design, uma IA de texto com chave própria no início e uma ferramenta de reunião ou formulário para captar briefing.",
          "Depois que a base estiver rodando, adicione automações: webhook, Zapier, Make, integração com Meta e relatórios mais avançados.",
        ],
      },
    ],
    checklist: [
      "Mapear as etapas que hoje ficam em WhatsApp e planilha.",
      "Escolher uma fonte única para briefing de cliente.",
      "Definir onde a IA entra e onde o humano aprova.",
      "Cortar ferramenta que duplica função.",
      "Revisar stack a cada 90 dias.",
    ],
    faq: [
      {
        question: "Qual ferramenta de IA usar primeiro?",
        answer: "Comece por uma que entre na operação diária: briefing, calendário, copy e aprovação. Gerador de texto solto é útil, mas não resolve processo.",
      },
      {
        question: "Agência pequena precisa de automação complexa?",
        answer: "Não no começo. Precisa de processo claro. Automação entra depois para tarefas repetitivas que já foram validadas manualmente.",
      },
    ],
    sources: [
      { label: "WordStream AI marketing trends 2026", url: "https://www.wordstream.com/blog/2026-ai-marketing-trends" },
      { label: "Salesforce State of Sales", url: "https://www.salesforce.com/sales/state-of-sales/" },
    ],
  },
  {
    slug: "geo-seo-ia-chatgpt-perplexity-google-ai",
    title: "GEO e SEO para IA: como aparecer em ChatGPT, Perplexity e Google AI",
    description: "Entenda o que muda no SEO com respostas geradas por IA e como preparar conteúdos citáveis para mecanismos como ChatGPT, Perplexity e Google AI.",
    category: "SEO e GEO",
    keyword: "seo para ia",
    intent: "Aprendizado",
    publishedAt: "2026-05-17",
    updatedAt: "2026-05-17",
    readingTime: "10 min",
    hero: "SEO deixou de ser apenas disputar clique. Em buscas com IA, a marca precisa virar fonte citável: clara, estruturada, confiável e útil o suficiente para ser resumida por uma resposta automática.",
    takeaways: [
      "GEO é otimização para respostas geradas por IA.",
      "Conteúdo precisa responder perguntas de forma direta e citável.",
      "Topical authority vale mais que post isolado.",
      "Estrutura, fontes e atualização aumentam chance de citação.",
    ],
    sections: [
      {
        heading: "O que é GEO",
        body: [
          "GEO significa Generative Engine Optimization. É a prática de criar conteúdo que mecanismos de IA conseguem entender, resumir e citar.",
          "A diferença para SEO tradicional é o formato de consumo. O usuário pode receber a resposta no próprio ChatGPT, Perplexity ou Google AI, sem visitar vários links.",
        ],
      },
      {
        heading: "Como escrever para ser citado por IA",
        body: [
          "Use respostas curtas logo no início de cada seção. Depois aprofunde com exemplos, tabelas e passos. A IA tende a aproveitar trechos claros, específicos e bem estruturados.",
          "Evite textos genéricos. Conteúdo com experiência real, processo, data de atualização, fontes e exemplos tende a ser mais confiável.",
        ],
        bullets: [
          "Inclua pergunta no H2.",
          "Responda em 2 a 4 linhas no primeiro parágrafo.",
          "Adicione checklist ou tabela.",
          "Use links para fontes reconhecidas.",
          "Mantenha data de atualização visível.",
        ],
      },
      {
        heading: "Cluster recomendado para SocialOS",
        body: [
          "O cluster deve atacar dores de social media e agência pequena: IA para conteúdo, calendário editorial, aprovação de posts, relatórios, vendas consultivas e ferramentas de marketing.",
          "Cada post precisa linkar para uma ação prática dentro do produto: criar calendário, cadastrar cliente, gerar copy ou montar relatório.",
        ],
      },
    ],
    checklist: [
      "Criar página hub sobre IA para social media.",
      "Publicar posts long-tail com dúvidas reais.",
      "Usar Article, FAQ e Breadcrumb schema.",
      "Adicionar links internos para produto e posts relacionados.",
      "Atualizar posts quando ferramentas e APIs mudarem.",
    ],
    faq: [
      {
        question: "GEO substitui SEO?",
        answer: "Não. GEO complementa SEO. A base continua sendo conteúdo útil, rastreável, rápido, com autoridade e boa estrutura.",
      },
      {
        question: "Como medir resultado em busca por IA?",
        answer: "Monitore tráfego orgânico, menções de marca, consultas no Search Console, citações em ferramentas de IA e conversões vindas de conteúdos informativos.",
      },
    ],
    sources: [
      { label: "Google Search Central: AI features and Search", url: "https://developers.google.com/search/docs/fundamentals/ai-features" },
      { label: "HubSpot State of Marketing 2025", url: "https://www.hubspot.com/state-of-marketing" },
    ],
  },
  {
    slug: "calendario-editorial-com-ia",
    title: "Calendário editorial com IA: como planejar um mês de posts sem virar refém de planilha",
    description: "Aprenda um processo prático para criar calendário editorial com IA, objetivos de conteúdo, status de aprovação e relatório para cliente.",
    category: "Calendário editorial",
    keyword: "calendário editorial com ia",
    intent: "Operacao",
    publishedAt: "2026-05-17",
    updatedAt: "2026-05-17",
    readingTime: "7 min",
    hero: "Um calendário editorial bom não é uma lista de datas. É um plano de intenção: por que postar, para quem, com qual promessa e qual próxima ação.",
    takeaways: [
      "Planeje por objetivo, não por formato.",
      "Use IA para gerar variações, não para decidir estratégia sozinha.",
      "Separe status operacional de status criativo.",
      "Transforme o calendário em prova de valor para o cliente.",
    ],
    sections: [
      {
        heading: "Comece pelos objetivos do mês",
        body: [
          "Antes de pedir ideias para IA, defina o foco: atrair novos leads, educar, quebrar objeções, vender uma oferta, fortalecer autoridade ou reativar clientes antigos.",
          "Esse objetivo muda tudo: gancho, formato, CTA, frequência e tipo de prova usada.",
        ],
      },
      {
        heading: "Modelo simples de calendário",
        body: [
          "Use uma matriz de quatro colunas: objetivo, ideia, formato e status. Depois adicione campos de canal, data, responsável, referência visual e aprovação.",
          "A IA pode sugerir temas, mas o social media precisa ajustar a ordem para respeitar campanha, sazonalidade e maturidade do público.",
        ],
        bullets: [
          "Segunda: autoridade ou bastidor.",
          "Terça: dor e objeção.",
          "Quarta: prova social.",
          "Quinta: oferta ou chamada para conversa.",
          "Sexta: relacionamento, enquete ou conteúdo leve.",
        ],
      },
      {
        heading: "Como aprovar sem caos",
        body: [
          "Cada peça precisa ter um status claro. 'Em aprovação' não pode significar perdido no WhatsApp. O cliente precisa saber o que aprovar, até quando e qual impacto do atraso.",
          "Quando o status está visível, a cobrança muda de tom: sai do 'cadê o post?' e entra no 'isso está aguardando sua aprovação'.",
        ],
      },
    ],
    checklist: [
      "Definir objetivo principal do mês.",
      "Criar 4 a 6 pilares de conteúdo.",
      "Gerar ideias com contexto do cliente.",
      "Distribuir por canal e formato.",
      "Criar status de aprovação e revisão.",
      "Gerar resumo semanal para cliente.",
    ],
    faq: [
      {
        question: "Quantos posts por semana devo planejar?",
        answer: "Depende do canal e da capacidade de aprovar. Melhor publicar menos com consistência do que criar um calendário grande que o cliente não aprova.",
      },
      {
        question: "IA consegue criar calendário completo?",
        answer: "Consegue criar uma primeira versão. A versão final deve passar por estratégia, oferta, sazonalidade e restrições do cliente.",
      },
    ],
    sources: [
      { label: "HubSpot content marketing resources", url: "https://blog.hubspot.com/marketing" },
      { label: "Meta business marketing resources", url: "https://www.facebook.com/business/learn" },
    ],
  },
  {
    slug: "vendas-para-agencia-social-media",
    title: "Vendas para agência de social media: como transformar conteúdo em diagnóstico e proposta",
    description: "Veja um processo de vendas simples para agência de social media captar leads, diagnosticar dores e vender operação em vez de posts soltos.",
    category: "Vendas",
    keyword: "vendas para agência de social media",
    intent: "Compra",
    publishedAt: "2026-05-17",
    updatedAt: "2026-05-17",
    readingTime: "8 min",
    hero: "Agência que vende post compete por preço. Agência que vende clareza, diagnóstico e operação compete por confiança.",
    takeaways: [
      "Conteúdo inbound deve levar para diagnóstico, não só curtida.",
      "A proposta precisa mostrar processo antes de mostrar preço.",
      "Relatório e aprovação são argumentos de venda.",
      "O cliente compra redução de risco.",
    ],
    sections: [
      {
        heading: "O conteúdo certo abre a venda",
        body: [
          "Posts educativos atraem curiosos. Posts de diagnóstico atraem compradores. A diferença está na pergunta: em vez de 'como postar mais', fale sobre sintomas de operação ruim, perda de oportunidades e falta de clareza comercial.",
          "Cada artigo do blog deve terminar com uma próxima ação: criar calendário, avaliar perfil, montar briefing ou simular rotina de aprovação.",
        ],
      },
      {
        heading: "Roteiro de diagnóstico",
        body: [
          "A primeira conversa precisa revelar operação, não só preferência estética. Pergunte sobre oferta, público, ticket, canais, frequência, aprovações, histórico de campanha e como o cliente mede resultado.",
          "Depois mostre o custo do improviso: atraso, refação, falta de consistência, perda de oportunidade e dificuldade de provar valor.",
        ],
        bullets: [
          "Qual oferta precisa vender nos próximos 30 dias?",
          "Quem aprova conteúdo e em quanto tempo?",
          "O que já foi postado e funcionou?",
          "Quais objeções aparecem antes da compra?",
          "Como o cliente mede se social media valeu a pena?",
        ],
      },
      {
        heading: "Como posicionar a proposta",
        body: [
          "Mostre a operação em camadas: estratégia, calendário, criação, aprovação, publicação e relatório. O preço fica mais defensável quando o cliente enxerga o sistema.",
          "A proposta deixa de ser '12 posts por mês' e vira 'um processo mensal para manter sua marca ativa, aprovada e mensurável'.",
        ],
      },
    ],
    checklist: [
      "Criar conteúdo que exponha sintomas do cliente.",
      "Oferecer diagnóstico simples como CTA.",
      "Usar briefing estruturado na primeira conversa.",
      "Apresentar proposta como operação, não pacote de posts.",
      "Incluir aprovação e relatório como parte do valor.",
    ],
    faq: [
      {
        question: "Como vender social media mais caro?",
        answer: "Venda processo e resultado percebido: diagnóstico, calendário, aprovação, consistência e relatório. Pacote de posts sozinho vira comparação de preço.",
      },
      {
        question: "Inbound funciona para agência pequena?",
        answer: "Funciona quando o conteúdo responde dores de compra e leva para uma ação clara, como diagnóstico ou template útil.",
      },
    ],
    sources: [
      { label: "Salesforce State of Sales", url: "https://www.salesforce.com/sales/state-of-sales/" },
      { label: "HubSpot sales blog", url: "https://blog.hubspot.com/sales" },
    ],
  },
  {
    slug: "aprovacao-relatorios-social-media",
    title: "Aprovação e relatórios de social media: o processo que reduz cobrança e aumenta retenção",
    description: "Aprenda como organizar aprovação, status e relatório semanal para o cliente perceber valor antes de cobrar resultado final.",
    category: "Operação",
    keyword: "aprovação de posts social media",
    intent: "Operacao",
    publishedAt: "2026-05-17",
    updatedAt: "2026-05-17",
    readingTime: "7 min",
    hero: "O cliente cobra menos quando enxerga o processo. Aprovação e relatório não são burocracia: são mecanismos de confiança.",
    takeaways: [
      "Status claro reduz cobrança no WhatsApp.",
      "Aprovação precisa ter prazo e responsável.",
      "Relatório semanal evita surpresa no fim do mês.",
      "Retenção melhora quando valor fica visível.",
    ],
    sections: [
      {
        heading: "Por que aprovação vira gargalo",
        body: [
          "Aprovação falha quando o conteúdo está espalhado: imagem em um lugar, legenda em outro, comentário no WhatsApp e data na planilha.",
          "O cliente não sabe se está atrasando, se já aprovou ou se precisa decidir algo. O social media vira cobrador.",
        ],
      },
      {
        heading: "Status mínimo para operar bem",
        body: [
          "Use poucos status, mas use sempre. Ideia, em criação, em revisão, em aprovação, aprovado e publicado já resolvem a maior parte das operações.",
          "Cada status deve responder a uma pergunta: quem é responsável agora e qual é a próxima ação?",
        ],
        bullets: [
          "Ideia: tema aprovado internamente.",
          "Em criação: copy ou visual sendo produzido.",
          "Em revisão: time ajustando antes do cliente.",
          "Em aprovação: cliente precisa decidir.",
          "Aprovado: pronto para publicar.",
          "Publicado: entrou no relatório.",
        ],
      },
      {
        heading: "Relatório que o cliente lê",
        body: [
          "Relatório bom não é PDF gigante. É um resumo com o que foi feito, o que travou, o que vem agora e qual decisão o cliente precisa tomar.",
          "Esse tipo de relatório vende continuidade porque transforma trabalho invisível em progresso visível.",
        ],
      },
    ],
    checklist: [
      "Padronizar status de posts.",
      "Definir responsável por aprovação.",
      "Registrar data prevista e data aprovada.",
      "Enviar resumo semanal curto.",
      "Separar pendências do cliente de pendências da agência.",
    ],
    faq: [
      {
        question: "Preciso mandar relatório todo mês?",
        answer: "Sim, mas o ideal é também enviar resumo semanal curto. Isso reduz ansiedade e evita que o cliente só perceba valor no fechamento do mês.",
      },
      {
        question: "Como cobrar aprovação atrasada?",
        answer: "Mostre status, prazo e impacto. A conversa fica objetiva quando o atraso está documentado.",
      },
    ],
    sources: [
      { label: "Agorapulse social media workflow review", url: "https://www.techradar.com/reviews/agorapulse" },
      { label: "HubSpot marketing resources", url: "https://blog.hubspot.com/marketing" },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string) {
  const current = getBlogPost(slug);
  if (!current) return blogPosts.slice(0, 3);
  return blogPosts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, 3);
}
