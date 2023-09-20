import PropTypes from 'prop-types';
import React from 'react';

import { Alert } from '@mui/material';

const AlertStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'info';
            title = 'Дана аварія має низький пріорітет, можлива деактивація.';
            break;
        case 1:
            color = 'warning';
            title = 'Дана аварія має середній пріорітет, можлива деактивація.';
            break;
        case 2:
            color = 'error';
            title = 'Увага! Високий пріорітет аварії. Перевірте статус перед деактивацією';
            break;
        default:
            color = 'error';
            title = 'Увага! Виявлено активну аварію з високим пріорітетом. Деактивація неможлива.';
    }

    return <Alert severity={color}>{title}</Alert>;
};

AlertStatus.propTypes = {
    status: PropTypes.number
};

export default React.memo(AlertStatus);