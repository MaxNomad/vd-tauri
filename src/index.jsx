import { createRoot } from 'react-dom/client';
import React from 'react';
// project import
import App from './App';

import reportWebVitals from './reportWebVitals';
import { isTauri } from '@utils/Tauri';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

reportWebVitals();





