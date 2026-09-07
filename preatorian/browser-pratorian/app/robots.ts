import type { MetadataRoute } from 'next';

function siteOrigin(): string {
  return process.env.SITE_ORIGIN ?? 'https://ortzion-praetorian.gabriel-sousa.chatgpt.site';
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/portal', '/portal/', '/auth/'] }],
    sitemap: `${siteOrigin()}/sitemap.xml`,
  };
}
