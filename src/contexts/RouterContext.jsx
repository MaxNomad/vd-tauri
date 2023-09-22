import { HashRouter, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';
import React from 'react';
import { isTauri } from '@utils/Tauri';

const RouterContext = ({ children }) => {
    const history = isTauri ? createHashHistory() : createBrowserHistory();

    if (!isTauri) {
        console.log('Use BrowserRouter');
        return <BrowserRouter history={history}>{children}</BrowserRouter>;
    } else {
        console.log('Use HashRouter');
        return (
            <HashRouter history={history} getUserConfirmation={() => {}} hashType="slash">
                {children}
            </HashRouter>
        );
    }
};

export default RouterContext;
