import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import React from 'react';
const WorkStatus = ({ current }) => {
    let color;
    let title;
    switch (current) {
        case 0:
            color = 'warning';
            title = 'Ручний';
            break;
        case 1:
            color = 'success';
            title = 'Авто';
            break;
        case 2:
            color = 'error';
            title = 'Вимкнено';
            break;
        default:
            color = 'error';
            title = 'Не визначено';
    }
    return <Chip label={title} size="small" color={color} />;
};

WorkStatus.propTypes = {
    current: PropTypes.number
};

export default WorkStatus;
