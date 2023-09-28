import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import React from 'react';
import { isTauri } from '@utils/Tauri';

const RouterContext = ({ children }) => {
    const history = createBrowserHistory();
    return <BrowserRouter history={history}>{children}</BrowserRouter>;
};

export default RouterContext;
