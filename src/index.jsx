import { createRoot } from 'react-dom/client';
import { invoke } from '@tauri-apps/api/tauri';
import React from 'react';

// project import
import App from './App';

import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

reportWebVitals();

document.addEventListener('DOMContentLoaded', () => {
    invoke('dom_started');
});
