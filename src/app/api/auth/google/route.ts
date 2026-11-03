import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const redirectAfter = requestUrl.searchParams.get('redirect') || '/events';

  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  const dynamicOrigin = forwardedHost ? `${forwardedProto}://${forwardedHost}` : requestUrl.origin;
  const appUrl = dynamicOrigin || 'http://localhost:3000';

  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = `${appUrl}/api/auth/callback/google`;

  if (!clientId || clientId === 'your_google_client_id_here') {
    return NextResponse.redirect(`${appUrl}/login?error=Google_ClientId_Not_Configured`);
  }

  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: redirectUri,
    client_id: clientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: redirectAfter,
  };

  const qs = new URLSearchParams(options);
  return NextResponse.redirect(`${rootUrl}?${qs.toString()}`);
}
