import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import React from 'react';
const PumpStatusClear = ({ isOnline }) => {
    let color;
    let title;
    switch (isOnline) {
        case true:
            color = 'success';
            title = 'В роботі';
            break;
        case false:
            color = 'primary';
            title = 'Призупинено';
            break;
        default:
            color = 'error';
            title = 'Не визначено';
    }
    return <Chip label={title} size="small" color={color} />;
};
PumpStatusClear.propTypes = {
    isOnline: PropTypes.bool
};

export default PumpStatusClear;
