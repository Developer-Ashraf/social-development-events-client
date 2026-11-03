import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const redirectAfter = requestUrl.searchParams.get('redirect') || '/events';

  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  const dynamicOrigin = forwardedHost ? `${forwardedProto}://${forwardedHost}` : requestUrl.origin;
  const appUrl = dynamicOrigin || 'http://localhost:3000';

  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${appUrl}/api/auth/callback/github`;

  if (!clientId || clientId === 'your_github_client_id_here') {
    return NextResponse.redirect(`${appUrl}/login?error=GitHub_ClientId_Not_Configured`);
  }

  const rootUrl = 'https://github.com/login/oauth/authorize';
  const options = {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
    state: redirectAfter,
  };

  const qs = new URLSearchParams(options);
  return NextResponse.redirect(`${rootUrl}?${qs.toString()}`);
}
