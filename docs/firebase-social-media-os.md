# Firebase SocialOS

## Projeto

- Project ID: `social-media-os-88b4c`
- Service account local: `C:\Users\cspga\Downloads\social-media-os-88b4c-firebase-adminsdk-fbsvc-bad02cb394.json`
- Service account email: `firebase-adminsdk-fbsvc@social-media-os-88b4c.iam.gserviceaccount.com`

## Seguranca

- Nunca commitar a chave JSON.
- O `.gitignore` bloqueia `*firebase-adminsdk*.json` e `service-account*.json`.
- Em deploy, cadastrar secrets no Firebase/App Hosting:
  - `GEMINI_API_KEY`
  - credenciais Firebase Admin, se o backend precisar de Admin SDK.

## Estado validado

- A chave JSON existe localmente e aponta para `social-media-os-88b4c`.
- `.firebaserc` foi criado apontando `default` para `social-media-os-88b4c`.
- `firebase apps:list --project social-media-os-88b4c` retornou `403` com a conta CLI atual.

## Pendencia

Dar permissao no projeto para a conta usada pelo Firebase CLI ou fazer login na conta dona do projeto.
