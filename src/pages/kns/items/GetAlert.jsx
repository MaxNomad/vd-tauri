import PropTypes from 'prop-types';
import { Chip, Grid } from '@mui/material';
import React from 'react';

const AlarmStatus = ({ current }) => {
    let color;
    let title;
    switch (current) {
        case 0:
            color = 'success';
            title = 'Не виявлено';
            break;
        case 1:
            color = 'error';
            title = 'Критична';
            break;
        case 2:
            color = 'warning';
            title = 'Не критична';
            break;
        default:
            color = 'error';
            title = 'Не визначено';
    }
    return <Chip label={title} noWrap size="small" sx={{ maxWidth: { xs: 50, sm: 120 } }} color={color} />;
};

AlarmStatus.propTypes = {
    current: PropTypes.number
};

export default AlarmStatus;
