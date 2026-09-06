/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './src/routes';

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
