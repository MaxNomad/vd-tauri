import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getToken, getTokenRef, getUser } from '../helper/token';
import { login, loginGoogle } from '../redux/authThunk';
import React, { useEffect, createContext } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = getUser()
    const userData = data ?? JSON.parse(data);
    const { error, loading, access_token, refresh_token } = useSelector((state) => state.auth);
    const user = getToken() && getTokenRef() && userData ? userData : null;

    const loginContext = async (payload) => {
        dispatch(login(payload));
    };

    const loginContextGoogle = async (payload) => {
        dispatch(loginGoogle(payload));
    };

    useEffect(() => {
        if (!loading && access_token && refresh_token) {
            setTimeout(() => {
                if (getToken() && getTokenRef()) {
                    navigate('/dash');
                }
            }, 100);
        }
    }, [access_token, refresh_token, loading]);

    return <AuthContext.Provider value={{ user, loginContext, loginContextGoogle }}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
    children: PropTypes.any
};

export default AuthContext;
