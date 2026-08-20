// Vercel Edge Middleware — protège tout le site par mot de passe (Basic Auth).
// Le mot de passe est l'env var SITE_PASSWORD (réglée dans Vercel). User = "alcopa".
export const config = { matcher: '/:path*' };

export default function middleware(request) {
  const USER = 'alcopa';
  const PASS = process.env.SITE_PASSWORD || 'change-me';
  const header = request.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    try {
      const [u, p] = atob(header.slice(6)).split(':');
      if (u === USER && p === PASS) return; // autorisé -> sert la page
    } catch (e) {}
  }
  return new Response('Authentification requise', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Alcopa", charset="UTF-8"' },
  });
}
