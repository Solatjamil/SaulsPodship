/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TheologyCategory } from '../types';
import { VOLUMES } from '../src/data/volumes/index';

export const CATEGORIES: TheologyCategory[] = VOLUMES.map(v => ({
  ...v,
  isPlaceholder: false
}));

export default CATEGORIES;
