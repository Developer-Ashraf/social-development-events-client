import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const state = requestUrl.searchParams.get('state') || '/events';
  const error = requestUrl.searchParams.get('error');

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin || 'http://localhost:3000';
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  if (error || !code) {
    console.warn('GitHub auth cancelled or error:', error);
    return NextResponse.redirect(`${appUrl}/login?error=GitHub_Auth_Cancelled`);
  }

  try {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error('Missing GitHub Client credentials');
      return NextResponse.redirect(`${appUrl}/login?error=Missing_GitHub_Credentials`);
    }

    // 1. Exchange authorization code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'CivicPulse-App/1.0',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('GitHub token exchange error:', tokenData);
      return NextResponse.redirect(`${appUrl}/login?error=GitHub_Token_Exchange_Failed`);
    }

    // 2. Fetch authenticated profile from GitHub (User-Agent header is strictly required by GitHub)
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'User-Agent': 'CivicPulse-App/1.0',
        Accept: 'application/vnd.github.v3+json',
      },
    });
    const githubUser = await userRes.json();
    console.log('GitHub Profile received:', {
      login: githubUser.login,
      name: githubUser.name,
      avatar_url: githubUser.avatar_url,
      email: githubUser.email,
    });

    // 3. Fetch primary verified email if not public in profile
    let email = githubUser.email;
    if (!email) {
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'User-Agent': 'CivicPulse-App/1.0',
          Accept: 'application/vnd.github.v3+json',
        },
      });
      const emails = await emailRes.json();
      if (Array.isArray(emails)) {
        const primary =
          emails.find((e: { primary: boolean; verified: boolean; email: string }) => e.primary && e.verified) ||
          emails.find((e: { verified: boolean; email: string }) => e.verified) ||
          emails[0];
        if (primary && primary.email) {
          email = primary.email;
        }
      }
    }

    // Fallback email if completely hidden
    if (!email) {
      email = `${githubUser.login || 'user'}@users.noreply.github.com`;
    }

    // Accurate name resolution (prioritize full name, then login handle)
    const resolvedName = githubUser.name || githubUser.login || 'GitHub Contributor';
    const resolvedPhoto =
      githubUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';

    // 4. Sync with Express API backend to update/create user and get JWT
    const syncRes = await fetch(`${apiBase}/api/auth/github`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: resolvedName,
        email,
        photoURL: resolvedPhoto,
      }),
    });

    const syncData = await syncRes.json();
    if (!syncRes.ok || !syncData.success) {
      console.error('Backend sync error:', syncData);
      return NextResponse.redirect(`${appUrl}/login?error=Backend_Sync_Failed`);
    }

    // 5. Return HTML script to store session in localStorage and redirect
    const userPayload = JSON.stringify(syncData.user);
    const tokenPayload = JSON.stringify(syncData.token);
    const targetState = JSON.stringify(state);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authenticating with GitHub...</title>
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
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">Authenticating with GitHub...</h3>
            <p style="margin: 0; color: #94a3b8; font-size: 0.875rem;">Loading your volunteer profile...</p>
          </div>
          <script>
            try {
              const token = ${tokenPayload};
              const userObj = ${userPayload};
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(userObj));
              window.location.href = ${targetState};
            } catch (e) {
              console.error(e);
              window.location.href = '/events';
            }
          </script>
        </body>
      </html>
    `;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });

  } catch (err) {
    console.error('GitHub Callback Exception:', err);
    return NextResponse.redirect(`${appUrl}/login?error=Auth_Server_Error`);
  }
}
