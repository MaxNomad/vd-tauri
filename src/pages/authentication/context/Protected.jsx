import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getToken, getTokenRef } from '../helper/token';
import PropTypes from 'prop-types';

const OAuthMiddleware = ({ routes }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleRedirect = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const data = jwt_decode(token);
                    if (!getToken() && !getTokenRef() && data) {
                        navigate('/login');
                    }
                    if (getToken() && getTokenRef() && data && window.location.pathname === '/login') {
                        navigate('/dash');
                    }
                } catch (error) {
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        handleRedirect();
    }, [navigate]);

    return null;
};

OAuthMiddleware.propTypes = {
    routes: PropTypes.any
};

export default OAuthMiddleware;
