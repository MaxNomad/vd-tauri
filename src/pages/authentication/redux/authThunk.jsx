import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { createBrowserHistory } from 'history';
import { setTokenRef, getToken, removeToken, setToken, removeTokenRef, removeUser, setUser } from '../helper/token';
import jwt_decode from 'jwt-decode';
import { toastSuccess, toastAlert } from '@pages/components-overview/toasts';

const navigate = createBrowserHistory();

const removeData = () => {
    removeToken();
    removeTokenRef();
    removeUser();
};

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async () => {
    try {
        const accessToken = getToken();
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        const res = await api.post('/user');
        setUser(JSON.stringify(res.data));
        return res.data;
    } catch (e) {
        removeData();
        return;
    }
});

export const loginGoogle = createAsyncThunk('auth/loginGoogle', async (payload) => {
    const res = await api.post('/google/sign-in', payload);
    setToken(res.data.access_token);
    setTokenRef(res.data.refresh_token);
    setUser(JSON.stringify(jwt_decode(res.data.access_token)));

    if (res.status === 200) {
        toastSuccess('Successfully logged in');
        navigate.push('/dash');
    }
    return res.data;
});

export const login = createAsyncThunk('auth/login', async (payload) => {
    const res = await api.post('/sign-in', payload);
    setToken(res.data.access_token);
    setTokenRef(res.data.refresh_token);
    setUser(JSON.stringify(jwt_decode(res.data.access_token)));

    if (res.status === 200) {
        toastSuccess('Successfully logged in');
        navigate.push('/dash');
    }
    return res.data;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
    const accessToken = getToken();
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    const res = await api.put('/sign-out');

    if (res.status === 200) {
        removeData();
        toastAlert('Successfully logged out');
        navigate.push('/login');
    }
});
