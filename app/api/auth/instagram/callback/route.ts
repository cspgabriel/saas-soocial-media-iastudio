import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  if (error) {
    return new NextResponse(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: '${error_description}' }, '*');
              window.close();
            } else {
              window.location.href = '/settings';
            }
          </script>
          <p>Erro na autenticação: ${error_description}. Fechando janela...</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  if (!code) {
    return new NextResponse('No code provided', { status: 400 });
  }

  // In a real application, you would exchange the code for an access token here:
  // https://api.instagram.com/oauth/access_token
  // POST request passing client_id, client_secret, grant_type, redirect_uri, code.
  // Then you would store it securely for the user.

  // For this callback response, we simply notify the parent window to close
  return new NextResponse(`
    <html>
      <body>
        <script>
          // Send success message to parent window and close popup
          if (window.opener) {
            window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', code: '${code}' }, '*');
            window.close();
          } else {
            window.location.href = '/settings';
          }
        </script>
        <p>Autenticação do Instagram concluída com sucesso. Esta janela será fechada automaticamente.</p>
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' },
  });
}
