import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import React from 'react';
const PumpShortStatus = ({ isWorking }) => {
    let color;
    let title;
    switch (isWorking) {
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
    return (<Chip label={title} size="small" color={color} />);
};
PumpShortStatus.propTypes = {
    isWorking: PropTypes.bool,
};

export default PumpShortStatus;
