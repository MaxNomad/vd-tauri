import { createRoot } from 'react-dom/client';
import React from 'react';
// project import
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as Sentry from "@sentry/react";
import { appVersion } from '@utils/Tauri';

Sentry.init({
  enabled: import.meta.env.PROD,
  dsn: "https://299b1b9e3b63a15f57ac6a2bd8b96356@o4503924567572480.ingest.sentry.io/4505924038819840",
  integrations: [
    new Sentry.BrowserTracing({
      release: appVersion,
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", "https://api.vd.lutsk.ua/*"],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
// ==============================|| MAIN - REACT DOM RENDER  ||============================== //
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

reportWebVitals();



