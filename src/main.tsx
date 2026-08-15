try {
  const rawFetch = window.fetch;
  let currentFetch = typeof rawFetch === 'function' ? rawFetch.bind(window) : rawFetch;
  Object.defineProperty(window, 'fetch', {
    get() {
      return currentFetch;
    },
    set(val) {
      currentFetch = val;
    },
    configurable: true,
    enumerable: true,
  });
} catch {
  // ignore
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
