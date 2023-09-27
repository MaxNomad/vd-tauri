import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getToken, getTokenRef } from '../helper/token';
import PropTypes from 'prop-types';

const OAuthMiddleware = ({ routes }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorage = () => {
            console.log('change');
        };

        window.addEventListener('storage', handleStorage());
    }, []);
};

OAuthMiddleware.propTypes = {
    routes: PropTypes.any
};

export default OAuthMiddleware;
