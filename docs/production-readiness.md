# SocialOS - Production Readiness

## Status atual

- Repo restaurado para Next.js funcional. O commit anterior na `main` apagava o app e quebrava `npm run build`.
- Firebase CLI autenticado e projetos listados.
- Nao existia projeto Firebase com nome SocialOS/social media.
- Tentativa de criar `socialos-cspgabriel` falhou por quota de projetos Google Cloud.
- Existem projetos `studio-8055294696-42192` e `studio-143590140-45ff0` com Web Apps ativos, mas nao ha evidencia suficiente de que um deles e o projeto oficial deste repo.

## Free vs pago

### Free BYOK

- Usuario salva a propria chave Gemini em `/settings`.
- A chave fica no navegador via `localStorage`.
- APIs recebem `x-gemini-api-key`.
- Limite atual: 30 geracoes/dia por usuario/IP.
- Pode rodar com custo baixo, mas API routes do Next precisam runtime server-side.

### Pago gerenciado

- Servidor usa `GEMINI_API_KEY`.
- Limites atuais:
  - `pro`: 300 geracoes/dia.
  - `scale`: 1200 geracoes/dia.
- Proximo passo para producao real: persistir limites em Firestore/Redis, porque o limite em memoria reinicia com deploy/scale.

## Firebase

Arquivos adicionados:

- `firebase.json`: deploy Firebase Hosting com backend framework.
- `apphosting.yaml`: runtime minimo para App Hosting.

Observacao operacional:

- Firebase Hosting estatico cabe no plano Spark/free.
- Next.js com API routes/server-side precisa backend gerenciado. Para Firebase, isso normalmente exige App Hosting/Cloud Functions e pode exigir billing.
- Para ficar 100% Spark/free, a versao free precisa virar frontend estatico sem API routes server-side, usando BYOK direto no browser.

## Proximos P0

1. Escolher/criar projeto Firebase oficial para SocialOS.
2. Ativar Auth, Firestore e Hosting/App Hosting no projeto correto.
3. Persistir clientes, configuracoes e usage quota no Firestore.
4. Adicionar checkout/billing para alternar `free`, `pro`, `scale`.
5. Trocar mocks por dados reais de usuario/cliente.
