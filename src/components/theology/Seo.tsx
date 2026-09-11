/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { SITE, type PageMeta } from '../../lib/theologySeo';

interface SeoProps {
  meta: PageMeta;
  /** Any number of JSON-LD graph objects to inject. */
  jsonLd?: unknown[];
  image?: string;
}

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export default function Seo({ meta, jsonLd = [], image }: SeoProps) {
  useEffect(() => {
    document.title = meta.title;

    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'keywords', meta.keywords.join(', '));
    upsertMeta('name', 'author', SITE.author);
    upsertMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large');
    upsertMeta('name', 'googlebot', 'index, follow, max-snippet:-1');

    upsertMeta('property', 'og:type', 'article');
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', meta.canonical);
    upsertMeta('property', 'og:locale', 'en_US');
    ['ur_PK', 'hi_IN', 'ar_AR'].forEach((l) => upsertMeta('property', 'og:locale:alternate', l));
    if (image) upsertMeta('property', 'og:image', image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', SITE.twitter);
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = meta.canonical;

    const nodes: HTMLScriptElement[] = jsonLd.map((block) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-theology-ld', 'true');
      s.textContent = JSON.stringify(block);
      document.head.appendChild(s);
      return s;
    });
    return () => nodes.forEach((n) => n.remove());
  }, [meta, jsonLd, image]);

  return null;
}
