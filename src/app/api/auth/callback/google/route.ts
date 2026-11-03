import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state') || '/events';
  const error = searchParams.get('error');

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  if (error || !code) {
    console.warn('Google auth cancelled or error:', error);
    return NextResponse.redirect(`${appUrl}/login?error=Google_Auth_Cancelled`);
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${appUrl}/api/auth/callback/google`;

    if (!clientId || !clientSecret) {
      console.error('Missing Google Client credentials');
      return NextResponse.redirect(`${appUrl}/login?error=Missing_Google_Credentials`);
    }

    // 1. Exchange authorization code for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Google token exchange error:', tokenData);
      return NextResponse.redirect(`${appUrl}/login?error=Token_Exchange_Failed`);
    }

    // 2. Fetch authenticated profile from Google
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await profileRes.json();

    if (!profile.email) {
      return NextResponse.redirect(`${appUrl}/login?error=Email_Not_Provided_By_Google`);
    }

    // 3. Sync with Express API backend to issue platform JWT and create/find user
    const syncRes = await fetch(`${apiBase}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: profile.name || 'Google User',
        email: profile.email,
        photoURL: profile.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      }),
    });

    const syncData = await syncRes.json();
    if (!syncRes.ok || !syncData.success) {
      console.error('Backend sync error:', syncData);
      return NextResponse.redirect(`${appUrl}/login?error=Backend_Sync_Failed`);
    }

    // 4. Return HTML script to store session in localStorage and redirect
    const userJson = JSON.stringify(syncData.user);
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authenticating with Google...</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #020617;
              color: #f8fafc;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .card {
              text-align: center;
              padding: 2.5rem;
              background: #0f172a;
              border: 1px solid #1e293b;
              border-radius: 1.5rem;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
              max-width: 400px;
              width: 90%;
            }
            .spinner {
              width: 40px;
              height: 40px;
              margin: 0 auto 1.5rem;
              border: 3px solid #334155;
              border-top-color: #6366f1;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="spinner"></div>
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">Authenticating with Google...</h3>
            <p style="margin: 0; color: #94a3b8; font-size: 0.875rem;">Syncing verified volunteer profile and redirecting...</p>
          </div>
          <script>
            try {
              localStorage.setItem('token', ${JSON.stringify(syncData.token)});
              localStorage.setItem('user', JSON.stringify(${userJson}));
              window.location.href = ${JSON.stringify(state)};
            } catch (e) {
              window.location.href = '/login';
            }
          </script>
        </body>
      </html>
    `;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });

  } catch (err) {
    console.error('Google Callback Exception:', err);
    return NextResponse.redirect(`${appUrl}/login?error=Auth_Server_Error`);
  }
}
