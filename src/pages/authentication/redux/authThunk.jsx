import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { createBrowserHistory } from 'history';
import { setTokenRef, getToken, removeToken, setToken, removeTokenRef, removeUser, setUser } from '../helper/token';
import jwt_decode from 'jwt-decode';
import { toastSuccess, toastAlert, toastError } from '@pages/components-overview/toasts';

const navigate = createBrowserHistory();

const removeData = () => {
    removeToken();
    removeTokenRef();
    removeUser();
};

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async () => {
    const res = await api.post('/user');
    setUser(JSON.stringify(res.data));
    return res.data;
});

export const loginGoogle = createAsyncThunk('auth/loginGoogle', async (payload) => {
    const res = await api.post('/google/sign-in', payload);
    if (res.status === 200) {
        setToken(res.data.access_token);
        setTokenRef(res.data.refresh_token);
        setUser(JSON.stringify(jwt_decode(res.data.access_token)));
        toastSuccess('Successfully logged in');
        navigate.push('/dash');
    }else {
        toastError(res.data.message);
        removeData();
    }
    return res.data;
});

export const login = createAsyncThunk('auth/login', async (payload) => {
    const res = await api.post('/sign-in', payload);
    if (res.status === 200) {
        setToken(res?.data?.access_token);
        setTokenRef(res?.data?.refresh_token);
        setUser(JSON.stringify(jwt_decode(res?.data?.access_token)));
        toastSuccess('Successfully logged in');
        navigate.push('/dash');
    }else {
        toastError(res.data.message);
        removeData();
    }
    return res.data;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
    const res = await api.put('/sign-out');
    if (res.status === 200) {
        removeData();
        toastAlert('Successfully logged out');
    } else {
        toastError(res.data.message);
        removeData();
    }
});
