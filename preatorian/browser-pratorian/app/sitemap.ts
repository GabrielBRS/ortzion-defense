import type { MetadataRoute } from 'next';

const paths = [
  '',
  '/platform',
  '/systems',
  '/technology',
  '/architecture',
  '/company',
  '/contact',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin =
    process.env.SITE_ORIGIN ?? 'https://ortzion-praetorian.gabriel-sousa.chatgpt.site';
  return paths.map((path) => ({
    url: `${origin}${path}`,
    lastModified: new Date('2026-09-06T00:00:00.000Z'),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
