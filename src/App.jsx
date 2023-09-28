// project import
import ThemeCustomization from '@themes';
import ScrollTop from '@components/ScrollTop';
import { AuthContextProvider } from '@pages/authentication/context/AuthContext';
import Protected from '@pages/authentication/context/Protected';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ToastInit from '@themes/overrides/ToastInit';
import { ConfigProvider } from '@contexts/ConfigContext';
import Routes from '@routes';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@store';
import NetworkCheck from '@contexts/NetworkContext';
import RouterContext from '@contexts/RouterContext';
import React from 'react';
import AppUpdateNotification from '@utils/TauriUpdater';
import Loader from '@components/Loader';
import AppError from '@pages/AppError';
import * as Sentry from '@sentry/react';
import { appVersion } from '@utils/Tauri';
import 'rsuite/dist/rsuite.min.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-toastify/dist/ReactToastify.css';
import 'simplebar/src/simplebar.css';
import '@assets/third-party/apex-chart.css';
import { inProdMode } from './config';

Sentry.init({
    enabled: inProdMode,
    dsn: 'https://299b1b9e3b63a15f57ac6a2bd8b96356@o4503924567572480.ingest.sentry.io/4505924038819840',
    integrations: [
        new Sentry.BrowserTracing({
            release: appVersion,
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ['localhost', 'https://api.vd.lutsk.ua/*']
        }),
        new Sentry.Replay()
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const Fallback = ({ error, componentStack, resetError }) => {
    return <AppError error={error} resetErrorBoundary={resetError} stack={componentStack} />;
};
const App = () => {
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
    }, []);

    return (
        <ReduxProvider store={store}>
            <RouterContext>
                <ConfigProvider>
                    <ThemeCustomization>
                        <Sentry.ErrorBoundary fallback={Fallback} showDialog>
                            {!loading ? (
                                <Loader />
                            ) : (
                                <NetworkCheck>
                                    <AppUpdateNotification />
                                    <ScrollTop>
                                        <GoogleOAuthProvider clientId="481973527971-fkk5c04av94i9p0fubn3scr97cn7l14f.apps.googleusercontent.com">
                                            <AuthContextProvider>
                                                <Protected />
                                                <Routes />
                                            </AuthContextProvider>
                                            <ToastInit />
                                        </GoogleOAuthProvider>
                                    </ScrollTop>
                                </NetworkCheck>
                            )}
                        </Sentry.ErrorBoundary>
                    </ThemeCustomization>
                </ConfigProvider>
            </RouterContext>
        </ReduxProvider>
    );
};
export default App;
