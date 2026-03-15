/**
 * Site Configuration
 * Social links fetched from backend API - falls back to defaults if unavailable
 * Backend endpoint: GET /api/site/social-links
 * Expected response: { links: [{ platform, url, label }] } or [{ platform, url, label }]
 */

import { API_BASE_URL } from './api';

export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'linkedin' | 'twitter' | 'facebook' | 'whatsapp';
  url: string;
  label: string;
}

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: 'instagram', url: 'https://instagram.com/', label: 'Instagram' },
  { platform: 'youtube', url: 'https://youtube.com/', label: 'YouTube' },
  { platform: 'linkedin', url: 'https://linkedin.com/', label: 'LinkedIn' },
  { platform: 'twitter', url: 'https://twitter.com/', label: 'X (Twitter)' },
  { platform: 'facebook', url: 'https://facebook.com/', label: 'Facebook' },
];

let cachedSocialLinks: SocialLink[] | null = null;

/**
 * Fetch social links from backend API
 * Falls back to defaults if API is unavailable
 */
export async function fetchSocialLinks(): Promise<SocialLink[]> {
  if (cachedSocialLinks) return cachedSocialLinks;
  try {
    const response = await fetch(`${API_BASE_URL}/api/site/social-links`);
    if (response.ok) {
      const data = await response.json();
      const links = Array.isArray(data) ? data : (data?.links ?? []);
      cachedSocialLinks = links.length > 0
        ? links.map((l: { platform?: string; url?: string; label?: string }) => ({
            platform: (l.platform || 'instagram') as SocialLink['platform'],
            url: l.url || '#',
            label: l.label || 'Social',
          }))
        : DEFAULT_SOCIAL_LINKS;
      return cachedSocialLinks;
    }
  } catch {
    // API not available, use defaults
  }
  cachedSocialLinks = DEFAULT_SOCIAL_LINKS;
  return cachedSocialLinks;
}
