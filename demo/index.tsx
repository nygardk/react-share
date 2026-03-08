import React from 'react';
import { createRoot } from 'react-dom/client';
import { Demo } from './Demo';
import './Demo.css';

const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(
    <React.StrictMode>
      <Demo />
    </React.StrictMode>,
  );
}
