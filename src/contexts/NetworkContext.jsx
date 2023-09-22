import AppOffline from '@pages/offline/index';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastAlert } from '@pages/components-overview/toasts';
import { getGitData } from '@pages/dashboard/redux/gitstatusSlice';
import { fetchUserData } from '@pages/authentication/redux/authThunk';
import { getToken } from '@pages/authentication/helper/token';

const NetworkCheck = ({ children }) => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.rootGithub);

    const dispatchAction = () => {
        dispatch(getGitData());
    };
    const dispatchUser = () => {
        if (getToken()) dispatch(fetchUserData());
    };

    useEffect(() => {
        dispatchAction();
        const intervalId = setInterval(dispatchAction, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        dispatchUser();
        const intervalId = setInterval(dispatchUser, 5000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // window.location.reload();
    }, [data]);

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            toastAlert('Reconnection successful');
            setIsOnline(true);
        };

        const handleOffline = () => {
            toastError('Netwotk connection lost');
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline ? children : <AppOffline />;
};

export default NetworkCheck;
