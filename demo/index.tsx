import React from 'react';
import { createRoot } from 'react-dom/client';

import Demo from './Demo';

const rootElement = document.createElement('div');

if (!document.querySelector('div')) {
  document.body.appendChild(rootElement);
}

const root = createRoot(rootElement);
root.render(<Demo />);
