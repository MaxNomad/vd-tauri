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
import { ErrorBoundary } from 'react-error-boundary';
import AppError from '@pages/AppError';
import 'rsuite/dist/rsuite.min.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-toastify/dist/ReactToastify.css';
import 'simplebar/src/simplebar.css';
import '@assets/third-party/apex-chart.css';
import './App.scss';


const Fallback = ({ error, resetErrorBoundary }) => {
    return <AppError error={error} resetErrorBoundary={resetErrorBoundary} />;
}
const App = () => {
    return (<ErrorBoundary FallbackComponent={Fallback} onReset={(details) => { }}>
        <ReduxProvider store={store}>
            <RouterContext>
                <ConfigProvider>
                    <ThemeCustomization>
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
                    </ThemeCustomization>
                </ConfigProvider>
            </RouterContext>
        </ReduxProvider>
    </ErrorBoundary>
    );
};
export default App;
