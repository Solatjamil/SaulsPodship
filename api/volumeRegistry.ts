/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VOLUMES } from '../src/data/volumes/index';

export interface VolumeRegistryItem {
  title: string;
  overview: string;
  id?: string;
  slug?: string;
}

export const VOLUME_REGISTRY: VolumeRegistryItem[] = VOLUMES.map(v => ({
  title: v.title,
  overview: v.overview,
  id: v.id,
  slug: v.slug
}));

export default VOLUME_REGISTRY;
