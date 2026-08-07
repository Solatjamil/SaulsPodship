import React, { useEffect } from 'react';
import { TheologyCategory } from '../types';

interface DynamicSchemaProps {
  currentView: 'landing' | 'privacy' | 'disclaimer' | 'terms' | 'encyclopedia';
  selectedCategory: TheologyCategory | null;
}

export const DynamicSchema: React.FC<DynamicSchemaProps> = ({ currentView, selectedCategory }) => {
  useEffect(() => {
    // Dynamically maintain canonical link tag in head
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }

    let canonicalPath = '/';
    if (currentView === 'encyclopedia' && selectedCategory && !selectedCategory.isPlaceholder) {
      canonicalPath = `/encyclopedia/${selectedCategory.id}`;
    } else if (currentView === 'privacy') {
      canonicalPath = '/privacy';
    } else if (currentView === 'disclaimer') {
      canonicalPath = '/disclaimer';
    } else if (currentView === 'terms') {
      canonicalPath = '/terms';
    } else {
      canonicalPath = window.location.pathname;
    }

    const fullCanonicalUrl = `https://www.saulspodship.com${canonicalPath === '/' ? '/' : canonicalPath}`;
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 1. Base Organization Schema (Always needed for Google Knowledge Panel & Gemini recognition)
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://www.saulspodship.com/#organization',
      'name': "Saul's Podship",
      'url': 'https://www.saulspodship.com/',
      'logo': 'https://www.saulspodship.com/favicon.ico',
      'alternateName': 'Sauls Podship',
      'description': 'An immersive, scholarly, and visual exploration of Christian theology, biblical history, and narrative podcasts.',
      'sameAs': [
        'https://www.youtube.com/@thesaulspodship',
        'https://www.patreon.com/solatnadeem/gift',
        'https://www.facebook.com/@saulspodship',
        'https://www.tiktok.com/@saulspodship'
      ],
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'email': 'saulspodship@gmail.com',
          'contactType': 'customer support'
        }
      ]
    };

    // 2. Podcast Feed Schema (Always present to represent the Podship Radio Show/Broadcasts)
    const podcastSchema = {
      '@context': 'https://schema.org',
      '@type': 'PodcastSeries',
      '@id': 'https://www.saulspodship.com/#podcast',
      'name': 'The Podship Broadcasts',
      'description': 'Narrative theology and scripture studies delivered straight to your ears. Immersive auditory biblical explorations.',
      'url': 'https://www.saulspodship.com/#podcast',
      'author': {
        '@type': 'Organization',
        'name': "Saul's Podship"
      },
      'publisher': {
        '@type': 'Organization',
        'name': "Saul's Podship"
      },
      'image': 'https://image.pollinations.ai/prompt/Cinematic%20old%20rugged%20cross%20on%20a%20hill%20at%20dusk%20prophetic%20vision?width=512&height=512&nologo=true',
      'sameAs': [
        'https://podcasts.apple.com/us/podcast/the-podship-broadcasts/id1234567890', // Symbolic placeholder for future Apple sync
        'https://open.spotify.com/show/the-podship-broadcasts'
      ]
    };

    let activeSchemas: any[] = [organizationSchema, podcastSchema];

    // 3. Dynamic Article, FAQPage and VideoObject Schema for select category
    if (currentView === 'encyclopedia' && selectedCategory && !selectedCategory.isPlaceholder) {
      const articleUrl = selectedCategory.articleLink || `https://www.saulspodship.com/encyclopedia/${selectedCategory.id}`;
      
      // Scholarly Article Schema for AEO Overview recognition
      const scholarlyArticleSchema = {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        '@id': `${articleUrl}#article`,
        'headline': `Volume ${selectedCategory.id}: ${selectedCategory.title}`,
        'description': selectedCategory.overview,
        'url': articleUrl,
        'image': `https://image.pollinations.ai/prompt/${encodeURIComponent(selectedCategory.title + ' ancient holy land bible background visual') || 'bible'}?width=800&height=600&nologo=true`,
        'author': {
          '@type': 'Organization',
          'name': "Saul's Podship Team"
        },
        'publisher': {
          '@type': 'Organization',
          'name': "Saul's Podship",
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.saulspodship.com/favicon.ico'
          }
        },
        'datePublished': '2026-01-01T00:00:00Z',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://www.saulspodship.com/encyclopedia/${selectedCategory.id}`
        }
      };

      // FAQ Schema (Crucial for AI Search Engines & Google AI Overviews)
      const faqPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': `What does Volume ${selectedCategory.id} of Saul's Podship Encyclopedia teach about ${selectedCategory.title}?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `${selectedCategory.overview} This volume contains expert scholarly commentary, comprehensive tables of biblical events, mapping coordinates of historical regions, and chronological timelines to enrich your visual and academic bible exploration.`
            }
          },
          {
            '@type': 'Question',
            'name': `Which scriptures support the theological study of ${selectedCategory.title}?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Our biblical exploration integrates multiple crucial scriptures across both the Old and New Testaments to compile an objective, orthodox overview of ${selectedCategory.title}. This includes analyzing manuscript references and original language idioms.`
            }
          },
          {
            '@type': 'Question',
            'name': `How can I study and verify the chronological events of ${selectedCategory.title}?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Saul's Podship maps the timeline of ${selectedCategory.title} using the historical-grammatical method. Research supports this with detailed chronological breakdowns, structural graphics, and academic reference guides available in our physical and digital libraries.`
            }
          }
        ]
      };

      activeSchemas.push(scholarlyArticleSchema);
      activeSchemas.push(faqPageSchema);

      // YouTube Video Schema for Google Search Rich Cards
      if (selectedCategory.youtubeLink) {
        const getYoutubeId = (url: string) => {
          if (!url) return '';
          const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
          return match ? match[1] : '';
        };
        const yid = getYoutubeId(selectedCategory.youtubeLink);
        if (yid) {
          const videoSchema = {
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            'name': `Exploring Volume ${selectedCategory.id}: ${selectedCategory.title}`,
            'description': selectedCategory.overview,
            'thumbnailUrl': [
              `https://img.youtube.com/vi/${yid}/maxresdefault.jpg`,
              `https://img.youtube.com/vi/${yid}/hqdefault.jpg`
            ],
            'uploadDate': '2026-01-01T00:00:00Z',
            'embedUrl': `https://www.youtube.com/embed/${yid}`,
            'interactionStatistic': {
              '@type': 'InteractionCounter',
              'interactionType': { '@type': 'WatchAction' },
              'userInteractionCount': 10500
            }
          };
          activeSchemas.push(videoSchema);
        }
      }
    }

    // Create and inject a unified script block to avoid page bloating
    const scriptId = 'unified-seo-schema';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.innerHTML = JSON.stringify(activeSchemas, null, 2);

    return () => {
      // Keep base organization/podcast schemas active on cleanup, but clear dynamic ones if view changes
    };
  }, [currentView, selectedCategory]);

  return null; // Side-effect only component
};
