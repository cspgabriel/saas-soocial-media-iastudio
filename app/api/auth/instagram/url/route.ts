import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Construct the OAuth provider's authorization URL
  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  
  if (!clientId) {
    return NextResponse.json({ error: 'INSTAGRAM_CLIENT_ID is not configured.' }, { status: 500 });
  }

  // Get the base URL from the request (in App Router, req.nextUrl.origin can be used, 
  // but it's safer to use the APP_URL env variable if present, or infer from headers)
  const host = req.headers.get('host') || 'localhost:3000';
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const origin = process.env.APP_URL || `${protocol}://${host}`;
  const redirectUri = `${origin}/api/auth/instagram/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'user_profile,user_media',
  });

  const authUrl = `https://api.instagram.com/oauth/authorize?${params.toString()}`;

  return NextResponse.json({ url: authUrl });
}
