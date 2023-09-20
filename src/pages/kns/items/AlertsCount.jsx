import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import React from 'react';
const AlertsCount = ({ count }) => {
    let color;
    if (count === 0) {
        color = 'success';
    }
    if (count > 0) {
        color = 'warning';
    }
    if (count > 3) {
        color = 'error';
    }
    return <Chip label={count} size="small" color={color ? color : 'error'} />;
};

AlertsCount.propTypes = {
    count: PropTypes.number
};

export default AlertsCount;