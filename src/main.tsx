import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SPOUSES } from './config/SpousesInfo';
import App from './App.tsx';
import './index.css';

document.title = `${SPOUSES.bride.name} & ${SPOUSES.groom.name} - Ci Sposiamo!`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
