# SocialOS - Production Readiness

## Status atual

- Repo restaurado para Next.js funcional. O commit anterior na `main` apagava o app e quebrava `npm run build`.
- Firebase CLI autenticado e projetos listados.
- Projeto Firebase criado pelo usuario: `social-media-os-88b4c`.
- Service account local recebida em `C:\Users\cspga\Downloads\social-media-os-88b4c-firebase-adminsdk-fbsvc-bad02cb394.json`.
- A chave de servico nao deve ser commitada. O repo ignora `*firebase-adminsdk*.json`.
- `.firebaserc` aponta o projeto default para `social-media-os-88b4c`.
- Validacao via Firebase CLI ainda retornou `403` na conta CLI atual (`cspgabriel@outlook.com.br`), entao falta conceder permissao de acesso ao projeto para essa conta ou relogar com a conta dona do projeto.

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

1. Conceder permissao no Firebase/GCP para `cspgabriel@outlook.com.br` no projeto `social-media-os-88b4c`.
2. Ativar Auth, Firestore e Hosting/App Hosting no projeto correto.
3. Persistir clientes, configuracoes e usage quota no Firestore.
4. Adicionar checkout/billing para alternar `free`, `pro`, `scale`.
5. Trocar mocks por dados reais de usuario/cliente.
