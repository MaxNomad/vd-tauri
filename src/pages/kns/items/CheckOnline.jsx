import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import React from 'react';

const CheckOnline = ({ isOnline }) => {
    let color;
    let title;
    switch (isOnline) {
        case true:
            color = 'success';
            title = 'Online';
            break;
        case false:
            color = 'error';
            title = 'Offline';
            break;
        default:
            color = 'error';
            title = 'Не визначено';
    }
    return <Chip label={title} size="small" color={color} />;
};
CheckOnline.propTypes = {
    isOnline: PropTypes.bool
};

export default CheckOnline;
