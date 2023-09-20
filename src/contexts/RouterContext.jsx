import { HashRouter, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';
import isElectron from 'is-electron';
import React from 'react';

const RouterContext = ({ children }) => {
  const useElectron = isElectron()
  const history = useElectron ? createHashHistory() : createBrowserHistory();

  if (!useElectron) {
    console.log("Use BrowserRouter")
    return <BrowserRouter history={history}>{children}</BrowserRouter>;
  } else {
    console.log("Use HashRouter")
    return <HashRouter history={history} getUserConfirmation={() => {}} hashType='slash'>{children}</HashRouter>;
  }
};

export default RouterContext;
