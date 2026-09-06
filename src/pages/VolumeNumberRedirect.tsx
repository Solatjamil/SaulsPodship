/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getVolumeByNumber, getVolumeById } from '../data/volumes';

interface VolumeNumberRedirectProps {
  num?: number;
}

export const VolumeNumberRedirect: React.FC<VolumeNumberRedirectProps> = ({ num: propNum }) => {
  const { num: paramNum } = useParams<{ num: string }>();
  
  const targetNum = propNum !== undefined 
    ? propNum 
    : (paramNum ? parseInt(paramNum, 10) : undefined);

  if (targetNum && !isNaN(targetNum)) {
    const volume = getVolumeByNumber(targetNum) || getVolumeById(String(targetNum));
    if (volume && volume.slug) {
      return <Navigate replace to={`/encyclopedia/${volume.slug}`} />;
    }
  }

  return <Navigate replace to="/encyclopedia" />;
};

export default VolumeNumberRedirect;
