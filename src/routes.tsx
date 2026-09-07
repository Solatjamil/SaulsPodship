/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import EncyclopediaIndexPage from './pages/EncyclopediaIndexPage';
import VolumePage from './pages/VolumePage';
import VolumeNumberRedirect from './pages/VolumeNumberRedirect';
import AboutPage from './pages/AboutPage';
import ScholarlyStandardsPage from './pages/ScholarlyStandardsPage';
import PodcastPage from './pages/PodcastPage';
import PodcastEpisodePage from './pages/PodcastEpisodePage';
import MusicPage from './pages/MusicPage';
import PunjabiZaboorPage from './pages/PunjabiZaboorPage';
import SingersArchivePage from './pages/SingersArchivePage';
import StudioPage from './pages/StudioPage';
import TheologicalArchivePage from './pages/TheologicalArchivePage';
import ComparativeApologeticsPage from './pages/ComparativeApologeticsPage';
import { ProphecyMapPage, KingsOfTheBiblePage, CrossReferencesPage } from './pages/ModulePages';
import SupportPage from './pages/SupportPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import DisclaimerPage from './pages/DisclaimerPage';
import SitemapPage from './pages/SitemapPage';
import NotFoundPage from './pages/NotFoundPage';

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'encyclopedia',
        element: <EncyclopediaIndexPage />
      },
      {
        path: 'encyclopedia/:slug',
        element: <VolumePage />
      },
      {
        path: 'encyclopedia/by-number/:num',
        element: <VolumeNumberRedirect />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'scholarly-standards',
        element: <ScholarlyStandardsPage />
      },
      {
        path: 'podcast',
        element: <PodcastPage />
      },
      {
        path: 'podcast/:episode',
        element: <PodcastEpisodePage />
      },
      {
        path: 'music',
        element: <MusicPage />
      },
      {
        path: 'music/punjabi-zaboor',
        element: <PunjabiZaboorPage />
      },
      {
        path: 'music/pakistani-singers-archive',
        element: <SingersArchivePage />
      },
      {
        path: 'studio',
        element: <StudioPage />
      },
      {
        path: 'theological-archive',
        element: <TheologicalArchivePage />
      },
      {
        path: 'comparative-apologetics',
        element: <ComparativeApologeticsPage />
      },
      {
        path: 'prophecy-map',
        element: <ProphecyMapPage />
      },
      {
        path: 'kings-of-the-bible',
        element: <KingsOfTheBiblePage />
      },
      {
        path: 'cross-references',
        element: <CrossReferencesPage />
      },
      {
        path: 'support',
        element: <SupportPage />
      },
      {
        path: 'faq',
        element: <FaqPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'privacy',
        element: <PrivacyPage />
      },
      {
        path: 'terms',
        element: <TermsPage />
      },
      {
        path: 'disclaimer',
        element: <DisclaimerPage />
      },
      {
        path: 'sitemap',
        element: <SitemapPage />
      },
      {
        path: '*',
        element: <NotFoundPage status={404} />
      }
    ]
  }
];

export const router = createBrowserRouter(routeConfig);
