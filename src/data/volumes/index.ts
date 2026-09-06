/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Volume } from '../../../types';

import { volume_01 } from './volume_01';
import { volume_02 } from './volume_02';
import { volume_03 } from './volume_03';
import { volume_04 } from './volume_04';
import { volume_05 } from './volume_05';
import { volume_06 } from './volume_06';
import { volume_07 } from './volume_07';
import { volume_08 } from './volume_08';
import { volume_09 } from './volume_09';
import { volume_10 } from './volume_10';
import { volume_11 } from './volume_11';
import { volume_12 } from './volume_12';
import { volume_13 } from './volume_13';
import { volume_14 } from './volume_14';
import { volume_15 } from './volume_15';
import { volume_16 } from './volume_16';
import { volume_17 } from './volume_17';
import { volume_18 } from './volume_18';
import { volume_19 } from './volume_19';
import { volume_20 } from './volume_20';
import { volume_21 } from './volume_21';
import { volume_22 } from './volume_22';
import { volume_23 } from './volume_23';
import { volume_24 } from './volume_24';
import { volume_25 } from './volume_25';
import { volume_26 } from './volume_26';
import { volume_27 } from './volume_27';
import { volume_28 } from './volume_28';
import { volume_29 } from './volume_29';
import { volume_30 } from './volume_30';
import { volume_31 } from './volume_31';
import { volume_32 } from './volume_32';
import { volume_33 } from './volume_33';
import { volume_34 } from './volume_34';
import { volume_35 } from './volume_35';
import { volume_36 } from './volume_36';
import { volume_37 } from './volume_37';
import { volume_38 } from './volume_38';
import { volume_39 } from './volume_39';
import { volume_40 } from './volume_40';
import { volume_41 } from './volume_41';
import { volume_42 } from './volume_42';
import { volume_43 } from './volume_43';
import { volume_44 } from './volume_44';
import { volume_45 } from './volume_45';
import { volume_46 } from './volume_46';
import { volume_47 } from './volume_47';
import { volume_48 } from './volume_48';
import { volume_49 } from './volume_49';
import { volume_50 } from './volume_50';

export const VOLUMES: Volume[] = [
  volume_01,
  volume_02,
  volume_03,
  volume_04,
  volume_05,
  volume_06,
  volume_07,
  volume_08,
  volume_09,
  volume_10,
  volume_11,
  volume_12,
  volume_13,
  volume_14,
  volume_15,
  volume_16,
  volume_17,
  volume_18,
  volume_19,
  volume_20,
  volume_21,
  volume_22,
  volume_23,
  volume_24,
  volume_25,
  volume_26,
  volume_27,
  volume_28,
  volume_29,
  volume_30,
  volume_31,
  volume_32,
  volume_33,
  volume_34,
  volume_35,
  volume_36,
  volume_37,
  volume_38,
  volume_39,
  volume_40,
  volume_41,
  volume_42,
  volume_43,
  volume_44,
  volume_45,
  volume_46,
  volume_47,
  volume_48,
  volume_49,
  volume_50,
];

export function getVolumeBySlug(slug: string): Volume | undefined {
  return VOLUMES.find(v => v.slug.toLowerCase() === slug.toLowerCase());
}

export function getVolumeById(id: string): Volume | undefined {
  const cleanId = id.padStart(2, '0');
  return VOLUMES.find(v => v.id === cleanId);
}

export function getVolumeByNumber(num: number): Volume | undefined {
  return VOLUMES.find(v => v.number === num);
}

export default VOLUMES;
