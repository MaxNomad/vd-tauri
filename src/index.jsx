import { createRoot } from 'react-dom/client';
import React from 'react';
// project import
import App from './App';
import reportWebVitals from './reportWebVitals';
import WindowFrame from '@window/components/WindowFrame';
import './App.scss';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <WindowFrame title="VD Control Alpha" platform={isSafari ? 'mac' : 'windows'}>
        <App />
    </WindowFrame>
);

reportWebVitals();